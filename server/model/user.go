package model

type User struct {
	ID        uint   `json:"id" gorm:"primaryKey"`
	Email     string `json:"email" gorm:"column:email;unique"`
	Password  string `json:"-" gorm:"column:password"`
	FirstName string `json:"first_name" gorm:"column:first_name;not null"`
	LastName  string `json:"last_name" gorm:"column:last_name"`
}
