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

type SignInBody struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}
type ResponseSignInBody struct {
	User   types.UserRes    `json:"user"`
	Tokens types.AuthTokens `json:"tokens"`
}

/*
@handler : Handles sign in of user by validating the input body from request

	@returns : {
		user, tokens : {
			access
		}
	}
*/
func UserSignIn(res http.ResponseWriter, req *http.Request) {

	var body SignInBody
	// decoder le body
	err := json.NewDecoder(req.Body).Decode(&body)
	if (err != nil) || (body.Email == "" || body.Password == "") {
		res.WriteHeader(http.StatusBadRequest)
		message := "Invalid  email / passowrd "
		json.NewEncoder(res).Encode(types.MakeError(message, types.INPUT_ERROR))
		return
	}

	prisma, ctx := global.GetPrisma()
	// vérifier que l'utilisateur existe

	user, err := prisma.User.FindFirst(
		db.User.Email.Equals(body.Email),
	).With(
		db.User.Chats.Fetch().With(
			db.Chat.Trip.Fetch(),
			db.Chat.Users.Fetch(),
		), // Récupérer les chats associés à l'utilisateur
	).Exec(ctx)
	if err != nil {
		res.WriteHeader(http.StatusUnauthorized)
		message := "Invalid email"
		json.NewEncoder(res).Encode(types.MakeError(message, types.INPUT_ERROR))
		return
	}
	user_password, _ := user.Password()
	// vérifier que le password match
	if user_password != body.Password {
		res.WriteHeader(http.StatusUnauthorized)
		message := "Invalid password"
		json.NewEncoder(res).Encode(types.MakeError(message, types.INPUT_ERROR))
		return
	}
	chats := ParseChatTrip(user.Chats())
	// l'utilisateur est bien connecté, lui envoyer les jettons de connections
	userStruct := types.UserRes{
		UserModel: user,
		Chats:     chats,
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

/*
@handler : Handles sign up of user by validating the input body from request

	@returns : {
		message, success
	}
*/
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
