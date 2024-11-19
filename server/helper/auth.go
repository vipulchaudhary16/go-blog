package helper

import "golang.org/x/crypto/bcrypt"

func HashPassword(password string) string {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)

	if err != nil {
		panic("Error in hashing password")
	}

	return string(hashedPassword)
}
