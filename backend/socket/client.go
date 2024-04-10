package socket

import (
	"log"
	"pc3r/projet/db"

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
	send           chan Message
	socket         *websocket.Conn
	rt             *Router
	findHandler    FindHandler
	user           *db.UserModel
	SubscribedHubs []*Hub // Ajouter un champ pour stocker les hubs auxquels le client est abonné
}

// NewClient accepts a socket and returns an initialized Client.
func NewClient(rt *Router, socket *websocket.Conn, findHandler FindHandler, user *db.UserModel) *Client {
	return &Client{
		send:           make(chan Message),
		socket:         socket,
		findHandler:    findHandler,
		rt:             rt,
		SubscribedHubs: []*Hub{},
		user:           user,
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

	// close interrupted socket connection
	for _, hub := range c.SubscribedHubs {
		go func(h *Hub) {
			h.unregister <- c
		}(hub)
	}
	c.SubscribedHubs = []*Hub{}
	c.socket.Close()
}

// Ajouter un hub aux hubs abonnés du client
func (c *Client) AddSubscribedHub(hub *Hub) {
	c.SubscribedHubs = append(c.SubscribedHubs, hub)
}
func (c *Client) IsSubscribedToHub(hubToCheck *Hub) bool {
	for _, hub := range c.SubscribedHubs {
		if hub == hubToCheck {
			return true
		}
	}
	return false
}

// Enlever un hub des hubs abonnés du client
func (c *Client) RemoveSubscribedHub(hub *Hub) {
	for i, subscribedHub := range c.SubscribedHubs {
		if subscribedHub == hub {
			// Supprimer le hub de la liste des hubs abonnés
			c.SubscribedHubs = append(c.SubscribedHubs[:i], c.SubscribedHubs[i+1:]...)
			break
		}
	}
}
