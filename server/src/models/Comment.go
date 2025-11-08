package models

import "time"


type Comment struct {
	ID			uint		`gorm:"primaryKey"`
	UserId		uint	
	PostId		uint	
	User		User	
	Content 	string		`json:"content"`
	CreatedAt	time.Time	`json:"created_at"`
}


