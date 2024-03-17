package http

import (
	"net/http"
	handlers "pc3r/projet/http/handlers"
)

func UseHttpRouter(mux *http.ServeMux) {
	mux.Handle("/", JsonContentMiddleware(AllowedMethodsMiddleware(http.HandlerFunc(handlers.BasicRoute), []string{"GET"})))
	mux.Handle("/user", JsonContentMiddleware(AllowedMethodsMiddleware(http.HandlerFunc(handlers.UserRoute), []string{"GET", "PUT", "DELETE"})))
	mux.Handle("/user/sign-in", JsonContentMiddleware(AllowedMethodsMiddleware(http.HandlerFunc(handlers.UserSignIn), []string{"POST"})))
	mux.Handle("/user/sign-up", JsonContentMiddleware(AllowedMethodsMiddleware(http.HandlerFunc(handlers.UserSignUp), []string{"POST"})))
}
