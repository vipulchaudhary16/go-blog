package controller

import (
	"github.com/gofiber/fiber/v2"
	"github.com/vipulchaudhary16/go-blog/database"
	"github.com/vipulchaudhary16/go-blog/helper"
	"github.com/vipulchaudhary16/go-blog/model"
	"github.com/vipulchaudhary16/go-blog/workers"
)

func FetchBlog(c *fiber.Ctx) error {
	response := fiber.Map{
		"StatusText": "ok",
		"message":    "Blog List",
	}

	db := database.DBConn
	id := c.Params("id")
	userID := c.Query("user_id")

	if id != "" {
		var record model.Blog
		if err := db.Preload("User").First(&record, id).Error; err != nil { // Preload User
			response["StatusText"] = "error"
			response["message"] = "Blog not found"
			c.Status(404)
			return c.JSON(response)
		}
		response["data"] = record
		c.Status(200)
		return c.JSON(response)
	}

	var records []model.Blog
	query := db.Preload("User") // Ensure all blogs include User data

	if userID != "" {
		query = query.Where("user_id = ?", userID)
	}

	if err := query.Find(&records).Error; err != nil {
		response["StatusText"] = "error"
		response["message"] = "Failed to fetch blogs"
		c.Status(500)
		return c.JSON(response)
	}

	response["data"] = records
	c.Status(200)
	return c.JSON(response)
}

func BlogUpsert(c *fiber.Ctx) error {
	response := fiber.Map{}

	record := new(model.Blog)

	if err := c.BodyParser(&record); err != nil {
		c.Status(400)
		response["message"] = "Invalid payload"
		return c.JSON(response)
	}

	payload := c.Locals("payload")
	userId := payload.(*helper.TokenPayload).UserId
	record.UserID = userId

	update_blog := false

	print(record)

	db := database.DBConn

	// If ID is provided, check if the blog exists
	if record.ID != 0 {
		update_blog = true
		existingBlog := model.Blog{}
		if err := db.First(&existingBlog, record.ID).Error; err == nil {
			// Blog exists, update it
			if err := db.Model(&existingBlog).Updates(record).Error; err != nil {
				response["message"] = "Failed to update blog"
				c.Status(500)
				return c.JSON(response)
			}
			response["message"] = "Blog updated"
			response["data"] = existingBlog
			c.Status(200)
			return c.JSON(response)
		}
	}

	// Blog does not exist, create a new one
	if err := db.Create(record).Error; err != nil {
		response["message"] = "Failed to create blog"
		c.Status(500)
		return c.JSON(response)
	}

	if !update_blog {
		go workers.SendEmailOfNewBlogToSubscribers(record.ID)
	}

	response["message"] = "Blog created"
	response["data"] = record
	c.Status(201)
	return c.JSON(response)
}

func BlogUpdate(c *fiber.Ctx) error {
	// Response map to store the result of the operation
	response := fiber.Map{}

	// Retrieve the 'id' parameter from the route
	id := c.Params("id")

	// Variable to hold the blog record
	var record model.Blog

	// Fetch the blog record from the database using the provided 'id'
	// The result is stored in the 'record' variable
	database.DBConn.First(&record, id)

	// Check if a blog with the given ID exists
	// If not, return a 404 response with a relevant message
	if record.ID == 0 {
		response["message"] = "No blog found for id " + id
		c.Status(404)
		return c.JSON(response)
	}

	// Parse the request body and update the 'record' fields
	// 'c.BodyParser(&record)' maps the JSON fields in the request body to
	// the corresponding struct fields in the 'record' variable
	if err := c.BodyParser(&record); err != nil {
		c.Status(400)
		response["message"] = "Invalid payload"
		return c.JSON(response)
	}

	// Save the updated 'record' back to the database
	// If there is any error during this operation, return a 500 response
	result := database.DBConn.Save(record)
	if result.Error != nil {
		response["message"] = "Blog update failed"
		c.Status(500)
		return c.JSON(response)
	}

	// If everything is successful, return a 200 response with the updated blog
	c.Status(200)
	response["message"] = "Blog updated"
	response["data"] = record
	return c.JSON(response)
}

func BlogDelete(c *fiber.Ctx) error {

	response := fiber.Map{}

	id := c.Params("id")
	var record model.Blog

	database.DBConn.Find(&record, id)

	if record.ID == 0 {
		response["message"] = "No blog found for id " + id
		c.Status(404)
		return c.JSON(response)
	}

	result := database.DBConn.Delete(record)

	if result.Error != nil {
		response["message"] = "Blog deletion failed"
		c.Status(500)
		return c.JSON(response)
	}

	c.Status(200)
	response["message"] = "Blog deleted"
	return c.JSON(response)
}
