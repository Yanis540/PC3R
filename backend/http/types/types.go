package http

import "pc3r/projet/db"

type HTTPError struct {
	Message string `json:"message"`
}
type UserRes struct {
	*db.UserModel
	Chats []db.ChatModel `json:"chats"`
}

type ChatRes struct {
	*db.ChatModel
	Users []db.UserModel `json:"users"`
}
type MessageResponse struct {
	Message string `json:"message"`
}

type AuthTokens struct {
	Access string `json:"access"`
}
