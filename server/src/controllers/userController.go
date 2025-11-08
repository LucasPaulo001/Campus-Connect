package controllers

import (
	"net/http"

	"github.com/LucasPaulo001/Campus-Connect/src/config"
	"github.com/LucasPaulo001/Campus-Connect/src/models"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
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

// Listagem de postagens do usuário
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

// Editar dados do usuário
func EditUserData(c *gin.Context){
	// Recupera id de usuário logado
	userId := c.GetUint("userId")

	// Dados de edição
	var body struct {
		Name 		string		`json:"name"`
		NameUser	string		`json:"name_user"`	
	}

	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Verificando nome de usuário
	var existingUserName models.User
	err := config.DB.Where("name_user = ?", body.NameUser).First(&existingUserName).Error

	if err == nil && existingUserName.ID == userId {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Username já em uso"})
		return
	}

	if err != nil && err != gorm.ErrRecordNotFound {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB.Model(&models.User{}).
		Where("id = ?", userId).
		Updates(models.User{
			Name: body.Name,
			NameUser: body.NameUser,
		}).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao editar dados."})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "Dados atualizados com sucesso."})
	
}

