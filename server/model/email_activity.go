package model

type EmailActivity struct {
	ID      uint            `json:"id" gorm:"primaryKey"`
	Emails  JSONStringArray `json:"email" gorm:"column:email;type:json"`
	Subject string          `json:"subject" gorm:"column:subject"`
	Body    string          `json:"body" gorm:"column:body"`
	Success int             `json:"success" gorm:"column:success"`
	Remarks string          `json:"remarks" gorm:"column:remarks"`
}
