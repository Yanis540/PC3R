/*

le package par défaut pour les sockets est : https://pkg.go.dev/golang.org/x/net/websocket
cependant dans leurs propres documentation ils disent qu'il manque pas mal de features par rapport à d'autres package 
!   broadcast event : https://stackoverflow.com/questions/31532652/go-websocket-send-all-clients-a-message
!   https://github.com/gorilla/websocket/blob/main/examples/chat/hub.go


!   chat.go : 
?       -   AddUserToChat : send socket to the channel 
!   Routes : https://api.sncf.com/v1/coverage/sncf/routes
!   https://api.sncf.com/v1/coverage/sncf/journeys?from=admin:fr:75056&to=admin:fr:69123&datetime=20240316T210444
?       -   Get the Places :  https://api.sncf.com/v1/coverage/sncf/places?q=paris
?           pour récupérer le place_id et le placer 
?       -   Get the journeys : https://api.sncf.com/v1/coverage/sncf/journeys?from=admin:fr:95176& datetime=20240316T210444
*/