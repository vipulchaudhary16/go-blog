package mail

import (
	"github.com/gofiber/fiber/v2"
)

func SendEmail(c *fiber.Ctx) error {
	res := fiber.Map{
		"message": "Request received. Sending email in background.",
	}
	return c.Status(200).JSON(res)
}
