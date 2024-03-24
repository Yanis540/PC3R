package types

type StopPoint struct {
	Id   string `json:"id"`
	Name string `json:"name"`
}
type Place struct {
	Id         string    `json:"id"`
	Name       string    `json:"name"`
	Stop_point StopPoint `json:"stop_point"`
}
type Section struct {
	Id                  string `json:"id"`
	Departure_date_time string `json:"departure_date_time"`
	Arrival_date_time   string `json:"arrival_date_time"`
	To                  Place  `json:"to"`
	From                Place  `json:"from"`
}
type Journey struct {
	Departure_date_time string    `json:"departure_date_time"`
	Arrival_date_time   string    `json:"arrival_date_time"`
	Sections            []Section `json:"sections"`
}

type HTTPSncfJourneysResponse struct {
	Journeys []Journey `json:"journeys"`
}
