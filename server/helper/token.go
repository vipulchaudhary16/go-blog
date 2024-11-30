package helper

import (
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/vipulchaudhary16/go-blog/model"
)

type TokenPayload struct {
	Email  string
	UserId uint

	jwt.RegisteredClaims
}

const TOKEN_TYPE_ACCESS = "access-token"
const TOKEN_TYPE_REFRESH = "refresh-token"

func getSecret(tokenType string) string {
	if tokenType == TOKEN_TYPE_ACCESS {
		return os.Getenv("jwt_secret")
	}
	if tokenType == TOKEN_TYPE_REFRESH {
		return os.Getenv("jwt_refresh_secret")
	}
	return ""
}

func GenerateToken(user model.User, expiryMinutes int, tokenType string) (string, error) {
	payload := TokenPayload{
		user.Email,
		user.ID,
		jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Local().Add(time.Minute * time.Duration(expiryMinutes))),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, payload)

	t, err := token.SignedString([]byte(getSecret(tokenType)))

	if err != nil {
		return "", err
	}

	return string(t), nil
}

func ValidateToken(clientToken string, tokenType string) (tokenPayload *TokenPayload, msg string) {
	token, err := jwt.ParseWithClaims(clientToken, &TokenPayload{}, func(t *jwt.Token) (interface{}, error) {
		return []byte(getSecret(tokenType)), nil
	})

	if err != nil {
		msg = err.Error()
	}

	payload, ok := token.Claims.(*TokenPayload)

	if !ok {
		msg = err.Error()
	}

	return payload, msg
}
