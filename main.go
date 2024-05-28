package main

import (
	"embed"
	"log"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/logger"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

const (
	DefaultWidth  = 1024
	DefaultHeight = 768
	DefaultMin    = 400
	Red           = 27
	Green         = 38
	Blue          = 54
	Alpha         = 1
)

func main() {
	app := NewApp()
	instanceApp, _ := NewInstanceApp()

	err := wails.Run(&options.App{
		Title:             "Souin Desktop",
		Width:             DefaultWidth,
		Height:            DefaultHeight,
		DisableResize:     true,
		Fullscreen:        true,
		WindowStartState:  options.Maximised,
		Frameless:         false,
		MinWidth:          DefaultMin,
		MinHeight:         DefaultMin,
		MaxWidth:          DefaultWidth,
		MaxHeight:         DefaultHeight,
		StartHidden:       false,
		HideWindowOnClose: true,
		BackgroundColour:  &options.RGBA{R: Red, G: Green, B: Blue, A: Alpha},
		AlwaysOnTop:       false,
		AssetServer: &assetserver.Options{
			Assets:     assets,
			Handler:    nil,
			Middleware: nil,
		},
		Menu:                             nil,
		Logger:                           nil,
		LogLevel:                         logger.DEBUG,
		LogLevelProduction:               logger.ERROR,
		OnStartup:                        app.startup,
		OnDomReady:                       nil,
		OnShutdown:                       nil,
		OnBeforeClose:                    nil,
		CSSDragProperty:                  "",
		CSSDragValue:                     "",
		EnableDefaultContextMenu:         false,
		EnableFraudulentWebsiteDetection: false,
		Bind: []interface{}{
			app,
			instanceApp,
		},
		ErrorFormatter: nil,
		Debug: options.Debug{
			OpenInspectorOnStartup: false,
		},
		SingleInstanceLock: &options.SingleInstanceLock{
			UniqueId:               "e3984e08-28dc-4e3d-b70a-45e961589cdc",
			OnSecondInstanceLaunch: nil,
		},
		Assets:        nil,
		AssetsHandler: nil,
		EnumBind:      nil,
		Windows:       nil,
		Mac:           nil,
		Linux:         nil,
		Experimental:  nil,
	})
	if err != nil {
		log.Fatal(err)
	}
}
