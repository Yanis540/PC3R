package socket

import (
	"log"

	"github.com/gorilla/websocket"
)

// Message is a object used to pass data on sockets.
type Message struct {
	Event string      `json:"event"`
	Data  interface{} `json:"data"`
}

// FindHandler is a type that defines handler finding functions.
type FindHandler func(Event) (Handler, bool)

// Client is a type that reads and writes on sockets.
type Client struct {
	send        chan Message
	socket      *websocket.Conn
	rt          *Router
	findHandler FindHandler
}

// NewClient accepts a socket and returns an initialized Client.
func NewClient(rt *Router, socket *websocket.Conn, findHandler FindHandler) *Client {
	return &Client{
		send:        make(chan Message),
		socket:      socket,
		findHandler: findHandler,
		rt:          rt,
	}
}

// Write receives messages from the channel and writes to the socket.
func (c *Client) Write() {
	msg := (<-c.send)
	err := c.socket.WriteJSON(msg)
	if err != nil {
		log.Printf("socket write error: %v\n", err)
	}
}

// Read intercepts messages on the socket and assigns them to a handler function.
func (c *Client) Read() {
	var msg Message
	for {
		// read incoming message from socket
		if err := c.socket.ReadJSON(&msg); err != nil {
			log.Printf("socket read error: %v\n", err)
			break
		}
		// assign message to a function handler
		if handler, found := c.findHandler(Event(msg.Event)); found {
			handler(c, msg.Data)
		}
	}
	log.Println("exiting read loop")

	// close interrupted socket connection
	c.socket.Close()
}
