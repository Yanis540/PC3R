package http

import (
	"fmt"
	"net/http"
)

func JsonContentMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(res http.ResponseWriter, req *http.Request) {
		fmt.Printf("server: %s / %s \n", req.Method, req.URL)

		res.Header().Set("Content-Type", "application/json")
		next.ServeHTTP(res, req)
	})
}
