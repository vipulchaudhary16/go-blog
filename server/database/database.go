package database

import (
	"log"
	"os"

	"github.com/vipulchaudhary16/go-blog/model"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DBConn *gorm.DB

func ConnectDB() {
	user := os.Getenv("db_user")
	password := os.Getenv("db_password")
	database_name := os.Getenv("db_name")
	dsn := user + ":" + password + "@tcp(127.0.0.1:3306)/" + database_name + "?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Error),
	})

	if err != nil {
		panic("DB connection failed")
	}

	log.Println("DB connected!!")

	db.AutoMigrate(new(model.Blog))
	db.AutoMigrate(new(model.User))

	DBConn = db
}
