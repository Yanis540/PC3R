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
	"strings"
	"time"
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
		db.Chat.Messages.Fetch().With(
			db.Message.User.Fetch(),
		),
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
	messages := StructureMessages(chat.Messages())
	chatStructure := types.ChatRes{
		Messages:  messages,
		ChatModel: chat,
		Users:     users,
		Trip:      trip,
	}
	response := ResponseGetChatBody{
		Chat: chatStructure,
	}
	res.WriteHeader(http.StatusCreated)
	json.NewEncoder(res).Encode(response)

}

type CreateChatProps struct {
	Id string `json:"id"`
}

/*
@handler : Create a chat user based on the trip
@expects :

	Body:{ id : string ## ID of the other user
	}

	@returns :{
		Chat : chat
	}
*/
func CreateChat(res http.ResponseWriter, req *http.Request) {
	var body CreateChatProps
	err := json.NewDecoder(req.Body).Decode(&body)
	if (err != nil) || body.Id == "" {
		res.WriteHeader(http.StatusUnauthorized)
		message := "Missing properties"
		json.NewEncoder(res).Encode(types.MakeError(message, types.INPUT_ERROR))
		return
	}

	user, _ := req.Context().Value(types.CtxAuthKey{}).(*db.UserModel)

	prisma, ctx := global.GetPrisma()
	other_user, err := prisma.User.FindFirst(
		db.User.ID.Equals(body.Id),
	).Exec(ctx)

	if err != nil {
		res.WriteHeader(http.StatusNotFound)
		message := "Not Found"
		json.NewEncoder(res).Encode(types.MakeError(message, types.NOT_FOUND))
		return
	}
	existing_chat, err := prisma.Chat.FindFirst(
		db.Chat.Or(
			db.Chat.And(
				db.Chat.Name.Equals(user.ID+"-"+other_user.ID),
			),
			db.Chat.And(
				db.Chat.Name.Equals(other_user.ID+"-"+user.ID),
			),
		),
	).Exec(ctx)
	if err == nil || existing_chat != nil {
		res.WriteHeader(http.StatusBadRequest)
		message := "Chat already created "
		json.NewEncoder(res).Encode(types.MakeError(message, types.BAD_REQUEST))
		return
	}
	chat_name := user.ID + "-" + other_user.ID
	chat, err := CreateChatFn(CreateChatFnProps{Name: chat_name, Date: time.Now()})
	if err != nil {
		res.WriteHeader(http.StatusBadRequest)
		message := "Could not create chat "
		json.NewEncoder(res).Encode(types.MakeError(message, types.BAD_REQUEST))
		return
	}
	// updating the chat
	updated_chat, _ := prisma.Chat.FindUnique(
		db.Chat.ID.Equals(chat.ID),
	).With(
		db.Chat.Users.Fetch(),
		db.Chat.Messages.Fetch().With(
			db.Message.User.Fetch(),
		),
		db.Chat.Trip.Fetch(),
	).Update(
		db.Chat.IsGroupChat.Set(false),
		db.Chat.Users.Link(
			db.User.ID.Equals(user.ID),
			db.User.ID.Equals(other_user.ID),
		),
	).Exec(ctx)
	users := ExtractChatUsersInformations(updated_chat.Users())
	trip, _ := updated_chat.Trip()
	chatStructure := types.ChatRes{
		ChatModel: chat,
		Users:     users,
		Trip:      trip,
		Messages:  []types.MessageChatResponse{},
	}
	response := ResponseGetChatBody{
		Chat: chatStructure,
	}
	res.WriteHeader(http.StatusCreated)
	json.NewEncoder(res).Encode(response)
}

type CreateChatFnProps struct {
	Name string    `json:"name"`
	Date time.Time `json:"date"`
}

func CreateChatFn(props CreateChatFnProps) (*db.ChatModel, error) {
	prisma, ctx := global.GetPrisma()
	chat, err := prisma.Chat.CreateOne(
		db.Chat.Name.Set(props.Name),
		db.Chat.Date.Set(props.Date),
	).Exec(ctx)
	return chat, err
}

type CreateTripChatProps struct {
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
func CreateTripChatFn(props CreateTripChatProps) (*db.ChatModel, error) {
	prisma, ctx := global.GetPrisma()

	Name := props.Trip.From.Name + " - " + props.Trip.To.Name
	parsed_departure_time, err := sncf.ParseSNCFfDate(props.Trip.Departure_date_time)
	parsed_arrival_time, _ := sncf.ParseSNCFfDate(props.Trip.Arrival_date_time)
	if err != nil {
		fmt.Printf("Error parsing date")
		return nil, err
	}
	chat, err := CreateChatFn(CreateChatFnProps{Name: Name, Date: parsed_departure_time})
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

/*
@func : This functions allows to extract only necessary user informations to be displayed  in the chat, since go-prisma doesn't have this yet (may raise an issue in the repo )
*/
func ExtractChatUsersInformations(chat_users []db.UserModel) []types.UserChatModel {
	users := []types.UserChatModel{}
	for _, user := range chat_users {
		photo, _ := user.Photo()
		// extract only necessary informations such as : id, name , email , photo
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

/*
@func : Structures the messages
*/
func StructureMessages(messages []db.MessageModel) []types.MessageChatResponse {
	structured_messages := []types.MessageChatResponse{}
	for _, message := range messages {
		structured_message := StructureMessage(message)
		structured_messages = append(structured_messages, structured_message)
	}
	return structured_messages
}

/*
@func : Structures a message by letting only necessary user information
*/
func StructureMessage(message db.MessageModel) types.MessageChatResponse {
	m_user := message.User()
	photo, _ := m_user.Photo()

	message_user := types.UserChatModel{
		Id:    m_user.ID,
		Name:  m_user.Name,
		Photo: photo,
		Email: m_user.Email,
	}
	structured_message := types.MessageChatResponse{
		Id:         message.ID,
		Content:    message.Content,
		Chat_id:    message.ChatID,
		User_id:    message.UserID,
		Created_at: message.CreatedAt,
		User:       message_user,
	}
	return structured_message
}

/* added user */
type ResponseAddUserToChatBody struct {
	Chat types.ChatRes `json:"chat"`
}

/*
@handler : adds a user to the chat

	Query Params : {
		id : string
	}
*/
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
	// vérify if the chat exists
	if err != nil {
		res.WriteHeader(http.StatusNotFound)
		message := "Chat Not found"
		json.NewEncoder(res).Encode(types.MakeError(message, types.NOT_FOUND))
		return
	}
	user, _ := req.Context().Value(types.CtxAuthKey{}).(*db.UserModel)
	// update the chat by adding a user
	updated_chat, err := prisma.Chat.FindUnique(
		db.Chat.ID.Equals(id),
	).With(
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
	messages := StructureMessages(updated_chat.Messages())

	chatStructure := types.ChatRes{
		Messages:  messages,
		ChatModel: updated_chat,
		Users:     users,
		Trip:      trip,
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

/*
@func : Parses the chat so it can be used in the right format
*/
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

type SendMessageChatProps struct {
	Message string `json:"message"`
}

type ResponseSendMessage struct {
	Message *db.MessageModel `json:"message"`
}

func SendMessage(res http.ResponseWriter, req *http.Request) {
	id := req.URL.Query().Get("id")
	var body SendMessageChatProps
	err := json.NewDecoder(req.Body).Decode(&body)
	if (err != nil) || strings.TrimSpace(body.Message) == "" {
		res.WriteHeader(http.StatusUnauthorized)
		message := "Missing properties"
		json.NewEncoder(res).Encode(types.MakeError(message, types.INPUT_ERROR))
		return
	}
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
		db.Chat.Messages.Fetch().With(
			db.Message.User.Fetch(),
		),
		db.Chat.Trip.Fetch(),
	).Exec(ctx)

	if err != nil {
		res.WriteHeader(http.StatusNotFound)
		message := "Not Found"
		json.NewEncoder(res).Encode(types.MakeError(message, types.NOT_FOUND))
		return
	}

	message, err := prisma.Message.CreateOne(
		db.Message.Content.Set(body.Message),
		db.Message.Chat.Link(
			db.Chat.ID.Equals(chat.ID),
		),
		db.Message.User.Link(
			db.User.ID.Equals(user.ID),
		),
	).Exec(ctx)

	if err != nil {
		res.WriteHeader(http.StatusInternalServerError)
		message := "Internal Server error"
		json.NewEncoder(res).Encode(types.MakeError(message, types.INTERNAL_SERVER_ERROR))
		return
	}
	response := ResponseSendMessage{
		Message: message,
	}
	// ! SEND SOCKET TO OTHERS
	res.WriteHeader(http.StatusCreated)
	json.NewEncoder(res).Encode(response)
}
