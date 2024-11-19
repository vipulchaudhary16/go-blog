package controller

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/vipulchaudhary16/go-blog/database"
	"github.com/vipulchaudhary16/go-blog/model"
)

func FetchBlog(c *fiber.Ctx) error {
	response := fiber.Map{
		"StatusText": "ok",
		"message":    "Blog List",
	}

	db := database.DBConn
	id := c.Params("id")
	log.Print(id)

	if id != "" {
		var record model.Blog
		db.Find(&record, id)
		response["data"] = record
		c.Status(200)
		return c.JSON(response)
	}

	var records []model.Blog

	if err := db.Find(&records).Error; err != nil {
		response["StatusText"] = "error"
		response["message"] = "Failed to fetch blogs"
		c.Status(500)
		return c.JSON(response)
	}

	response["data"] = records

	c.Status(200)
	return c.JSON(response)
}

func BlogCreate(c *fiber.Ctx) error {
	response := fiber.Map{}

	record := new(model.Blog)

	if err := c.BodyParser(&record); err != nil {
		c.Status(400)
		response["message"] = "Invalid payload"
		return c.JSON(response)
	}

	result := database.DBConn.Create(record)

	if result.Error != nil {
		response["message"] = "Failed to create blog"
		c.Status(500)
		return c.JSON(response)
	}

	c.Status(201)
	response["message"] = "Blog created"
	response["data"] = record

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
