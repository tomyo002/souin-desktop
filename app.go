package main

import (
	"database/sql"
	"encoding/json"
	"fmt"

	"github.com/go-gorp/gorp"
	_ "github.com/mattn/go-sqlite3"
)

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

type Chart struct {
	ID     int64    `db:"id"     json:"id"`
	Title  string   `db:"title"  json:"title"`
	Labels []string `db:"labels" json:"labels"`
	Max    int64    `db:"max"    json:"max"`
}

type SqliteApp struct {
	dbmap *gorp.DbMap
}

type DatabaseOpener interface {
	Open(driverName, dataSourceName string) (*sql.DB, error)
}

type SQLDatabaseOpener struct{}

func (o *SQLDatabaseOpener) Open(driverName, dataSourceName string) (*sql.DB, error) {
	db, err := sql.Open(driverName, dataSourceName)
	if err != nil {
		return nil, fmt.Errorf("failed to open database with driver %s: %w", driverName, err)
	}

	return db, nil
}

func NewSqliteApp(opener DatabaseOpener) (*SqliteApp, error) {
	dataBase, err := opener.Open("sqlite3", "sqlite.db")
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

	otherTable := dbmap.AddTableWithName(Chart{
		ID:     0,
		Title:  "",
		Labels: []string{},
		Max:    0,
	}, "charts")
	otherTable.SetKeys(true, "id")

	_ = dbmap.CreateTablesIfNotExists()

	return &SqliteApp{dbmap: dbmap}, nil
}

func (app *SqliteApp) GetInstance() ([]Instance, error) {
	var instances []Instance

	_, err := app.dbmap.Select(&instances, "SELECT * FROM instances")
	if err != nil {
		return nil, fmt.Errorf("failed to select database: %w", err)
	}

	return instances, nil
}

func (app *SqliteApp) AddInstance(instance Instance) error {
	err := app.dbmap.Insert(&instance)
	if err != nil {
		return fmt.Errorf("failed to add database: %w", err)
	}

	return nil
}

func (app *SqliteApp) SetInstance(instances []Instance) {
	_ = app.ClearInstance()
	for _, instance := range instances {
		_ = app.AddInstance(instance)
	}
}

func (app *SqliteApp) ClearInstance() error {
	_, err := app.dbmap.Exec("DELETE FROM instances")
	if err != nil {
		return fmt.Errorf("failed to clear database: %w", err)
	}

	return nil
}

func (app *SqliteApp) DeleteInstance(instance Instance) error {
	_, err := app.dbmap.Exec("DELETE FROM instances WHERE name = ? AND baseUrl = ?", instance.Name, instance.BaseURL)
	if err != nil {
		return fmt.Errorf("failed to delete database: %w", err)
	}

	return nil
}

func (app *SqliteApp) GetChart() ([]Chart, error) {
	var rows []*struct {
		ID     int64  `db:"id"`
		Title  string `db:"title"`
		Labels string `db:"labels"`
		Max    int64  `db:"max"`
	}

	_, err := app.dbmap.Select(&rows, "SELECT * FROM charts")
	if err != nil {
		return nil, fmt.Errorf("failed to select database: %w", err)
	}

	charts := make([]Chart, 0, len(rows))

	for _, row := range rows {
		var labels []string

		err := json.Unmarshal([]byte(row.Labels), &labels)
		if err != nil {
			return nil, fmt.Errorf("failed to unmarshal labels: %w", err)
		}

		charts = append(charts, Chart{
			ID:     row.ID,
			Title:  row.Title,
			Labels: labels,
			Max:    row.Max,
		})
	}

	return charts, nil
}

func (app *SqliteApp) AddChart(chart Chart) error {
	labels, err := json.Marshal(chart.Labels)
	if err != nil {
		return fmt.Errorf("failed to marshal labels: %w", err)
	}

	_, err = app.dbmap.Exec("INSERT INTO charts (title, labels, max) VALUES (?, ?, ?)",
		chart.Title, string(labels), chart.Max)
	if err != nil {
		return fmt.Errorf("failed to add chart: %w", err)
	}

	return nil
}

func (app *SqliteApp) SetChart(charts []Chart) {
	_ = app.ClearChart()
	for _, chart := range charts {
		_ = app.AddChart(chart)
	}
}

func (app *SqliteApp) ClearChart() error {
	_, err := app.dbmap.Exec("DELETE FROM charts")
	if err != nil {
		return fmt.Errorf("failed to clear database: %w", err)
	}

	return nil
}

func (app *SqliteApp) DeleteChart(chart Chart) error {
	_, err := app.dbmap.Exec("DELETE FROM charts WHERE title = ?", chart.Title)
	if err != nil {
		return fmt.Errorf("failed to delete database: %w", err)
	}

	return nil
}
