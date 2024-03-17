package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"pc3r/projet/db"
	"pc3r/projet/global"
	types "pc3r/projet/http/types"
	"time"
)

type ResponseGetChatBody struct {
	Chat types.ChatRes `json:"chat"`
}

func extractUsersInformations(chat_users []db.UserModel) []types.UserChatModel {
	users := []types.UserChatModel{}
	for _, user := range chat_users {
		updated_user := types.UserChatModel{
			Name:  user.Name,
			Email: user.Email,
			Id:    user.ID,
		}
		users = append(users, updated_user)
	}
	return users
}

func GetChat(res http.ResponseWriter, req *http.Request) {
	id := req.URL.Query().Get("id")
	if id == "" {
		res.WriteHeader(http.StatusUnauthorized)
		message := "Unauthorized"
		json.NewEncoder(res).Encode(types.MessageResponse{Message: message})
		return
	}

	user, _ := req.Context().Value("user").(db.UserModel)
	prisma, ctx := global.GetPrisma()

	chat, err := prisma.Chat.FindFirst(
		db.Chat.ID.Equals(id),
		db.Chat.Users.Some(
			db.User.ID.Equals(user.ID),
		),
	).With(
		db.Chat.Users.Fetch(),
		db.Chat.Messages.Fetch(),
		db.Chat.Trip.Fetch(),
	).Exec(ctx)

	if err != nil {
		res.WriteHeader(http.StatusNotFound)
		message := "Not Found"
		json.NewEncoder(res).Encode(types.MessageResponse{Message: message})
		return
	}
	users := extractUsersInformations(chat.Users())
	trip, _ := chat.Trip()
	messages := chat.Messages()
	chatStructure := types.ChatRes{
		ChatModel: chat,
		Users:     users,
		Trip:      trip,
		Messages:  messages,
	}
	response := ResponseGetChatBody{
		Chat: chatStructure,
	}
	res.WriteHeader(http.StatusCreated)
	json.NewEncoder(res).Encode(response)

}

type ChatProps struct {
	Name string `json:"name"`
}
type TripProps struct {
	Departure_time         time.Time `json:"departure_time"`
	Estimated_arrival_time time.Time `json:"estimated_arrival_time"`
	From                   string    `json:"from"`
	To                     string    `json:"to"`
}
type CreateChatProps struct {
	Chat ChatProps `json:"chat"`
	Trip TripProps `json:"trip"`
}

func CreateChatFn(props CreateChatProps) (*db.ChatModel, error) {
	prisma, ctx := global.GetPrisma()

	// Ensuite, créer le Chat en référençant le Trip créé
	chat, err := prisma.Chat.CreateOne(
		db.Chat.Name.Set(props.Chat.Name),
	).Exec(ctx)
	if err != nil {
		return nil, err
	}
	_, err = prisma.Trip.CreateOne(
		db.Trip.From.Set(props.Trip.From),
		db.Trip.To.Set(props.Trip.To),
		db.Trip.DepartureTime.Set(props.Trip.Departure_time),
		db.Trip.EstimatedArrivalTime.Set(props.Trip.Estimated_arrival_time),
		db.Trip.Chat.Link(
			db.Chat.ID.Equals(chat.ID),
		),
	).Exec(ctx)
	if err != nil {
		return nil, err
	}
	updated_chat, err := prisma.Chat.FindUnique(
		db.Chat.ID.Equals(chat.ID),
	).With(
		db.Chat.Trip.Fetch(),
		db.Chat.Messages.Fetch(),
		db.Chat.Users.Fetch(),
	).Exec(ctx)
	if err != nil {
		fmt.Println("Error here 1")
		return nil, err
	}
	return updated_chat, nil
}

type ResponseCreateChatBody struct {
	Chat types.ChatRes `json:"chat"`
}

func CreateChat(res http.ResponseWriter, req *http.Request) {
	var body CreateChatProps
	err := json.NewDecoder(req.Body).Decode(&body)
	fmt.Println(body.Chat.Name)
	fmt.Println(body.Trip.From)
	fmt.Println(body.Trip.To)
	if (err != nil) || body.Chat.Name == "" || body.Trip.To == "" || body.Trip.From == "" {
		res.WriteHeader(http.StatusUnauthorized)
		message := "Missing propreties"
		json.NewEncoder(res).Encode(types.MessageResponse{Message: message})
		return
	}
	chat, err := CreateChatFn(body)
	if err != nil {
		fmt.Println(err)
		res.WriteHeader(http.StatusBadRequest)
		message := "Could not create chat "
		json.NewEncoder(res).Encode(types.MessageResponse{Message: message})
		return
	}
	users := extractUsersInformations(chat.Users())
	trip, _ := chat.Trip()
	messages := chat.Messages()
	chatStructure := types.ChatRes{
		ChatModel: chat,
		Users:     users,
		Trip:      trip,
		Messages:  messages,
	}
	response := ResponseGetChatBody{
		Chat: chatStructure,
	}
	res.WriteHeader(http.StatusCreated)
	json.NewEncoder(res).Encode(response)
}
