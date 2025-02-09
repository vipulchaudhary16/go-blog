package model

type Blog struct {
	ID     uint     `json:"id" gorm:"primaryKey"`
	Title  string   `json:"title" gorm:"not null;column:title;size:255"`
	Post   string   `json:"post" gorm:"not null;column:post"`
	UserID uint     `json:"user_id" gorm:"not null;column:user_id"`
	User   User     `json:"user" gorm:"foreignKey:UserID"`
	Tags   []string `json:"tags" gorm:"type:json"`
}
