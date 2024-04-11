# Utilisation de l'image de base de Nixpacks de Railway
FROM ghcr.io/railwayapp/nixpacks:ubuntu-1707782610@sha256:8f4b0fd95dc3311cf9a59f236d8d7d7f956fe21a2a1d64b53c82f12c4e859f09 AS base

# Installation de go
RUN nix-env -if .nixpacks/nixpkgs-1f13eabcd6f5b00fe9de9575ac52c66a0e887ce6.nix && nix-collect-garbage -d

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