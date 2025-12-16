package controller

import (
	"github.com/gofiber/fiber/v2"
	"github.com/vipulchaudhary16/go-blog/database"
	"github.com/vipulchaudhary16/go-blog/helper"
	"github.com/vipulchaudhary16/go-blog/model"
)

type SubscribeRequest struct {
	ToId uint `json:"to_id"`
}

func HandleSubscribe(c *fiber.Ctx) error {
	response := fiber.Map{}

	db := database.DBConn

	payload := c.Locals("payload")
	currentUserId := payload.(*helper.TokenPayload).UserId

	var body SubscribeRequest
	if err := c.BodyParser(&body); err != nil {
		response["message"] = "Invalid request"
		c.Status(400)
		return c.JSON(response)
	}

	subscription := new(model.Subscription)
	subscription.FromId = currentUserId
	subscription.ToId = body.ToId
	subscription.SetTimestampsToNow()

	if err := db.Create(subscription).Error; err != nil {
		response["message"] = err.Error()
		c.Status(403)
		return c.JSON(response)
	}

	response["message"] = "Subscribed!"
	response["data"] = subscription
	c.Status(200)
	return c.JSON(response)
}

func HandleUnSubscribe(c *fiber.Ctx) error {
	response := fiber.Map{}

	db := database.DBConn

	payload := c.Locals("payload")
	currentUserId := payload.(*helper.TokenPayload).UserId

	var body SubscribeRequest
	if err := c.BodyParser(&body); err != nil {
		response["message"] = "Invalid request"
		c.Status(400)
		return c.JSON(response)
	}

	var subscription model.Subscription
	if err := db.Where("from_id = ? AND to_id = ?", currentUserId, body.ToId).First(&subscription).Error; err != nil {
		response["message"] = "Subscription not found"
		c.Status(404)
		return c.JSON(response)
	}

	if err := db.Delete(&subscription).Error; err != nil {
		response["message"] = "Failed to unsubscribe"
		c.Status(500)
		return c.JSON(response)
	}

	response["message"] = "Un Subscribed!"
	response["data"] = subscription
	c.Status(200)
	return c.JSON(response)
}

func MySubscriptions(c *fiber.Ctx) error {
	response := fiber.Map{}

	db := database.DBConn.Preload("ToUser").Preload("FromUser")

	payload := c.Locals("payload")
	currentUserId := payload.(*helper.TokenPayload).UserId

	var subscriptions []model.Subscription

	if err := db.Where("from_id = ?", currentUserId).Find(&subscriptions).Error; err != nil {
		response["message"] = "Failed to fetch subscriptions"
		c.Status(500)
		return c.JSON(response)
	}

	response["message"] = "Subscriptions fetched successfully"
	response["data"] = subscriptions
	c.Status(200)
	return c.JSON(response)
}
