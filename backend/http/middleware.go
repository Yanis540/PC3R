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
	"strings"
)

/*
@middleware : sets the content response as json
*/
func JsonContentMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(res http.ResponseWriter, req *http.Request) {
		fmt.Printf("server: %s / %s \n", req.Method, req.URL)

		res.Header().Set("Content-Type", "application/json")
		next.ServeHTTP(res, req)
	})
}

/*
@middleware : specifies which methods are allowed
*/
func AllowedMethodsMiddleware(next http.Handler, allowed_methods []string) http.Handler {
	return http.HandlerFunc(func(res http.ResponseWriter, req *http.Request) {
		if !slices.Contains(allowed_methods, req.Method) {
			res.WriteHeader(http.StatusBadRequest)
			message := fmt.Sprintf("BAD_REQUEST : %s ( %s ) endpoint doesn't exists", req.Method, req.URL)
			json.NewEncoder(res).Encode(types.MakeError(message, types.BAD_REQUEST))
			return
		}
		next.ServeHTTP(res, req)
	})
}

/*
@middleware : authenticates user on the endpoint, saves the user on the req context
*/
func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(res http.ResponseWriter, req *http.Request) {
		tokenString := req.Header.Get("Authorization")
		if tokenString == "" {
			res.WriteHeader(http.StatusUnauthorized)
			message := "Unauthorized"
			json.NewEncoder(res).Encode(types.MakeError(message, types.INVALID_TOKEN))
			return
		}

		if !strings.HasPrefix(tokenString, "Bearer ") {
			res.WriteHeader(http.StatusUnauthorized)
			message := "Unauthorized"
			json.NewEncoder(res).Encode(types.MakeError(message, types.INVALID_TOKEN))
			return
		}
		tokenString = tokenString[len("Bearer "):]
		claims, valid := token.VerifyToken(tokenString)
		if !valid {
			res.WriteHeader(http.StatusUnauthorized)
			message := "Unauthorized"
			json.NewEncoder(res).Encode(types.MakeError(message, types.INVALID_TOKEN))
			return
		}
		id := claims["id"].(string)
		prisma, ctx := global.GetPrisma()
		user, err := prisma.User.FindFirst(
			db.User.ID.Equals(id),
		).With(
			db.User.Chats.Fetch().With(
				db.Chat.Trip.Fetch(),
				db.Chat.Users.Fetch(),
			), // Récupérer les chats associés à l'utilisateur,
		).Exec(ctx)
		if err != nil {
			res.WriteHeader(http.StatusNotFound)
			message := "User Not Found"
			json.NewEncoder(res).Encode(types.MakeError(message, types.NOT_FOUND))
			return
		}
		ctx_req := req.Context()
		ctx_req = context.WithValue(ctx_req, types.CtxAuthKey{}, user)
		req = req.WithContext(ctx_req)

		next.ServeHTTP(res, req)
	})
}

/*
@middleware : handles authentification
*/
func AuthSocketMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(res http.ResponseWriter, req *http.Request) {
		fmt.Printf("websocket server: %s / %s \n", req.Method, req.URL)
		tokenString := req.URL.Query().Get("Authorization")
		req.Header.Set("Authorization", tokenString)
		AuthMiddleware(next).ServeHTTP(res, req)
	})
}
