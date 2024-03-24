package handlers

import (
	"encoding/json"
	"net/http"
	types "pc3r/projet/http/types"
	sncf "pc3r/projet/sncf"
	types_sncf "pc3r/projet/sncf/types"
)

func GetJourneys(res http.ResponseWriter, req *http.Request) {
	journeys, err := sncf.GetJourneys()
	if err != nil {
		res.WriteHeader(http.StatusBadRequest)
		message := "Bad request to SNCF API"
		json.NewEncoder(res).Encode(types.MakeError(message, types.BAD_REQUEST))
		return
	}
	type responseGetJourneys struct {
		Journeys []types_sncf.Journey `json:"journeys"`
	}
	response := responseGetJourneys{
		Journeys: journeys,
	}
	res.WriteHeader(http.StatusCreated)
	json.NewEncoder(res).Encode(response)

}
