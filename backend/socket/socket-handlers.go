package socket

import (
	"fmt"
	"log"
	"pc3r/projet/db"
	"pc3r/projet/global"
	chat "pc3r/projet/http/handlers"
)

func helloFromClient(c *Client, data interface{}) {
	log.Printf("hello from client! message: %v\n", data)
	log.Printf("%v", c.send)
	c.rt.AddHub("yanis")
	msg := Message{Event: "helloFromServer", Data: "hello client!"}
	c.Emit(msg)
	hub, _ := c.rt.hubs["yanis"]
	hub.register <- c
}

type responseRegisterToChat struct {
	Message string `json:"message"`
	Chat_id string `json:"chat_id"`
}

func registerToChat(client *Client, d interface{}) {
	data, ok := d.(map[string]interface{})
	if !ok {
		return
	}
	chat_id := data["chat_id"].(string)
	// user_id := data["user_id"].(string)
	_, ok = client.rt.hubs[chat_id]
	if !ok {
		client.rt.AddHub(chat_id)
		fmt.Println("Created new Chat : ", chat_id)
	}
	hub, _ := client.rt.hubs[chat_id]
	if client.IsSubscribedToHub(hub) == true {
		return
	}
	msg := Message{Event: "registered_chat", Data: responseRegisterToChat{
		Message: "Registered correctly",
		Chat_id: chat_id,
	}}
	client.Emit(msg)

	client.AddSubscribedHub(hub)
	hub.register <- client

}
func unregisterFromChat(client *Client, d interface{}) {
	data, ok := d.(map[string]interface{})
	if !ok {
		return
	}
	chat_id := data["chat_id"].(string)
	// user_id := data["user_id"].(string)
	_, ok = client.rt.hubs[chat_id]
	if !ok {
		return
	}
	msg := Message{Event: "unregistred_from_chat", Data: responseRegisterToChat{
		Message: "Unregistered correctly",
		Chat_id: chat_id,
	}}
	client.Emit(msg)
	hub, _ := client.rt.hubs[chat_id]
	client.RemoveSubscribedHub(hub)
	hub.unregister <- client

}

func sendMessage(client *Client, d interface{}) {
	data, ok := d.(map[string]interface{})
	if !ok {
		return
	}
	chat_id := data["chat_id"].(string)
	content := data["content"].(string)
	hub, ok := client.rt.hubs[chat_id]
	if !ok {
		return
	}
	fmt.Println(len(hub.clients))
	user := client.user
	prisma, ctx := global.GetPrisma()
	message, err := prisma.Message.CreateOne(
		db.Message.Content.Set(content),
		db.Message.Chat.Link(
			db.Chat.ID.Equals(chat_id),
		),
		db.Message.User.Link(
			db.User.ID.Equals(user.ID),
		),
	).With(
		db.Message.User.Fetch(),
	).Exec(ctx)
	if err != nil {
		return
	}
	// message, _ := prisma.Message.FindFirst().With(db.Message.User.Fetch()).Exec(ctx)
	structured_message := chat.StructureMessage(*message)
	msg := Message{
		Event: "receive_message",
		Data:  structured_message,
	}
	hub.Broadcast(msg)

}

func closeClientConnection(client *Client, d interface{}) {
	for _, hub := range client.SubscribedHubs {
		hub.RemoveClient(client)
	}
}
