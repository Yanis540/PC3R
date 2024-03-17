package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"pc3r/projet/db"
	"pc3r/projet/global"
	types "pc3r/projet/http/types"
	"pc3r/projet/token"
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
	if (err != nil) || body.Id == "" {
		res.WriteHeader(http.StatusUnauthorized)
		message := "Id not passed"
		json.NewEncoder(res).Encode(types.MakeError(message, types.INPUT_ERROR))
		return
	}
	prisma, ctx := global.GetPrisma()
	user, err := prisma.User.FindFirst(
		db.User.ID.Equals(body.Id),
	).With(
		db.User.Chats.Fetch(), // Récupérer les chats associés à l'utilisateur
	).Exec(ctx)

	if err != nil {
		res.WriteHeader(http.StatusNotFound)
		message := "User Not Found"
		json.NewEncoder(res).Encode(types.MakeError(message, types.NOT_FOUND))
		return
	}
	userStruct := types.UserRes{
		UserModel: user,
		Chats:     user.Chats(),
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
	if (err != nil) || body.Id == "" || (body.Name == "" && body.Password == "") {
		res.WriteHeader(http.StatusAccepted)
		message := "Nothing to Update"
		json.NewEncoder(res).Encode(types.MessageResponse{Message: message})
		return
	}
	prisma, ctx := global.GetPrisma()
	user, err := prisma.User.FindFirst(
		db.User.ID.Equals(body.Id),
	).With(
		db.User.Chats.Fetch(), // Récupérer les chats associés à l'utilisateur
	).Exec(ctx)

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
		db.User.ID.Equals(body.Id),
	).With(
		db.User.Chats.Fetch(), // Récupérer les chats associés à l'utilisateur
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
	userStruct := types.UserRes{
		UserModel: updated_user,
		Chats:     updated_user.Chats(),
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

type SignInBody struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}
type ResponseSignInBody struct {
	User   types.UserRes    `json:"user"`
	Tokens types.AuthTokens `json:"tokens"`
}

func UserSignIn(res http.ResponseWriter, req *http.Request) {

	var body SignInBody

	err := json.NewDecoder(req.Body).Decode(&body)
	if (err != nil) || (body.Email == "" || body.Password == "") {
		res.WriteHeader(http.StatusBadRequest)
		message := "Invalid  email / passowrd "
		json.NewEncoder(res).Encode(types.MakeError(message, types.INPUT_ERROR))
		return
	}
	prisma, ctx := global.GetPrisma()

	user, err := prisma.User.FindFirst(
		db.User.Email.Equals(body.Email),
	).With(
		db.User.Chats.Fetch(), // Récupérer les chats associés à l'utilisateur
	).Exec(ctx)
	if err != nil {
		res.WriteHeader(http.StatusUnauthorized)
		message := "Invalid email"
		json.NewEncoder(res).Encode(types.MakeError(message, types.INPUT_ERROR))
		return
	}
	user_password, _ := user.Password()
	if user_password != body.Password {
		res.WriteHeader(http.StatusUnauthorized)
		message := "Invalid password"
		json.NewEncoder(res).Encode(types.MakeError(message, types.INPUT_ERROR))
		return
	}
	userStruct := types.UserRes{
		UserModel: user,
		Chats:     user.Chats(),
	}
	accesToken, _, _ := token.CreateToken(user.ID)
	tokens := types.AuthTokens{
		Access: accesToken,
	}
	// Construire la réponse JSON
	response := ResponseSignInBody{
		User:   userStruct, // Assigner la structure User à response.User
		Tokens: tokens,
	}
	res.WriteHeader(http.StatusCreated)
	json.NewEncoder(res).Encode(response)

}

type SignUpBody struct {
	Email    string `json:"email"`
	Password string `json:"password"`
	Name     string `json:"name"`
}
type ResponseSignUpBody struct {
	Success bool   `json:"success"`
	Id      string `json:"id"`
	Message string `json:"message"`
}

func UserSignUp(res http.ResponseWriter, req *http.Request) {

	var body SignUpBody

	err := json.NewDecoder(req.Body).Decode(&body)
	if (err != nil) || (body.Email == "" || body.Password == "" || body.Name == "") {
		fmt.Printf(body.Email)
		fmt.Printf(body.Password)
		fmt.Printf(body.Name)
		res.WriteHeader(http.StatusBadRequest)
		message := "Email or Name or passowrd are missing "
		json.NewEncoder(res).Encode(types.MakeError(message, types.INPUT_ERROR))
		return
	}
	prisma, ctx := global.GetPrisma()

	_, err = prisma.User.FindFirst(
		db.User.Email.Equals(body.Email),
	).Exec(ctx)

	if err == nil {
		res.WriteHeader(http.StatusUnauthorized)
		message := "Account already created"
		json.NewEncoder(res).Encode(types.MakeError(message, types.UNAUTHORIZED))
		return
	}

	new_user, err := prisma.User.CreateOne(
		db.User.Name.Set(body.Name),
		db.User.Email.Set(body.Email),
		db.User.Password.Set(body.Password),
	).Exec(ctx)

	if err != nil {
		res.WriteHeader(http.StatusInternalServerError)
		message := "Internal server error"
		json.NewEncoder(res).Encode(types.MakeError(message, types.INTERNAL_SERVER_ERROR))
		return
	}

	res.WriteHeader(http.StatusCreated)
	json.NewEncoder(res).Encode(ResponseSignUpBody{Message: "User Created", Success: true, Id: new_user.ID})

}
