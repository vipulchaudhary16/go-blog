package middleware

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/vipulchaudhary16/go-blog/helper"
)

func AuthenticateToken(c *fiber.Ctx) error {
	token := c.Get("token")
	log.Print("token", token)

	if token == "" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "Unauthorized",
		})
	}

	payload, err := helper.ValidateToken(token, helper.TOKEN_TYPE_ACCESS)

	log.Print("payload:", payload)

	if err != "" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "Unauthorized",
			"error":   err,
		})
	}

	c.Locals("payload", payload)

	return c.Next()
}
