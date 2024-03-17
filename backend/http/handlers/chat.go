package handlers

import (
	"fmt"
	"net/http"
	"pc3r/projet/db"
	types "pc3r/projet/http/types"
)

type GetChatBody struct {
	Id     string `json:"id"`
	UserId string `json:"userId"`
}
type ResponseGetChatBody struct {
	Chat types.ChatRes `json:"chat"`
}

func GetChat(res http.ResponseWriter, req *http.Request) {
	// var body GetChatBody
	// err := json.NewDecoder(req.Body).Decode(&body)
	// if (err != nil) || body.Id == "" || body.UserId == "" {
	// 	res.WriteHeader(http.StatusUnauthorized)
	// 	message := "Unauthorized"
	// 	json.NewEncoder(res).Encode(types.MessageResponse{Message: message})
	// 	return
	// }
	user, _ := req.Context().Value("user").(db.UserModel)

	fmt.Println("Access the chat",user)

}
