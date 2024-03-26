package token

import (
	"log"
	"time"

	jwt "github.com/golang-jwt/jwt/v5"
)

var secretKey = []byte("secret-key")

func CreateToken(id string) (string, int64, error) {
	exp := time.Now().Add(time.Hour * 24).Unix()
	// sauvegarder dans le token le : id ainsi que l'horaire
	token := jwt.NewWithClaims(jwt.SigningMethodHS256,
		jwt.MapClaims{
			"id":  id,
			"exp": exp,
		})

	tokenString, err := token.SignedString(secretKey)
	if err != nil {
		return "", 0, err
	}

	return tokenString, exp, nil
}

func VerifyToken(tokenString string) (jwt.MapClaims, bool) {
	// parser le token
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// check token signing method etc
		return secretKey, nil
	})

	if err != nil {
		return nil, false
	}
	// vérifier si le token est valid, si oui on retourne les claims qui est une map  ({id,exp})
	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		return claims, true
	} else {
		log.Printf("Invalid JWT Token")
		return nil, false
	}
}
