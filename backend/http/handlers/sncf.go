package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	types "pc3r/projet/http/types"
	sncf "pc3r/projet/sncf"
	types_sncf "pc3r/projet/sncf/types"
	"time"
)

func GetSNCFJourneys(res http.ResponseWriter, req *http.Request) {
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
	SeedDatabase()
	res.WriteHeader(http.StatusCreated)
	json.NewEncoder(res).Encode(response)

}

func SeedDatabase() {
	CURRENT_TIME := time.Now().Format("20060102")
	fmt.Println(CURRENT_TIME)
	fmt.Println("Seeding database for day : ", CURRENT_TIME)

	journeys, err := sncf.GetJourneys()
	if err != nil {
		return
	}
	for _, journey := range journeys {
		for _, section := range journey.Sections {
			chatProps := CreateChatProps{
				Trip: section,
			}
			// Ensuite, créer le Chat en référençant le Trip créé
			if section.From.Name == "" || section.To.Name == "" {
				continue
			}
			_, err := CreateChatFn(chatProps)
			if err != nil {
				name := section.From.Name + " " + section.To.Name
				fmt.Printf("Could not create Chat for Trip : %s \n", name)
			}
		}
	}
	fmt.Println("Finished seeding database for the day ")

}
