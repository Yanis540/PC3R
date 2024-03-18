package socket

import (
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

// Handler is a type representing functions which resolve requests.
type Handler func(*Client, interface{})

// Event is a type representing request names.
type Event string

// Router is a message routing object mapping events to function handlers.
type Router struct {
	rules map[Event]Handler // rules maps events to functions.
	hubs  map[string]*Hub   // map of hubs
}

// NewRouter returns an initialized Router.
func NewRouter() *Router {
	return &Router{
		rules: make(map[Event]Handler),
		hubs:  make(map[string]*Hub),
	}
}

// ServeHTTP creates the socket connection and begins the read routine.
func (rt *Router) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	// configure upgrader
	upgrader := websocket.Upgrader{
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
		// accept all?
		CheckOrigin: func(r *http.Request) bool { return true },
	}

	// upgrade connection to socket
	socket, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Printf("socket server configuration error: %v\n", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	client := NewClient(rt, socket, rt.FindHandler)

	// running method for reading from sockets, in main routine
	client.Read()
}

// FindHandler implements a handler finding function for router.
func (rt *Router) FindHandler(event Event) (Handler, bool) {
	handler, found := rt.rules[event]
	return handler, found
}

// Handle is a function to add handlers to the router.
func (rt *Router) Handle(event Event, handler Handler) {
	// store in to router rules
	rt.rules[event] = handler

}

// AddHub adds a hub to the router's list of hubs.
func (rt *Router) AddHub(id string) {
	hub := NewHub()
	rt.hubs[id] = hub
	go hub.run()
}

func UseSocketRouter() *Router {
	// create router instance
	router := NewRouter()
	// handle events with messages named `helloFromClient` with handler
	// helloFromClient (from above).
	router.Handle("helloFromClient", helloFromClient)
	return router
}
