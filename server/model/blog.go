package model

import (
	"encoding/json"
)

// Blog model with JSON support for tags
type Blog struct {
	ID     uint            `json:"id" gorm:"primaryKey"`
	Title  string          `json:"title" gorm:"not null;column:title;size:255"`
	Post   string          `json:"post" gorm:"not null;column:post"`
	UserID uint            `json:"user_id" gorm:"not null;column:user_id"`
	User   User            `json:"user" gorm:"foreignKey:UserID"`
	Tags   JSONStringArray `json:"tags" gorm:"type:json"`
}

// JSONStringArray is a custom type to store JSON string arrays in MySQL
type JSONStringArray []string

// Marshal JSONStringArray into JSON
func (j JSONStringArray) Value() (interface{}, error) {
	return json.Marshal(j)
}

// Unmarshal JSON string back into JSONStringArray
func (j *JSONStringArray) Scan(value interface{}) error {
	return json.Unmarshal(value.([]byte), j)
}
