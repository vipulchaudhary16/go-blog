package auth

import (
	"github.com/gofiber/fiber/v2"
	"github.com/vipulchaudhary16/go-blog/database"
	"github.com/vipulchaudhary16/go-blog/model"
	"golang.org/x/crypto/bcrypt"
)

type FormData struct {
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Email     string `json:"email"`
	Password  string `json:"password"`
}

func Register(c *fiber.Ctx) error {
	var formData FormData
	res := fiber.Map{}

	if err := c.BodyParser(&formData); err != nil {
		res["message"] = "Invalid payload"
		return c.Status(400).JSON(res)
	}

	if formData.FirstName == "" || formData.Email == "" || formData.Password == "" {
		res["message"] = "All fields are required"
		return c.Status(400).JSON(res)
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(formData.Password), bcrypt.DefaultCost)
	if err != nil {
		res["message"] = "Failed to secure password"
		return c.Status(500).JSON(res)
	}

	var user model.User
	user.Email = formData.Email
	user.FirstName = formData.FirstName
	user.LastName = formData.LastName
	user.Password = string(hashedPassword)

	result := database.DBConn.Create(&user)
	if result.Error != nil {
		res["message"] = "Failed to create user"
		return c.Status(400).JSON(res)
	}

	res["message"] = "User created successfully"
	return c.Status(201).JSON(res)
}
