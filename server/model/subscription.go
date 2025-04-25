package model

import "time"

type Subscription struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	FromId    uint      `json:"from_id" gorm:"not null;column:from_id;uniqueIndex:idx_from_to"`
	ToId      uint      `json:"to_id" gorm:"not null;column:to_id;uniqueIndex:idx_from_to"`
	FromUser  User      `json:"from_user" gorm:"foreignKey:from_id"`
	ToUser    User      `json:"to_user" gorm:"foreignKey:to_id"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

func (s *Subscription) SetTimestampsToNow() {
	now := time.Now()
	s.CreatedAt = now
	s.UpdatedAt = now
}
