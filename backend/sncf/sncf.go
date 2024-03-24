package sncf

import (
	"encoding/json"
	"fmt"
	"net/http"
	env "pc3r/projet/env"
	"pc3r/projet/sncf/types"
	"time"
)

func fetchFromUrl(URL string) (*http.Response, error) {
	SNCF_API_KEY := env.EnvVariable("SNCF_API_KEY")
	client := &http.Client{}
	req, err := http.NewRequest("GET", URL, nil)
	if err != nil {
		//Handle Error
		return nil, err
	}
	req.Header = http.Header{
		"Authorization": {SNCF_API_KEY},
	}
	res, err := client.Do(req)
	if err != nil {
		return nil, err
	}

	return res, nil
}

func GetJourneys() ([]types.Journey, error) {
	CURRENT_TIME := time.Now().Format("20060102")
	URL := fmt.Sprintf("https://api.sncf.com/v1/coverage/sncf/journeys?from=admin:fr:75056&to=admin:fr:69123&datetime=%s", CURRENT_TIME)
	fmt.Println(URL)
	res, err := fetchFromUrl(URL)
	if err != nil {
		fmt.Println("Some error occured")
		return []types.Journey{}, err
	}
	var results types.HTTPSncfJourneysResponse
	err = json.NewDecoder(res.Body).Decode(&results)
	if err != nil {
		fmt.Println(err)
		fmt.Println("Could not decode json")
		return []types.Journey{}, err
	}
	return results.Journeys, nil

}

func ParseSNCFfDate(string_date string) (time.Time, error) {
	date, err := time.Parse("20060102T150405", string_date)
	return date, err
}
