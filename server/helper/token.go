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

func GenerateToken(user model.User) (string, error) {
	payload := TokenPayload{
		user.Email,
		user.ID,
		jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Local().Add(time.Minute * 3)),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, payload)
	secret := os.Getenv("jwt_secret")

	t, err := token.SignedString([]byte(secret))

	if err != nil {
		return "", err
	}

	return string(t), nil
}
