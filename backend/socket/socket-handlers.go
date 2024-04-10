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
	go func() {
		client.send <- Message{Event: "registered_chat", Data: responseRegisterToChat{
			Message: "Registered correctly",
			Chat_id: chat_id,
		}}
	}()
	client.Write()

	client.AddSubscribedHub(hub)
	hub.register <- client

}
func unregisterFromChat(client *Client, d interface{}) {
	data, ok := d.(map[string]interface{})
	if !ok {
		return
	}
	chat_id := data["chat_id"].(string)
	fmt.Println("HIII", chat_id)
	// user_id := data["user_id"].(string)
	fmt.Println(chat_id)
	_, ok = client.rt.hubs[chat_id]
	if !ok {
		return
	}

	go func() {
		client.send <- Message{Event: "unregistred_from_chat", Data: responseRegisterToChat{
			Message: "Unregistered correctly",
			Chat_id: chat_id,
		}}
	}()
	client.Write()
	hub, _ := client.rt.hubs[chat_id]
	client.RemoveSubscribedHub(hub)
	hub.register <- client

}

func sendMessage(client *Client, d interface{}) {
	data, ok := d.(map[string]interface{})
	if !ok {
		return
	}
	chat_id := data["chat_id"].(string)
	content := data["content"].(string)
	fmt.Println(content)
	hub, ok := client.rt.hubs[chat_id]
	if !ok {
		return
	}
	fmt.Println(hub)
	// user := client.user
	prisma, ctx := global.GetPrisma()
	// message, err := prisma.Message.CreateOne(
	// 	db.Message.Content.Set(content),
	// 	db.Message.Chat.Link(
	// 		db.Chat.ID.Equals(chat_id),
	// 	),
	// 	db.Message.User.Link(
	// 		db.User.ID.Equals(user.ID),
	// 	),
	// ).With(
	// 	db.Message.User.Fetch(),
	// ).Exec(ctx)
	// if err != nil {
	// 	return
	// }
	message, _ := prisma.Message.FindFirst().With(db.Message.User.Fetch()).Exec(ctx)
	structured_message := chat.StructureMessage(*message)
	go func() {
		hub.broadcast <- Message{
			Event: "receive_message",
			Data:  structured_message,
		}
	}()

}

func closeClientConnection(client *Client, d interface{}) {
	for _, hub := range client.SubscribedHubs {
		hub.RemoveClient(client)
	}
}
