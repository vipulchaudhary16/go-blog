package workers

import (
	"os"
	"strconv"

	"github.com/vipulchaudhary16/go-blog/database"
	"github.com/vipulchaudhary16/go-blog/model"
)

func SendEmailOfNewBlogToSubscribers(blog_id uint) {
	blog := model.Blog{}
	db := database.DBConn
	if err := db.Preload("User").Preload("User.Subscribers").Preload("User.Subscribers.FromUser").First(&blog, blog_id).Error; err != nil {
		//log on server
	}

	author := blog.User
	subscribers := author.Subscribers
	blog_link := os.Getenv("BLOGO_APP_URL") + "/blog/" + strconv.Itoa(int(blog.ID))

	for _, subscriber := range subscribers {
		recipient_email := subscriber.FromUser.Email
		subject := "New blog from " + author.FirstName + " " + author.LastName
		msg := "Hi " + subscriber.ToUser.FirstName + ",\n\n" +
			"New blog is published by " + author.FirstName + " " + author.LastName + "\n\n" +
			"Title: " + blog.Title + "\n\n" +
			"Go and check it out at: " + blog_link + "\n\n" +
			"Thanks,\n" +
			"Blogo Team\n"
		SendEmail([]string{recipient_email}, subject, msg)
	}
}
