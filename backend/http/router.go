package http

import (
	"net/http"
)

func UseHttpRouter(mux *http.ServeMux) {
	mux.Handle("/", JsonContentMiddleware(AllowedMethodsMiddleware(http.HandlerFunc(BasicRoute), []string{"GET"})))
	// mux.Handle("/user/")
}
