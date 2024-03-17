package http

import "pc3r/projet/db"

type HTTPError struct {
	Message string `json:"message"`
}
type UserRes struct {
	*db.UserModel
	Chats []db.ChatModel `json:"chats"`
}

type MessageRes struct {
	*db.MessageModel
	User db.UserModel `json:"chats"`
}
type UserChatModel struct {
	Name  string `json:"name"`
	Email string `json:"email"`
	Id    string `json:"id"`
}
type ChatRes struct {
	*db.ChatModel
	Trip     *db.TripModel     `json:"trip"`
	Users    []UserChatModel   `json:"users"`
	Messages []db.MessageModel `json:"messages"`
}
type MessageResponse struct {
	Message string `json:"message"`
}

type AuthTokens struct {
	Access string `json:"access"`
}

type CtxAuthKey struct{} // or exported to use outside the package
