package router

import (
	"github.com/gofiber/fiber/v2"
	"github.com/vipulchaudhary16/go-blog/controller"
	"github.com/vipulchaudhary16/go-blog/controller/auth"
)

func SetUpRoutes(app *fiber.App) {
	app.Get("/blog/:id?", controller.FetchBlog)
	app.Post("/blog", controller.BlogCreate)
	app.Put("/blog/:id", controller.BlogUpdate)
	app.Delete("/blog/:id", controller.BlogDelete)

	app.Post("/auth/register", auth.Register)
}
