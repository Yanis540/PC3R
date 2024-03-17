package http

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"pc3r/projet/db"
	global "pc3r/projet/global"
	types "pc3r/projet/http/types"
	token "pc3r/projet/token"
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

func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(res http.ResponseWriter, req *http.Request) {
		tokenString := req.Header.Get("Authorization")
		if tokenString == "" {
			res.WriteHeader(http.StatusUnauthorized)
			message := "Unauthorized"
			json.NewEncoder(res).Encode(types.HTTPError{Message: message})
			return
		}
		tokenString = tokenString[len("Bearer "):]
		claims, valid := token.VerifyToken(tokenString)
		if !valid {
			res.WriteHeader(http.StatusUnauthorized)
			message := "Unauthorized"
			json.NewEncoder(res).Encode(types.HTTPError{Message: message})
			return
		}
		id := claims["id"].(string)
		prisma, ctx := global.GetPrisma()
		user, err := prisma.User.FindFirst(
			db.User.ID.Equals(id),
		).Exec(ctx)
		if err != nil {
			res.WriteHeader(http.StatusNotFound)
			message := "User Not Found"
			json.NewEncoder(res).Encode(types.HTTPError{Message: message})
			return
		}
		ctx_req := req.Context()
		ctx_req = context.WithValue(ctx_req, "user", user)
		req = req.WithContext(ctx_req)

		next.ServeHTTP(res, req)
	})
}
