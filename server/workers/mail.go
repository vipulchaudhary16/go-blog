package workers

import (
	"fmt"
	"net/smtp"
	"os"

	"github.com/vipulchaudhary16/go-blog/database"
	"github.com/vipulchaudhary16/go-blog/model"
)

type EmailResult struct {
	Success bool
	Remarks string
}

func SendEmailAsync(to_email []string, msg string, ch chan<- EmailResult) {
	auth := smtp.PlainAuth("", os.Getenv("email"), os.Getenv("email_password"), "smtp.gmail.com")
	err := smtp.SendMail("smtp.gmail.com:587", auth, os.Getenv("email"), to_email, []byte(msg))
	if err != nil {
		ch <- EmailResult{
			Success: false,
			Remarks: err.Error(),
		}
		return
	}
	ch <- EmailResult{
		Success: true,
		Remarks: "Email sent successfully",
	}
}

func SendEmail(to_emails []string, subject string, msg string) {
	ch := make(chan EmailResult)

	go SendEmailAsync(
		to_emails,
		msg,
		ch,
	)

	go func() {
		result := <-ch
		email_activity := new(model.EmailActivity)
		email_activity.Body = msg
		email_activity.Subject = subject
		email_activity.Remarks = result.Remarks
		email_activity.Emails = to_emails
		if result.Success {
			email_activity.Success = 1
		} else {
			email_activity.Success = 0
			fmt.Println("Error:", result.Remarks)
		}

		if err := database.DBConn.Create(email_activity); err != nil {
			print(err)
			println("Email Activity created")
		}
	}()
}
