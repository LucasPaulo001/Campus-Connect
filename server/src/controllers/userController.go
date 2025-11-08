package controllers

import (
	"net/http"

	"github.com/LucasPaulo001/Campus-Connect/src/config"
	"github.com/LucasPaulo001/Campus-Connect/src/models"
	"github.com/gin-gonic/gin"
)

// Criação de Postagens
func CreatePost(c *gin.Context){
	// Pegar id do usuário
	userId := c.GetUint("userId")

	// Etrutura temporária de postagens do body
	var body struct{
		Title 		string 	 `json:"title"`
		Content		string	 `json:"content"`
		Tags 		[]string `json:"tags"`
	}

	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Salvando Tags da postagem
	var tags []models.Tags
	for _, t := range body.Tags {
		var tag models.Tags
		if err := config.DB.Where("name = ?", t).First(&tag).Error; err != nil {
			tag = models.Tags{Name: t}
			config.DB.Create(&tag)
		}

		tags = append(tags, tag)
	}

	// Salvar Postagem
	post := models.Post{
		UserId: 	userId,
		Title: 		body.Title,
		Content: 	body.Content,
		Tags: 		tags,		
	}

	if err := config.DB.Create(&post).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao criar postagem.", "details": err.Error()})
	}

	c.JSON(http.StatusOK, post)

}

// Listagem de postagens
func GetPosts(c *gin.Context){
	userId := c.GetUint("userId")

	var posts []models.Post

	if err := config.DB.Preload("Tags").Preload("User").
		Where("user_id = ?", userId).
		Order("created_at desc").
		Find(&posts).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao buscar posts"})
			return
		}
		
	c.JSON(http.StatusOK, posts)
}

