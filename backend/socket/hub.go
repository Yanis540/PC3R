package socket

/*
	a hub is basically an equivalent to a room in Socket.IO, clients (or sockets) can register and unregister to it, and
	broadcast, everything is a channel so we every client can await a message from the client, then the client sends a message to broadcast
	it to the hub that takes care of that
*/
type Hub struct {
	// Registered clients.
	clients map[*Client]bool

	// Inbound messages from the clients.
	broadcast chan Message

	// Register requests from the clients.
	register chan *Client

	// Unregister requests from clients.
	unregister chan *Client
}

// NewHub initialise un nouveau hub.
func NewHub() *Hub {
	return &Hub{
		clients:    make(map[*Client]bool),
		broadcast:  make(chan Message),
		register:   make(chan *Client),
		unregister: make(chan *Client),
	}
}

// AddClient ajoute un client au hub.
func (h *Hub) Broadcast(msg Message) {
	go func() {
		h.broadcast <- msg
	}()
}

// AddClient ajoute un client au hub.
func (h *Hub) AddClient(client *Client) {
	// fmt.Println("Registerer new client")
	h.clients[client] = true
	client.SubscribedHubs = append(client.SubscribedHubs, h) // Ajouter le hub à la liste des hubs abonnés du client
	// fmt.Println("Added client to hub ", client.SubscribedHubs)
}
func (h *Hub) RemoveClient(client *Client) {
	// fmt.Println("Trying to remove client", client)
	if _, ok := h.clients[client]; ok {
		delete(h.clients, client)
		close(client.send)
	}
}

func (h *Hub) run() {
	for {
		// fmt.Println("Waiting for something to happen ... ")
		select {
		case client := <-h.register:
			h.AddClient(client)
		case client := <-h.unregister:
			h.RemoveClient(client)
		case message := <-h.broadcast:
			// fmt.Println("Trying to broadct ", message)
			for client := range h.clients {
				client.Emit(message)

			}
		}
	}
}
