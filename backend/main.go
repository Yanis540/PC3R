package main

import (
	"fmt"
	"log"
	"net/http"

	"pc3r/projet/global"
	http2 "pc3r/projet/http"
	socket "pc3r/projet/socket"

	"github.com/rs/cors"
)

// web socket  insipiré de : https://github.com/snassr/blog-goreactsockets/blob/master/backend/main.go
// http handlers = https://www.digitalocean.com/community/tutorials/how-to-make-http-requests-in-go#making-a-get-request

const serverPort = 5000

var mux = http.NewServeMux()

func main() {
	global.Init()

	router := socket.UseSocketRouter()
	mux.Handle("/ws", router)
	http2.UseHttpRouter(mux)

	cors_options := cors.New(cors.Options{
		AllowedOrigins: []string{"*"},
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders: []string{"Origin", "Content-Type", "Accept"},
	})

	handler := cors_options.Handler(mux)
	fmt.Println("Server running on PORT  5000")
	log.Fatal(http.ListenAndServe(":5000", handler))

}

//! usefull later
// requestURL := fmt.Sprintf("http://localhost:%d", serverPort)
// res, err := http.Get(requestURL)
// if err != nil {
// 	fmt.Printf("error making http request: %s\n", err)
// 	os.Exit(1)
// }
// fmt.Printf("client: got response!\n")
// fmt.Printf("client: status code: %d\n", res.StatusCode)
