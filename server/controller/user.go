package controller

import (
	"github.com/gofiber/fiber/v2"
	"github.com/vipulchaudhary16/go-blog/database"
	"github.com/vipulchaudhary16/go-blog/helper"
	"github.com/vipulchaudhary16/go-blog/model"
)

func GetProfile(c *fiber.Ctx) error {
	response := fiber.Map{}

	payload := c.Locals("payload")

	var user model.User
	userId := payload.(*helper.TokenPayload).UserId

	database.DBConn.First(&user, "id=?", userId)

	response["user"] = user
	c.Status(200)

	return c.JSON(response)
}
