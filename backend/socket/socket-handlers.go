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
	go func() {
		c.send <- Message{Event: "helloFromServer", Data: "hello client!"}
	}()
	c.Write()
	hub, _ := c.rt.hubs["yanis"]
	hub.register <- c
}

type responseRegisterToChat struct {
	Message string `json:"message"`
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

	go func() {
		client.send <- Message{Event: "registered_chat", Data: responseRegisterToChat{
			Message: "Registered correctly",
		}}
	}()
	client.Write()
	hub, _ := client.rt.hubs[chat_id]
	hub.register <- client

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
	structured_message := chat.StructureMessage(*message)
	go func() {
		hub.broadcast <- Message{
			Event: "receive_message",
			Data:  structured_message,
		}
	}()

}
