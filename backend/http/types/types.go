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
type TripRes struct {
	db.TripModel
	Chat *db.ChatModel `json:"chat"`
}

type MessageResponse struct {
	Message string `json:"message"`
}

type AuthTokens struct {
	Access string `json:"access"`
}

type CtxAuthKey struct{} // or exported to use outside the package
