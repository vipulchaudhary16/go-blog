package database

import (
	"log"
	"os"
	"time"

	"github.com/vipulchaudhary16/go-blog/model"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DBConn *gorm.DB

func ConnectDB() {
	user := os.Getenv("db_user")
	password := os.Getenv("db_password")
	databaseName := os.Getenv("db_name")

	dsn := user + ":" + password + "@tcp(127.0.0.1:3306)/" + databaseName + "?charset=utf8mb4&parseTime=True&loc=Local"

	newLogger := logger.New(
		log.New(os.Stdout, "\r\n", log.LstdFlags),
		logger.Config{
			SlowThreshold:             time.Second,
			LogLevel:                  logger.Info,
			IgnoreRecordNotFoundError: true,
			Colorful:                  true,
		},
	)

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{
		Logger: newLogger,
	})

	if err != nil {
		panic("DB connection failed")
	}

	log.Println("DB connected!!")

	err = db.AutoMigrate(
		new(model.Blog),
		new(model.User),
		new(model.EmailActivity),
		new(model.Subscription),
	)
	if err != nil {
		log.Fatalf("AutoMigrate failed: %v", err)
	}

	DBConn = db
}
