package model

import (
	"database/sql/driver"
	"encoding/json"
	"fmt"
)

type Blog struct {
	ID     uint            `json:"id" gorm:"primaryKey"`
	Title  string          `json:"title" gorm:"not null;column:title;size:255"`
	Post   string          `json:"post" gorm:"not null;column:post"`
	UserID uint            `json:"user_id" gorm:"not null;column:user_id"`
	User   User            `json:"user" gorm:"foreignKey:UserID"`
	Tags   JSONStringArray `json:"tags" gorm:"type:json"`
}

type JSONStringArray []string

func (j JSONStringArray) Value() (driver.Value, error) {
	return json.Marshal(j)
}

func (j *JSONStringArray) Scan(value interface{}) error {
	bytes, ok := value.([]byte)
	if !ok {
		return fmt.Errorf("Failed to unmarshal JSONStringArray value: %v", value)
	}
	return json.Unmarshal(bytes, j)
}
