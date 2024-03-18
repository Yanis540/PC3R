package socket

import (
	"log"
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
