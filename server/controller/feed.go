package controller

import (
	"github.com/gofiber/fiber/v2"
	"github.com/vipulchaudhary16/go-blog/database"
	"github.com/vipulchaudhary16/go-blog/model"
)

func GetFeed(c *fiber.Ctx) error {
	response := fiber.Map{}

	db := database.DBConn

	var records []model.Blog
	if err := db.Preload("User").Find(&records).Error; err != nil {
		c.Status(404)
		return c.JSON(response)
	}

	response["data"] = records
	return c.Status(200).JSON(response)
}
