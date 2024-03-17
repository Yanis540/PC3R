package http

import (
	"encoding/json"
	"fmt"
	"net/http"
	types "pc3r/projet/http/types"
	"slices"
)

func JsonContentMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(res http.ResponseWriter, req *http.Request) {
		fmt.Printf("server: %s / %s \n", req.Method, req.URL)

		res.Header().Set("Content-Type", "application/json")
		next.ServeHTTP(res, req)
	})
}

func AllowedMethodsMiddleware(next http.Handler, allowed_methods []string) http.Handler {
	return http.HandlerFunc(func(res http.ResponseWriter, req *http.Request) {
		if !slices.Contains(allowed_methods, req.Method) {
			res.WriteHeader(http.StatusBadRequest)
			message := fmt.Sprintf("BAD_REQUEST : %s ( %s ) endpoint doesn't exists", req.Method, req.URL)
			json.NewEncoder(res).Encode(types.HTTPError{Message: message})
			return
		}
		next.ServeHTTP(res, req)
	})
}
