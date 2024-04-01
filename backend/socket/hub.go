package socket

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
				go func(c *Client) {
					// fmt.Println("Tryin to send ")
					c.send <- message
					// fmt.Println("Sent Message")
				}(client)
				client.Write()

			}
		}
	}
}
