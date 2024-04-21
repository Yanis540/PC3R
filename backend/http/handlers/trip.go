package handlers

import (
	"encoding/json"
	"net/http"
	"pc3r/projet/db"
	"pc3r/projet/global"
	types "pc3r/projet/http/types"
	"time"
)

// get the daily

type GetTripsBody struct {
}
type responseGetTripBody struct {
	Trips []types.TripRes `json:"trips"`
}

/*
@handler : Gets the daily trips
*/
func GetTrips(res http.ResponseWriter, req *http.Request) {

	prisma, ctx := global.GetPrisma()
	currentDate := time.Now()
	startOfDay := time.Date(currentDate.Year(), currentDate.Month(), currentDate.Day(), 0, 0, 0, 0, currentDate.Location())
	endOfDay := time.Date(currentDate.Year(), currentDate.Month(), currentDate.Day(), 23, 59, 59, 0, currentDate.Location())

	trips_unstructured, err := prisma.Trip.FindMany(
		db.Trip.DepartureTime.Gt(startOfDay),
		db.Trip.DepartureTime.Lt(endOfDay),
	).With(
		db.Trip.Chat.Fetch().With(
			db.Chat.Users.Fetch(),
		),
	).Exec(ctx)

	if err != nil {
		res.WriteHeader(http.StatusNotFound)
		message := "User Not Found"
		json.NewEncoder(res).Encode(types.MakeError(message, types.NOT_FOUND))
		return
	}
	trips := []types.TripRes{}
	for _, trip := range trips_unstructured {
		users := ExtractChatUsersInformations(trip.Chat().Users())
		chat_structre := types.TipChat{
			ChatModel: trip.Chat(),
			Users:     users,
		}
		trips = append(trips, types.TripRes{
			TripModel: trip,
			Chat:      chat_structre,
		})
	}
	response := responseGetTripBody{
		Trips: trips, // Assigner la structure User à response.User
	}

	res.WriteHeader(http.StatusCreated)
	json.NewEncoder(res).Encode(response)
}
