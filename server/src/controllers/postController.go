package controllers

import (
	"net/http"
	"strconv"

	"github.com/LucasPaulo001/Campus-Connect/src/config"
	"github.com/LucasPaulo001/Campus-Connect/src/models"
	"github.com/gin-gonic/gin"
)

// Criar um comentário em um post
func CreateComment(c *gin.Context){
	userId := c.GetUint("userId")
	postId := c.Param("id")

	postIdUint, err := strconv.Atoi(postId)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Erro ao converter ID."})
	}

	var body struct {
		Content	 string	 `json:"content"`
	}

	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Conteúdo inválido."})
		return
	}

	var post models.Post
	if err := config.DB.First(&post, postIdUint).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Postagem não encontrada."})
		return
	}

	comment := models.Comment{
		UserId: userId,
		PostId: post.ID,
		Content: body.Content,
	}

	if err := config.DB.Create(&comment).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao criar comentário."})
		return
	}

	if err := config.DB.Preload("User").First(&comment, comment.ID).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao buscar comentário."})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Comentário criado com sucesso.",
		"comment": comment,
	})

}