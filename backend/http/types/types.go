package http

import "pc3r/projet/db"

type Error string

const (
	BAD_REQUEST           Error = "BAD_REQUEST"
	UNAUTHORIZED                = "UNAUTHORIZED"
	NOT_FOUND                   = "NOT_FOUND"
	INPUT_ERROR                 = "INPUT_ERROR"
	INTERNAL_SERVER_ERROR       = "INTERNAL_SERVER_ERROR"
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
	Trip *db.TripModel `json:"trip"`
}
type UserRes struct {
	*db.UserModel
	Chats []ChatTrip `json:"chats"`
}

type MessageRes struct {
	*db.MessageModel
	User db.UserModel `json:"chats"`
}
type UserChatModel struct {
	Name  string `json:"name"`
	Email string `json:"email"`
	Photo string `json:"photo"`
	Id    string `json:"id"`
}
type ChatRes struct {
	*db.ChatModel
	Trip      *db.TripModel         `json:"trip"`
	Users     []UserChatModel       `json:"users"`
	Messages  []MessageChatResponse `json:"messages"`
	Messagess []*db.MessageModel    `json:"Messages"`
}
type TipChat struct {
	*db.ChatModel
	Users []UserChatModel `json:"users"`
}
type TripRes struct {
	db.TripModel
	Chat TipChat `json:"chat"`
}

type MessageResponse struct {
	Message string `json:"message"`
}
type MessageUser struct {
	Id    string `json:"id"`
	Name  string `json:"name"`
	Photo string `json:"photo"`
}
type MessageChatResponse struct {
	Id         string      `json:"id"`
	Content    string      `json:"content"`
	Chat_id    string      `json:"chat_id"`
	User_id    string      `json:"user_id"`
	Created_at db.DateTime `json:"created_at"`
	User       MessageUser `json:"user"`
}
type AuthTokens struct {
	Access string `json:"access"`
}

type CtxAuthKey struct{} // or exported to use outside the package
