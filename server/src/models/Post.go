package models

import "time"

type Tags struct{
	ID		uint	`gorm:primaryKey`
	Name	string	`gorm:unique`
}

type Post struct{
	ID			uint		`gorm:"primaryKey"`
	UserId		uint		`json:"user_id"`
	Title		string		`json:"title"`
	User		User
	Content		string		`json:"content"`
	Tags		[]Tags		`gorm:"many2many:post_tags"`
	CreatedAt	time.Time
}