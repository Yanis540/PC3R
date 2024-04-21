package main

import (
	"fmt"
	"log"
	"net/http"

	"pc3r/projet/global"
	http2 "pc3r/projet/http"
	handlers "pc3r/projet/http/handlers"
	socket "pc3r/projet/socket"

	"github.com/jasonlvhit/gocron"
	"github.com/rs/cors"
)

// web socket  insipiré de : https://github.com/snassr/blog-goreactsockets/blob/master/backend/main.go
// http handlers = https://www.digitalocean.com/community/tutorials/how-to-make-http-requests-in-go#making-a-get-request
var mux = http.NewServeMux()

func main() {
	// initialiser les variables globales, notamment le prisma connector
	global.Init()
	// créer le routeur pour le websocket
	// réserver le endpoint : /ws pour le websocket
	socket.UseSocketRouter(mux)
	// lancer les handlers des https
	http2.UseHttpRouter(mux)
	// définir les cors policy, pour l'instant on accept n'importe quelle origine
	// en pratique on passe la liste des URLS qu'on passe mais juste pour ne pas trop se casser la tête
	// on définit les types de headers qu'on accepte
	cors_options := cors.New(cors.Options{
		AllowedOrigins: []string{"*"},
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders: []string{"Origin", "Content-Type", "Accept", "Authorization"},
	})

	handler := cors_options.Handler(mux)
	port := envPort()
	fmt.Println("Server running on PORT  " + port)
	// lancer le serveur sur son propre thread
	go func() {
		log.Fatal(http.ListenAndServe(port, handler))
	}()
	// on crée un cron pour mettre à jours la base de données chaque jour à minuit 01
	scheduler := gocron.NewScheduler()
	scheduler.Every(1).Day().At("00:00:01").Do(handlers.SeedDatabase)
	<-scheduler.Start()

}
