package http

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type ResBody struct {
	Success bool
}

func BasicRoute(w http.ResponseWriter, r *http.Request) {

	fmt.Printf("server: %s /\n", r.Method)
	// jsonBody := []byte(`{"client_message": "hello, server!"}`)
	// bodyReader := bytes.NewReader(jsonBody)
	w.WriteHeader(http.StatusCreated)
	res_body := ResBody{Success: true}
	json.NewEncoder(w).Encode(res_body)
}
