# Utilisation de l'image de base Ubuntu
FROM ubuntu:jammy

# Mise à jour et installation de paquets nécessaires
RUN apt-get update && \
    apt-get install -y \
    curl \
    git \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Installation de Go 1.21.6
ENV GOLANG_VERSION 1.21.6
RUN curl -fsSL https://golang.org/dl/go$GOLANG_VERSION.linux-amd64.tar.gz | tar -C /usr/local -xz

# Configuration de l'environnement Go
ENV PATH=$PATH:/usr/local/go/bin

# Définition du répertoire de travail
WORKDIR /app/

# Copie des fichiers de l'application
COPY . .
# Exécution des commandes spécifiées
RUN go get 
RUN go run github.com/steebchen/prisma-client-go generate 
RUN go build -o ./out

# Exécution de l'application
CMD ["./out"]