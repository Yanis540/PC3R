package main

import (
	"fmt"
	"log"
	"net/http"

	"pc3r/projet/global"
	http2 "pc3r/projet/http"
	socket "pc3r/projet/socket"

	"github.com/jasonlvhit/gocron"
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
		AllowedHeaders: []string{"Origin", "Content-Type", "Accept", "Authorization"},
	})

	handler := cors_options.Handler(mux)

	fmt.Println("Server running on PORT  5000")
	go func() {
		log.Fatal(http.ListenAndServe(":5000", handler))
	}()
	scheduler := gocron.NewScheduler()
	// scheduler.Every(1).Day().At("00:00:01").Do(handlers.SeedDatabase)
	<-scheduler.Start()

}
