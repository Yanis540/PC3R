package http

import (
	"net/http"
	handlers "pc3r/projet/http/handlers"
)

func UseHttpRouter(mux *http.ServeMux) {
	mux.Handle("/", JsonContentMiddleware(AllowedMethodsMiddleware(http.HandlerFunc(handlers.BasicRoute), []string{"GET"})))
	mux.Handle("/auth/sign-in", JsonContentMiddleware(AllowedMethodsMiddleware(http.HandlerFunc(handlers.UserSignIn), []string{"POST"})))
	mux.Handle("/auth/sign-up", JsonContentMiddleware(AllowedMethodsMiddleware(http.HandlerFunc(handlers.UserSignUp), []string{"POST"})))
	mux.Handle("/user", JsonContentMiddleware(AllowedMethodsMiddleware(http.HandlerFunc(handlers.UserRoute), []string{"GET", "PUT", "DELETE"})))
	mux.Handle("/trips", JsonContentMiddleware(AllowedMethodsMiddleware(http.HandlerFunc(handlers.GetTrips), []string{"GET"})))
	mux.Handle("/chat", JsonContentMiddleware(AuthMiddleware((AllowedMethodsMiddleware(http.HandlerFunc(handlers.GetChat), []string{"GET"})))))
	mux.Handle("/chat/new", JsonContentMiddleware(AuthMiddleware((AllowedMethodsMiddleware(http.HandlerFunc(handlers.CreateChat), []string{"POST"})))))
	mux.Handle("/chat/join/user", JsonContentMiddleware(AuthMiddleware((AllowedMethodsMiddleware(http.HandlerFunc(handlers.AddUserToChat), []string{"POST"})))))
	mux.Handle("/chat/leave", JsonContentMiddleware(AuthMiddleware((AllowedMethodsMiddleware(http.HandlerFunc(handlers.RemoveUserFromChat), []string{"POST"})))))
	mux.Handle("/sncf/journeys", JsonContentMiddleware(AuthMiddleware((AllowedMethodsMiddleware(http.HandlerFunc(handlers.GetSNCFJourneys), []string{"GET"})))))
}
