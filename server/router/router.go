package router

import (
	"github.com/gofiber/fiber/v2"
	"github.com/vipulchaudhary16/go-blog/controller"
	"github.com/vipulchaudhary16/go-blog/controller/auth"
	"github.com/vipulchaudhary16/go-blog/middleware"
)

func SetUpRoutes(app *fiber.App) {
	app.Get("/blog/:id?", controller.FetchBlog)

	app.Post("/auth/register", auth.Register)
	app.Post("/auth/login", auth.LogIn)
	app.Get("/auth/refresh-token", auth.RefreshToken)

	privateRoute := app.Group("/private")
	privateRoute.Use(middleware.AuthenticateToken)
	privateRoute.Get("/user-profile", controller.GetProfile)
	privateRoute.Post("/blog", controller.BlogCreate)
	privateRoute.Put("/blog/:id", controller.BlogUpdate)
	privateRoute.Delete("/blog/:id", controller.BlogDelete)

}
