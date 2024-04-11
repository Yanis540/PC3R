# Utilisation d'une image Docker avec Go 1.21.6
FROM golang:1.21.6

# Configuration de l'environnement Go
ENV PATH=$PATH:/usr/local/go/bin

# Définition du répertoire de travail
WORKDIR /app/

# Copie des fichiers de l'application
COPY . .
# Exécution des commandes spécifiées
RUN go mod tidy 
RUN go get github.com/steebchen/prisma-client-go
RUN go run github.com/steebchen/prisma-client-go generate 
RUN go get 
RUN go build -o ./out

# Exécution de l'application
CMD ["./out"]