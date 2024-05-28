package main

import (
	"context"
	"database/sql"
	"fmt"
	"log"

	"github.com/go-gorp/gorp"
	_ "github.com/mattn/go-sqlite3"
)

type App struct{}

func NewApp() *App {
	return &App{}
}

func (a *App) startup(ctx context.Context) {
	select {
	case <-ctx.Done():
		log.Println("Startup canceled:", ctx.Err())

		return
	default:
		log.Println("Startup complete")
	}
}

func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

type Instance struct {
	ID             int64  `db:"id"               json:"id"`
	Name           string `db:"name"             json:"name"`
	BaseURL        string `db:"baseUrl"          json:"baseUrl"`
	Authentication `json:"authentication"`
}
type Authentication struct {
	Token  string `db:"token"  json:"token"`
	Type   string `db:"type"   json:"type"`
	Header string `db:"header" json:"header,omitempty"`
}

type InstanceApp struct {
	dbmap *gorp.DbMap
}

func NewInstanceApp() (*InstanceApp, error) {
	dataBase, err := sql.Open("sqlite3", "instance.db")
	if err != nil {
		return nil, fmt.Errorf("failed to open database: %w", err)
	}

	err = dataBase.Ping()
	if err != nil {
		return nil, fmt.Errorf("failed to ping database: %w", err)
	}

	dbmap := &gorp.DbMap{Db: dataBase, Dialect: gorp.SqliteDialect{}, TypeConverter: nil, ExpandSliceArgs: false}
	table := dbmap.AddTableWithName(Instance{
		ID:             0,
		Name:           "",
		BaseURL:        "",
		Authentication: Authentication{Token: "", Type: "", Header: ""},
	},
		"instances")
	table.SetKeys(true, "id")

	_ = dbmap.CreateTablesIfNotExists()

	return &InstanceApp{dbmap: dbmap}, nil
}

func (app *InstanceApp) Get() ([]Instance, error) {
	var instances []Instance

	_, err := app.dbmap.Select(&instances, "SELECT * FROM instances")
	if err != nil {
		return nil, fmt.Errorf("failed to select database: %w", err)
	}

	return instances, nil
}

func (app *InstanceApp) Add(instance Instance) error {
	err := app.dbmap.Insert(&instance)

	return fmt.Errorf("failed to add database: %w", err)
}

func (app *InstanceApp) Set(instances []Instance) {
	_ = app.Clear()
	for _, instance := range instances {
		_ = app.Add(instance)
	}
}

func (app *InstanceApp) Clear() error {
	_, err := app.dbmap.Exec("DELETE FROM instances")

	return fmt.Errorf("failed to clear database: %w", err)
}

func (app *InstanceApp) Delete(instance Instance) error {
	_, err := app.dbmap.Exec("DELETE FROM instances WHERE name = ? AND baseUrl = ?", instance.Name, instance.BaseURL)

	return fmt.Errorf("failed to delete database: %w", err)
}
