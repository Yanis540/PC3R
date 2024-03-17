package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"pc3r/projet/db"
	"pc3r/projet/global"
	types "pc3r/projet/http/types"
)

type ResBody struct {
	Success bool
	Name    string
}
type ReqBody struct {
	Message string
}

func BasicRoute(res http.ResponseWriter, req *http.Request) {
	var body ReqBody
	err := json.NewDecoder(req.Body).Decode(&body)
	if err != nil {
		http.Error(res, err.Error(), http.StatusBadRequest)
		return
	}
	fmt.Printf("%s  \n", body.Message)

	// jsonBody := []byte(`{"client_message": "hello, server!"}`)
	// bodyReader := bytes.NewReader(jsonBody)
	client, ctx := global.GetPrisma()
	user, err := client.User.FindFirst(
		db.User.Name.Equals("Yanis"),
	).Exec(ctx)
	if err != nil {
		res.WriteHeader(http.StatusNotFound)
		json.NewEncoder(res).Encode(types.HTTPError{Message: "NOT_FOUND"})
		return
	}
	res.WriteHeader(http.StatusCreated)
	res_body := ResBody{Success: true, Name: user.Name}
	json.NewEncoder(res).Encode(res_body)
}
