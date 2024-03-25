package handlers

import (
	"encoding/json"
	"net/http"
	"pc3r/projet/db"
	"pc3r/projet/global"
	types "pc3r/projet/http/types"
)

// get the daily

type GetTripsBody struct {
}
type responseGetTripBody struct {
	Trips []types.TripRes `json:"trips"`
}

func GetTrips(res http.ResponseWriter, req *http.Request) {

	prisma, ctx := global.GetPrisma()
	trips_unstructured, err := prisma.Trip.FindMany(
	// db.Trip.DepartureTime.AfterEquals(time.Now()),
	).With(
		db.Trip.Chat.Fetch(),
	).Exec(ctx)

	if err != nil {
		res.WriteHeader(http.StatusNotFound)
		message := "User Not Found"
		json.NewEncoder(res).Encode(types.MakeError(message, types.NOT_FOUND))
		return
	}
	trips := []types.TripRes{}
	for _, trip := range trips_unstructured {
		trips = append(trips, types.TripRes{
			TripModel: trip,
			Chat:      trip.Chat(),
		})
	}
	response := responseGetTripBody{
		Trips: trips, // Assigner la structure User à response.User
	}

	res.WriteHeader(http.StatusCreated)
	json.NewEncoder(res).Encode(response)
}
