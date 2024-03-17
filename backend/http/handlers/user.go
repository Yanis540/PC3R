package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"pc3r/projet/db"
	"pc3r/projet/global"
	types "pc3r/projet/http/types"
)

func userGet(res http.ResponseWriter, req *http.Request) {
	// var body ReqBody
	// err := json.NewDecoder(req.Body).Decode(&body)
	// if err != nil {
	// 	http.Error(res, err.Error(), http.StatusBadRequest)
	// 	return
	// }
	// fmt.Printf("%s  \n", body.Message)

	// // jsonBody := []byte(`{"client_message": "hello, server!"}`)
	// // bodyReader := bytes.NewReader(jsonBody)
	// client, ctx := global.GetPrisma()
	// user, err := client.User.FindFirst(
	// 	db.User.Name.Equals("Yanis"),
	// ).Exec(ctx)
	// if err != nil {
	// 	res.WriteHeader(http.StatusNotFound)
	// 	json.NewEncoder(res).Encode(types.HTTPError{Message: "NOT_FOUND"})
	// 	return
	// }
	// res.WriteHeader(http.StatusCreated)
	// res_body := ResBody{Success: true, Name: user.Name}
	// json.NewEncoder(res).Encode(res_body)
}
func userPost(res http.ResponseWriter, req *http.Request) {

}
func userPut(res http.ResponseWriter, req *http.Request) {

}
func userDelete(res http.ResponseWriter, req *http.Request) {

}

func UserRoute(res http.ResponseWriter, req *http.Request) {

	if req.Method == "GET" {
		userGet(res, req)
		return
	}
	if req.Method == "POST" {
		userPost(res, req)
		return
	}
	if req.Method == "PUT" {
		userPut(res, req)
		return
	}
	userDelete(res, req)
}

func UserSignIn(res http.ResponseWriter, req *http.Request) {
	type SignUpBody struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	type UserRes struct {
		*db.UserModel
		Chats []db.ChatModel `json:"chats"`
	}
	type responseBody struct {
		Success bool    `json:"success"`
		Message string  `json:"message"`
		User    UserRes `json:"user"`
	}
	var body SignUpBody

	err := json.NewDecoder(req.Body).Decode(&body)
	if (err != nil) || (body.Email == "" || body.Password == "") {
		res.WriteHeader(http.StatusBadRequest)
		message := "Invalid  email / passowrd "
		json.NewEncoder(res).Encode(types.HTTPError{Message: message})
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
		json.NewEncoder(res).Encode(types.HTTPError{Message: message})
		return
	}
	user_password, _ := user.Password()
	if user_password != body.Password {
		res.WriteHeader(http.StatusUnauthorized)
		message := "Invalid password"
		json.NewEncoder(res).Encode(types.HTTPError{Message: message})
		return
	}
	userStruct := UserRes{
		UserModel: user,
		Chats:     user.Chats(),
	}
	// Construire la réponse JSON
	response := responseBody{
		Success: true,
		Message: "Utilisateur et chats récupérés avec succès",
		User:    userStruct, // Assigner la structure User à response.User
	}
	res.WriteHeader(http.StatusCreated)
	json.NewEncoder(res).Encode(response)

}

func UserSignUp(res http.ResponseWriter, req *http.Request) {

	// prisma, ctx := global.GetPrisma()
	type SignUpBody struct {
		Email    string `json:"email"`
		Password string `json:"password"`
		Name     string `json:"name"`
	}
	type responseBody struct {
		Success bool   `json:"success"`
		Id      string `json:"id"`
		Message string `json:"message"`
	}
	var body SignUpBody

	err := json.NewDecoder(req.Body).Decode(&body)
	if (err != nil) || (body.Email == "" || body.Password == "" || body.Name == "") {
		fmt.Printf(body.Email)
		fmt.Printf(body.Password)
		fmt.Printf(body.Name)
		res.WriteHeader(http.StatusBadRequest)
		message := "Bad_Request : Expected : email, name,passowrd "
		json.NewEncoder(res).Encode(types.HTTPError{Message: message})
		return
	}
	prisma, ctx := global.GetPrisma()

	_, err = prisma.User.FindFirst(
		db.User.Email.Equals(body.Email),
	).Exec(ctx)

	if err == nil {
		res.WriteHeader(http.StatusUnauthorized)
		message := "Account already created"
		json.NewEncoder(res).Encode(types.HTTPError{Message: message})
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
		json.NewEncoder(res).Encode(types.HTTPError{Message: message})
		return
	}
	res.WriteHeader(http.StatusCreated)
	json.NewEncoder(res).Encode(responseBody{Message: "User Created", Success: true, Id: new_user.ID})

}
