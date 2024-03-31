package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"pc3r/projet/db"
	"pc3r/projet/global"
	types "pc3r/projet/http/types"
	sncf "pc3r/projet/sncf"
	types_sncf "pc3r/projet/sncf/types"
)

type ResponseGetChatBody struct {
	Chat types.ChatRes `json:"chat"`
}

/*
@handler : Gets the chat from the @id query in the url

	@returns : {
		chat
	}
*/
func GetChat(res http.ResponseWriter, req *http.Request) {
	id := req.URL.Query().Get("id")
	if id == "" {
		res.WriteHeader(http.StatusUnauthorized)
		message := "Unauthorized"
		json.NewEncoder(res).Encode(types.MakeError(message, types.UNAUTHORIZED))
		return
	}

	user, _ := req.Context().Value(types.CtxAuthKey{}).(*db.UserModel)
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
		json.NewEncoder(res).Encode(types.MakeError(message, types.NOT_FOUND))
		return
	}
	users := ExtractChatUsersInformations(chat.Users())
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

func CreateChat(res http.ResponseWriter, req *http.Request) {
	var body CreateChatProps
	err := json.NewDecoder(req.Body).Decode(&body)
	if (err != nil) || body.Trip.To.Id == "" || body.Trip.From.Id == "" {
		res.WriteHeader(http.StatusUnauthorized)
		message := "Missing propreties"
		json.NewEncoder(res).Encode(types.MakeError(message, types.INPUT_ERROR))
		return
	}
	chat, err := CreateChatFn(body)
	if err != nil {
		res.WriteHeader(http.StatusBadRequest)
		message := "Could not create chat "
		json.NewEncoder(res).Encode(types.MakeError(message, types.BAD_REQUEST))
		return
	}
	users := ExtractChatUsersInformations(chat.Users())
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

type CreateChatProps struct {
	Trip types_sncf.Section `json:"trip"`
}

/*
@func : Create a chat

		@props : {
			trip : {
				Id                  string
				Departure_date_time string
				Arrival_date_time   string
				To                  Place
				From                Place
			}

		}
	}
	@returns : (chat, err)
*/
func CreateChatFn(props CreateChatProps) (*db.ChatModel, error) {
	prisma, ctx := global.GetPrisma()

	Name := props.Trip.From.Name + " - " + props.Trip.To.Name
	parsed_departure_time, err := sncf.ParseSNCFfDate(props.Trip.Departure_date_time)
	parsed_arrival_time, _ := sncf.ParseSNCFfDate(props.Trip.Arrival_date_time)
	if err != nil {
		fmt.Printf("Error parsing date")
		return nil, err
	}
	chat, err := prisma.Chat.CreateOne(
		db.Chat.Name.Set(Name),
		db.Chat.Date.Set(parsed_departure_time),
	).Exec(ctx)
	if err != nil {
		return nil, err
	}
	_, err = prisma.Trip.CreateOne(
		db.Trip.From.Set(props.Trip.From.Name),
		db.Trip.To.Set(props.Trip.To.Name),
		db.Trip.DepartureTime.Set(parsed_departure_time),
		db.Trip.EstimatedArrivalTime.Set(parsed_arrival_time),
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
		return nil, err
	}
	return updated_chat, nil
}
func ExtractChatUsersInformations(chat_users []db.UserModel) []types.UserChatModel {
	users := []types.UserChatModel{}
	for _, user := range chat_users {
		photo, _ := user.Photo()
		updated_user := types.UserChatModel{
			Name:  user.Name,
			Email: user.Email,
			Photo: photo,
			Id:    user.ID,
		}
		users = append(users, updated_user)
	}
	return users
}

/* added user */
type ResponseAddUserToChatBody struct {
	Chat types.ChatRes `json:"chat"`
}

func AddUserToChat(res http.ResponseWriter, req *http.Request) {
	id := req.URL.Query().Get("id")
	if id == "" {
		res.WriteHeader(http.StatusUnauthorized)
		message := "Unauthorized"
		json.NewEncoder(res).Encode(types.MakeError(message, types.UNAUTHORIZED))
		return
	}

	prisma, ctx := global.GetPrisma()

	_, err := prisma.Chat.FindFirst(
		db.Chat.ID.Equals(id),
	).Exec(ctx)

	if err != nil {
		res.WriteHeader(http.StatusNotFound)
		message := "Chat Not found"
		json.NewEncoder(res).Encode(types.MakeError(message, types.NOT_FOUND))
		return
	}
	user, _ := req.Context().Value(types.CtxAuthKey{}).(*db.UserModel)
	updated_chat, err := prisma.Chat.FindUnique(
		db.Chat.ID.Equals(id),
	).With(
		db.Chat.Messages.Fetch(),
		db.Chat.Trip.Fetch(),
		db.Chat.Users.Fetch(),
	).Update(
		db.Chat.Users.Link(
			db.User.ID.Equals(user.ID),
		),
	).Exec(ctx)
	if err != nil {
		fmt.Println(err)
		res.WriteHeader(http.StatusNotFound)
		message := "Chat Not found"
		json.NewEncoder(res).Encode(types.MakeError(message, types.NOT_FOUND))
		return
	}

	chat_users := updated_chat.Users()
	users := ExtractChatUsersInformations(chat_users)
	trip, _ := updated_chat.Trip()
	messages := updated_chat.Messages()

	chatStructure := types.ChatRes{
		ChatModel: updated_chat,
		Users:     users,
		Trip:      trip,
		Messages:  messages,
	}
	response := ResponseAddUserToChatBody{
		Chat: chatStructure,
	}
	// ! SEND SOCKET TO OTHERS
	res.WriteHeader(http.StatusCreated)
	json.NewEncoder(res).Encode(response)
}

func RemoveUserFromChat(res http.ResponseWriter, req *http.Request) {
	id := req.URL.Query().Get("id")
	if id == "" {
		res.WriteHeader(http.StatusUnauthorized)
		message := "Unauthorized"
		json.NewEncoder(res).Encode(types.MakeError(message, types.NOT_FOUND))
		return
	}

	prisma, ctx := global.GetPrisma()
	user, _ := req.Context().Value(types.CtxAuthKey{}).(*db.UserModel)

	_, err := prisma.Chat.FindFirst(
		db.Chat.ID.Equals(id),
		db.Chat.Users.Some(
			db.User.ID.Equals(user.ID),
		),
	).Exec(ctx)

	if err != nil {
		res.WriteHeader(http.StatusNotFound)
		message := "Chat Not found"
		json.NewEncoder(res).Encode(types.MakeError(message, types.NOT_FOUND))
		return
	}
	_, err = prisma.Chat.FindUnique(
		db.Chat.ID.Equals(id),
	).With(
		db.Chat.Messages.Fetch(),
		db.Chat.Trip.Fetch(),
		db.Chat.Users.Fetch(),
	).Update(
		db.Chat.Users.Unlink(
			db.User.ID.Equals(user.ID),
		),
	).Exec(ctx)

	//! SEND SOCKET TO OTHER USERS
	res.WriteHeader(http.StatusAccepted)
	message := "Left Channel"
	json.NewEncoder(res).Encode(types.MessageResponse{Message: message})
}

func ParseChatTrip(unparsed_chat []db.ChatModel) []types.ChatTrip {
	chats := []types.ChatTrip{}
	for _, chat := range unparsed_chat {
		trip, _ := chat.Trip()
		parsed_chat := types.ChatTrip{
			ChatModel: chat,
			Trip:      trip,
		}
		chats = append(chats, parsed_chat)
	}
	return chats
}
