package main

import (
	"context"
	"database/sql"
	"fmt"

	"github.com/go-gorp/gorp"
	_ "github.com/mattn/go-sqlite3"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

type Instance struct {
	Id             int64  `json:"id" db:"id"`
	Name           string `json:"name" db:"name"`
	BaseUrl        string `json:"baseUrl" db:"baseUrl"`
	Authentication `json:"authentication"`
}
type Authentication struct {
	Token  string `json:"token" db:"token"`
	Type   string `json:"type" db:"type"`
	Header string `json:"header,omitempty" db:"header"`
}

type InstanceApp struct {
	dbmap *gorp.DbMap
}

func NewInstanceApp() *InstanceApp {
	return &InstanceApp{}
}

func (app *InstanceApp) Init() error {
	db, err := sql.Open("sqlite3", "instance.db")
	if err != nil {
		return err
	}
	err = db.Ping()
	if err != nil {
		return err
	}
	dbmap := &gorp.DbMap{Db: db, Dialect: gorp.SqliteDialect{}}
	table := dbmap.AddTableWithName(Instance{}, "instances")
	table.SetKeys(true, "id")
	_ = dbmap.CreateTablesIfNotExists()
	app.dbmap = dbmap
	return nil
}

func (app *InstanceApp) Get() ([]Instance, error) {
	var instances []Instance
	_, err := app.dbmap.Select(&instances, "SELECT * FROM instances")
	if err != nil {
		return nil, err
	}
	return instances, nil
}

func (app *InstanceApp) Add(instance Instance) error {
	return app.dbmap.Insert(&instance)
}

func (app *InstanceApp) Set(instances []Instance) {
	_ = app.Clear()
	for _, instance := range instances {
		app.Add(instance)
	}

	return
}

func (app *InstanceApp) Clear() error {
	_, err := app.dbmap.Exec("DELETE FROM instances")
	return err
}

func (app *InstanceApp) Delete(instance Instance) error {
	_, err := app.dbmap.Exec("DELETE FROM instances WHERE name = ? AND baseUrl = ?", instance.Name, instance.BaseUrl)
	return err
}
