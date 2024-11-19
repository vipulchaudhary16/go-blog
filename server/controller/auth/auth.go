package auth

import (
	"github.com/gofiber/fiber/v2"
	"github.com/vipulchaudhary16/go-blog/database"
	"github.com/vipulchaudhary16/go-blog/helper"
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

	var user model.User
	user.Email = formData.Email
	user.FirstName = formData.FirstName
	user.LastName = formData.LastName
	user.Password = helper.HashPassword(formData.Password)

	result := database.DBConn.Create(&user)
	if result.Error != nil {
		res["message"] = "Failed to create user"
		return c.Status(400).JSON(res)
	}

	res["message"] = "User created successfully"
	return c.Status(201).JSON(res)
}

func LogIn(c *fiber.Ctx) error {
	var formData FormData
	res := fiber.Map{}

	if err := c.BodyParser(&formData); err != nil {
		res["message"] = "Invalid payload"
		c.Status(400)
		return c.JSON(res)
	}

	var user model.User
	database.DBConn.First(&user, "email=?", formData.Email)

	if user.ID == 0 {
		c.Status(404)
		res["message"] = "User not found"
		return c.JSON(res)
	}

	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(formData.Password))

	if err != nil {
		c.Status(401)
		res["message"] = "Invalid password"
		return c.JSON(res)
	}

	token, err := helper.GenerateToken(user)

	if err != nil {
		c.Status(500)
		res["message"] = "Something went wrong!"
		return c.JSON(res)
	}

	c.Status(200)
	res["token"] = token
	res["message"] = "User authenticated"
	return c.JSON(res)
}
