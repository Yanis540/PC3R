/*

le package par défaut pour les sockets est : https://pkg.go.dev/golang.org/x/net/websocket
cependant dans leurs propres documentation ils disent qu'il manque pas mal de features par rapport à d'autres package 
!   broadcast event : https://stackoverflow.com/questions/31532652/go-websocket-send-all-clients-a-message
!   https://github.com/gorilla/websocket/blob/main/examples/chat/hub.go


!   chat.go : 
?       -   AddUserToChat : send socket to the channel 
*/