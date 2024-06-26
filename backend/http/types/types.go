package http

import "pc3r/projet/db"

type Error string

const (
	BAD_REQUEST           Error = "BAD_REQUEST"
	INVALID_TOKEN               = "INVALID_TOKEN"
	UNAUTHORIZED                = "UNAUTHORIZED"
	NOT_FOUND                   = "NOT_FOUND"
	INPUT_ERROR                 = "INPUT_ERROR"
	INTERNAL_SERVER_ERROR       = "INTERNAL_SERVER_ERROR"
	CHAT_ALREADY_EXISTS         = "CHAT_ALREADY_EXISTS"
)

type HTTPError struct {
	Message string `json:"message"`
	Code    Error  `json:"code"`
}
type HTTPErrorRes struct {
	Error HTTPError `json:"error"`
}

func MakeError(message string, code Error) HTTPErrorRes {
	e := HTTPError{
		Message: message, Code: code,
	}
	return HTTPErrorRes{
		Error: e,
	}

}

type ChatTrip struct {
	db.ChatModel
	Users []UserDetails `json:"users"`
	Trip  *db.TripModel `json:"trip"`
}
type UserRes struct {
	*db.UserModel
	Chats []ChatTrip `json:"chats"`
}

type MessageRes struct {
	*db.MessageModel
	User db.UserModel `json:"chats"`
}
type UserDetails struct {
	Name  string `json:"name"`
	Email string `json:"email"`
	Photo string `json:"photo"`
	Id    string `json:"id"`
}
type ChatRes struct {
	*db.ChatModel
	Trip      *db.TripModel         `json:"trip"`
	Users     []UserDetails         `json:"users"`
	Messages  []MessageChatResponse `json:"messages"`
	Messagess []*db.MessageModel    `json:"Messages"`
}
type TipChat struct {
	*db.ChatModel
	Users []UserDetails `json:"users"`
}
type TripRes struct {
	db.TripModel
	Chat TipChat `json:"chat"`
}

type MessageResponse struct {
	Message string `json:"message"`
}

type MessageChatResponse struct {
	Id         string      `json:"id"`
	Content    string      `json:"content"`
	Chat_id    string      `json:"chat_id"`
	User_id    string      `json:"user_id"`
	Created_at db.DateTime `json:"created_at"`
	User       UserDetails `json:"user"`
}
type AuthTokens struct {
	Access string `json:"access"`
}

/* @type : used to save user in the req context
usage : auth middleware
*/
type CtxAuthKey struct{} // or exported to use outside the package
