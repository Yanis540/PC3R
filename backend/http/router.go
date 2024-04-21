package http

import (
	"net/http"
	handlers "pc3r/projet/http/handlers"
)

func UseHttpRouter(mux *http.ServeMux) {
	/*
				mux.Handle(path ) : le path permet de définir quelle endpoint on utilisera
				pour chaque endpoint nous avons rajouté certains middleware, notamment :
		!		-	JsonContentMiddlware : permet de spécifier le type de retour du contenu comme étant du json vers le client
		!		-	AllowedMethodsMiddleware : permet de déterminer quelles sont les requêtes qui sont autorisés dans le endpoint
		!		-	AuthMiddleware : permet d'authentifier les utilisateurs avant d'accéder au middleware
		e.g : sur express js c'est un truc plus jolie en faisant :
		!	aapp.get(path,middleware1,...,middlewareN,func )

	*/
	mux.Handle("/", JsonContentMiddleware(
		AllowedMethodsMiddleware(
			http.HandlerFunc(handlers.BasicRoute),
			[]string{"GET"},
		),
	))
	mux.Handle("/auth/sign-in", JsonContentMiddleware(
		AllowedMethodsMiddleware(
			http.HandlerFunc(handlers.UserSignIn),
			[]string{"POST"},
		),
	))
	mux.Handle("/auth/sign-up", JsonContentMiddleware(
		AllowedMethodsMiddleware(
			http.HandlerFunc(handlers.UserSignUp),
			[]string{"POST"},
		),
	))
	mux.Handle("/auth/me", JsonContentMiddleware(
		AuthMiddleware(AllowedMethodsMiddleware(
			http.HandlerFunc(handlers.UserGetMe),
			[]string{"GET"},
		)),
	))
	mux.Handle("/user", JsonContentMiddleware(
		AuthMiddleware(
			AllowedMethodsMiddleware(
				http.HandlerFunc(handlers.UserRoute),
				[]string{"GET", "PUT", "DELETE"},
			),
		)),
	)
	mux.Handle("/trips", JsonContentMiddleware(
		AllowedMethodsMiddleware(
			http.HandlerFunc(handlers.GetTrips),
			[]string{"GET"},
		),
	))
	mux.Handle("/chat", JsonContentMiddleware(
		AuthMiddleware((AllowedMethodsMiddleware(
			http.HandlerFunc(handlers.GetChat),
			[]string{"GET"},
		)),
		),
	))
	mux.Handle("/chat/new/duo", JsonContentMiddleware(
		AuthMiddleware((AllowedMethodsMiddleware(
			http.HandlerFunc(handlers.CreateDuoChat),
			[]string{"POST"},
		)),
		),
	))
	mux.Handle("/chat/join/user", JsonContentMiddleware(
		AuthMiddleware((AllowedMethodsMiddleware(
			http.HandlerFunc(handlers.AddUserToChat),
			[]string{"POST"},
		)),
		),
	))
	mux.Handle("/chat/leave", JsonContentMiddleware(
		AuthMiddleware((AllowedMethodsMiddleware(
			http.HandlerFunc(handlers.RemoveUserFromChat),
			[]string{"POST"},
		)),
		),
	))
	mux.Handle("/chat/message", JsonContentMiddleware(
		AuthMiddleware((AllowedMethodsMiddleware(
			http.HandlerFunc(handlers.SendMessage),
			[]string{"POST"},
		)),
		),
	))
	mux.Handle("/sncf/journeys", JsonContentMiddleware(
		AuthMiddleware((AllowedMethodsMiddleware(
			http.HandlerFunc(handlers.GetSNCFJourneys),
			[]string{"GET"},
		)),
		),
	))
}
