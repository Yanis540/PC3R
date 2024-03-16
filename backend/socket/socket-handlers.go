package socket

import "log"

func helloFromClient(c *Client, data interface{}) {
	log.Printf("hello from client! message: %v\n", data)
	log.Printf("%v", c.send.Data)
	// set and write response message
	c.send = Message{Name: "helloFromServer", Data: "hello client!"}
	c.Write()
}
