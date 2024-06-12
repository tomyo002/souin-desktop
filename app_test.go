package main

import (
	"database/sql"
	"testing"

	"github.com/DATA-DOG/go-sqlmock"
	"github.com/go-gorp/gorp"
	"github.com/stretchr/testify/require"
)

type MockDatabaseOpener struct {
	db *sql.DB
}

func (o *MockDatabaseOpener) Open(_, _ string) (*sql.DB, error) {
	return o.db, nil
}

func TestNewInstanceApp(t *testing.T) {
	t.Parallel()

	dataBase, mock, err := sqlmock.New()
	require.NoError(t, err)
	defer dataBase.Close()

	mock.ExpectPing()

	mockOpener := &MockDatabaseOpener{
		db: dataBase,
	}

	app, err := NewSqliteApp(mockOpener)
	require.NoError(t, err)
	require.NotNil(t, app)

	err = mock.ExpectationsWereMet()
	require.NoError(t, err)
}

func TestGetInstance(t *testing.T) {
	t.Parallel()

	db, mock, err := sqlmock.New()
	require.NoError(t, err)
	defer db.Close()

	dbmap := &gorp.DbMap{Db: db, Dialect: gorp.SqliteDialect{}, TypeConverter: nil, ExpandSliceArgs: false}
	app := &SqliteApp{dbmap: dbmap}

	rows := sqlmock.NewRows([]string{"ID", "Name", "BaseURL", "Token", "Type", "Header"}).
		AddRow(1, "Instance1", "http://example.com", "", "", "").
		AddRow(2, "Instance2", "http://example2.com", "test", "basicauth", "").
		AddRow(3, "Instance3", "http://example3.com", "test", "api-key", "x-api-key")

	mock.ExpectQuery("SELECT \\* FROM instances").WillReturnRows(rows)

	instances, err := app.GetInstance()
	require.NoError(t, err)
	require.Len(t, instances, 3)

	expected := []Instance{
		{
			ID:      1,
			Name:    "Instance1",
			BaseURL: "http://example.com",
			Authentication: Authentication{
				Token:  "",
				Type:   "",
				Header: "",
			},
		},
		{
			ID:      2,
			Name:    "Instance2",
			BaseURL: "http://example2.com",
			Authentication: Authentication{
				Token:  "test",
				Type:   "basicauth",
				Header: "",
			},
		},
		{
			ID:      3,
			Name:    "Instance3",
			BaseURL: "http://example3.com",
			Authentication: Authentication{
				Token:  "test",
				Type:   "api-key",
				Header: "x-api-key",
			},
		},
	}
	require.Equal(t, expected, instances)

	err = mock.ExpectationsWereMet()
	require.NoError(t, err)
}

func TestAddInstance(t *testing.T) {
	t.Parallel()

	db, mock, err := sqlmock.New()
	require.NoError(t, err)
	defer db.Close()

	dbmap := &gorp.DbMap{Db: db, Dialect: gorp.SqliteDialect{}, TypeConverter: nil, ExpandSliceArgs: false}
	_ = dbmap.AddTableWithName(Instance{
		ID:             0,
		Name:           "",
		BaseURL:        "",
		Authentication: Authentication{Token: "", Type: "", Header: ""},
	}, "instances").SetKeys(true, "ID")

	app := &SqliteApp{dbmap: dbmap}

	instance := Instance{
		ID:      1,
		Name:    "Instance1",
		BaseURL: "http://example.com",
		Authentication: Authentication{
			Token:  "test",
			Type:   "api-key",
			Header: "x-api-key",
		},
	}

	mock.
		ExpectExec(`insert into "instances" 
		\("id","name","baseUrl","token","type","header"\) values 
		\(null,\?,\?,\?,\?,\?\);`).
		WithArgs(
			instance.Name,
			instance.BaseURL,
			instance.Authentication.Token,
			instance.Authentication.Type,
			instance.Authentication.Header).
		WillReturnResult(sqlmock.NewResult(1, 1))

	err = app.AddInstance(instance)
	require.NoError(t, err)

	err = mock.ExpectationsWereMet()
	require.NoError(t, err)
}

func TestSetInstance(t *testing.T) {
	t.Parallel()

	db, mock, err := sqlmock.New()
	require.NoError(t, err)
	defer db.Close()

	dbmap := &gorp.DbMap{Db: db, Dialect: gorp.SqliteDialect{}, TypeConverter: nil, ExpandSliceArgs: false}
	_ = dbmap.AddTableWithName(Instance{
		ID:             0,
		Name:           "",
		BaseURL:        "",
		Authentication: Authentication{Token: "", Type: "", Header: ""},
	}, "instances").SetKeys(true, "ID")

	app := &SqliteApp{dbmap: dbmap}

	instances := []Instance{
		{
			ID:      1,
			Name:    "Instance1",
			BaseURL: "http://example.com",
			Authentication: Authentication{
				Token:  "test",
				Type:   "api-key",
				Header: "x-api-key",
			},
		},
		{
			ID:      2,
			Name:    "Instance2",
			BaseURL: "http://example2.com",
			Authentication: Authentication{
				Token:  "token2",
				Type:   "basicauth",
				Header: "header2",
			},
		},
	}

	for _, instance := range instances {
		mock.ExpectExec(`insert into "instances" 
		\("id","name","baseUrl","token","type","header"\) values 
		\(null,\?,\?,\?,\?,\?\);`).
			WithArgs(
				instance.Name,
				instance.BaseURL,
				instance.Authentication.Token,
				instance.Authentication.Type,
				instance.Authentication.Header).
			WillReturnResult(sqlmock.NewResult(1, 1))
	}

	app.SetInstance(instances)

	err = mock.ExpectationsWereMet()
	require.NoError(t, err)
}

func TestClearInstance(t *testing.T) {
	t.Parallel()

	db, mock, err := sqlmock.New()
	require.NoError(t, err)
	defer db.Close()

	dbmap := &gorp.DbMap{Db: db, Dialect: gorp.SqliteDialect{}, TypeConverter: nil, ExpandSliceArgs: false}
	_ = dbmap.AddTableWithName(Instance{
		ID:             0,
		Name:           "",
		BaseURL:        "",
		Authentication: Authentication{Token: "", Type: "", Header: ""},
	}, "instances").SetKeys(true, "ID")

	app := &SqliteApp{dbmap: dbmap}

	mock.ExpectExec(`DELETE FROM instances`).WillReturnResult(sqlmock.NewResult(0, 0))

	err = app.ClearInstance()
	require.NoError(t, err)

	err = mock.ExpectationsWereMet()
	require.NoError(t, err)
}

func TestDeleteInstance(t *testing.T) {
	t.Parallel()

	db, mock, err := sqlmock.New()
	require.NoError(t, err)
	defer db.Close()

	dbmap := &gorp.DbMap{Db: db, Dialect: gorp.SqliteDialect{}, TypeConverter: nil, ExpandSliceArgs: false}
	_ = dbmap.AddTableWithName(Instance{
		ID:             0,
		Name:           "",
		BaseURL:        "",
		Authentication: Authentication{Token: "", Type: "", Header: ""},
	}, "instances").SetKeys(true, "ID")

	app := &SqliteApp{dbmap: dbmap}

	instance := Instance{
		ID:             1,
		Name:           "Instance1",
		BaseURL:        "http://example.com",
		Authentication: Authentication{Token: "", Type: "", Header: ""},
	}

	mock.ExpectExec(`DELETE FROM instances WHERE name = \? AND baseUrl = \?`).
		WithArgs(instance.Name, instance.BaseURL).WillReturnResult(sqlmock.NewResult(0, 1))

	err = app.DeleteInstance(instance)
	require.NoError(t, err)

	err = mock.ExpectationsWereMet()
	require.NoError(t, err)
}
