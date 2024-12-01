package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/joho/godotenv"
	"github.com/vipulchaudhary16/go-blog/database"
	"github.com/vipulchaudhary16/go-blog/router"
)

func init() {
	if err := godotenv.Load(".env"); err != nil {
		log.Fatal("Please provide env file")
	}
	database.ConnectDB()
}

func main() {
	app := fiber.New()
	app.Use(logger.New())

	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowMethods: "GET,POST,PUT,DELETE,OPTIONS",
	}))

	db, err := database.DBConn.DB()
	if err != nil {
		panic("Error in db connection")
	}
	defer db.Close()

	app.Get("/", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{"Message": "Server working fine"})
	})

	router.SetUpRoutes(app)

	log.Println("Server is running on http://localhost:8000")
	app.Listen(":8000")
}
