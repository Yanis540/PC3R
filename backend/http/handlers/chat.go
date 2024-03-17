package handlers

import (
	"net/http"
	"pc3r/projet/db"
	"pc3r/projet/global"
	"encoding/json"
	types "pc3r/projet/http/types"
)


type ResponseGetChatBody struct {
	Chat types.ChatRes `json:"chat"`
}

func GetChat(res http.ResponseWriter, req *http.Request) {
	id := req.URL.Query().Get("id")
	if id == ""  {
		res.WriteHeader(http.StatusUnauthorized)
		message := "Unauthorized"
		json.NewEncoder(res).Encode(types.MessageResponse{Message: message})
		return
	}

	// user, _ := req.Context().Value("user").(db.UserModel)

	prisma,ctx:= global.GetPrisma()

	chat,err := prisma.Chat.FindFirst(
		db.Chat.ID.Equals(id),
	).With(
		db.Chat.Users.Fetch(),
	).Exec(ctx)

	if err!=nil {
		res.WriteHeader(http.StatusNotFound)
		message := "Not Found"
		json.NewEncoder(res).Encode(types.MessageResponse{Message: message})
		return
	}
	chatStructure := types.ChatRes{
		ChatModel : chat, 
		Users : chat.Users(), 
	}
	response := ResponseGetChatBody{
		Chat:chatStructure,
	}
	res.WriteHeader(http.StatusCreated)
	json.NewEncoder(res).Encode(response)

}
