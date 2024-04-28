package handlers

import (
	"encoding/json"
	"net/http"
	"pc3r/projet/db"
	"pc3r/projet/global"
	types "pc3r/projet/http/types"
)

type GetUserBody struct {
	Id string `json:"id"`
}
type ResponseGetBody struct {
	User types.UserRes `json:"user"`
}

func getUser(res http.ResponseWriter, req *http.Request) {
	var body GetUserBody
	err := json.NewDecoder(req.Body).Decode(&body)
	if err != nil {
		res.WriteHeader(http.StatusUnauthorized)
		message := "Id not passed"
		json.NewEncoder(res).Encode(types.MakeError(message, types.INPUT_ERROR))
		return
	}
	user, _ := req.Context().Value(types.CtxAuthKey{}).(*db.UserModel)

	if err != nil {
		res.WriteHeader(http.StatusNotFound)
		message := "User Not Found"
		json.NewEncoder(res).Encode(types.MakeError(message, types.NOT_FOUND))
		return
	}
	chats := ParseChatTrip(user.Chats())
	userStruct := types.UserRes{
		UserModel: user,
		Chats:     chats,
	}
	response := ResponseGetBody{
		User: userStruct, // Assigner la structure User à response.User
	}

	res.WriteHeader(http.StatusCreated)
	json.NewEncoder(res).Encode(response)

}

type UpdateUserBody struct {
	Id              string `json:"id"`
	Name            string `json:"name"`
	Password        string `json:"password"`
	ConfirmPassword string `json:"confirmPassword"`
}
type ResponseUpdateBody struct {
	Message string        `json:"message"`
	User    types.UserRes `json:"user"`
}

func updateUser(res http.ResponseWriter, req *http.Request) {
	var body UpdateUserBody
	err := json.NewDecoder(req.Body).Decode(&body)
	if (err != nil) || (body.Name == "" && body.Password == "") {
		res.WriteHeader(http.StatusAccepted)
		message := "Nothing to Update"
		json.NewEncoder(res).Encode(types.MessageResponse{Message: message})
		return
	}

	prisma, ctx := global.GetPrisma()
	user, _ := req.Context().Value(types.CtxAuthKey{}).(*db.UserModel)

	if err != nil {
		res.WriteHeader(http.StatusNotFound)
		message := "User Not Found"
		json.NewEncoder(res).Encode(types.MakeError(message, types.NOT_FOUND))
		return
	}
	updated_name := user.Name
	if body.Name != "" {
		updated_name = body.Name
	}
	updated_password, _ := user.Password()
	if body.Password != "" {
		if body.Password != body.ConfirmPassword {
			res.WriteHeader(http.StatusForbidden)
			message := "Password mismatch"
			json.NewEncoder(res).Encode(types.MakeError(message, types.INPUT_ERROR))
			return
		}
		updated_password = body.Password
	}

	updated_user, err := prisma.User.FindUnique(
		db.User.ID.Equals(user.ID),
	).With(
		db.User.Chats.Fetch().With(
			db.Chat.Trip.Fetch(),
			db.Chat.Users.Fetch(),
		),
	).Update(
		db.User.Name.Set(updated_name),
		db.User.Password.Set(updated_password),
	).Exec(ctx)
	if err != nil {
		res.WriteHeader(http.StatusInternalServerError)
		message := "Internal Server Error"
		json.NewEncoder(res).Encode(types.MakeError(message, types.INTERNAL_SERVER_ERROR))
		return
	}
	chats := ParseChatTrip(updated_user.Chats())
	userStruct := types.UserRes{
		UserModel: updated_user,
		Chats:     chats,
	}
	response := ResponseUpdateBody{
		Message: "User updated",
		User:    userStruct, // Assigner la structure User à response.User
	}
	res.WriteHeader(http.StatusCreated)
	json.NewEncoder(res).Encode(response)

}
func deleteUser(res http.ResponseWriter, req *http.Request) {

}

func UserRoute(res http.ResponseWriter, req *http.Request) {

	if req.Method == "GET" {
		getUser(res, req)
		return
	}
	if req.Method == "PUT" {
		updateUser(res, req)
		return
	}
	deleteUser(res, req)
}

type GetUserDetailsBody struct {
	Email string `json:"email"`
	Name  string `json:"name"`
}
type ResponseGetUserDetailsBody struct {
	Users []types.UserDetails `json:"users"`
}

func UserDetailsRoute(res http.ResponseWriter, req *http.Request) {
	var body GetUserDetailsBody
	err := json.NewDecoder(req.Body).Decode(&body)
	if err != nil {
		res.WriteHeader(http.StatusBadRequest)
		message := "Bad request"
		json.NewEncoder(res).Encode(types.MakeError(message, types.BAD_REQUEST))
		return
	}
	prisma, ctx := global.GetPrisma()
	users, err := prisma.User.FindMany(
		db.User.Name.Contains(body.Name),
		db.User.Email.Contains(body.Email),
	).Exec(ctx)
	if err != nil {
		res.WriteHeader(http.StatusNotFound)
		message := "Not Found"
		json.NewEncoder(res).Encode(types.MakeError(message, types.NOT_FOUND))
		return
	}
	updated_users := ExtractChatUsersInformations(users)

	response := ResponseGetUserDetailsBody{
		Users: updated_users,
	}
	res.WriteHeader(http.StatusCreated)
	json.NewEncoder(res).Encode(response)
}
