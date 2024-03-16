go mod init pc3r/projet 
go mod tidy
go run main.go

go get github.com/steebchen/prisma-client-go

#   connection : supposons qu'on a postgres installé 
# dans un terminal 
psql -U postgres 
# écrire le mot de passe 
CREATE DATABASE pc3r;
#\c pc3r

#   initial push go run github.com/steebchen/prisma-client-go db push
#   migrate : go run github.com/steebchen/prisma-client-go migrate dev --name add_comment_model
