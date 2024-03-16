package http

import (
	"net/http"
)

func UseHttpRouter(mux *http.ServeMux) {
	mux.Handle("/", JsonContentMiddleware(http.HandlerFunc(BasicRoute)))
}
