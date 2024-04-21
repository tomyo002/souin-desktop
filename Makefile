.PHONY: prepare start

prepare:
	go install github.com/wailsapp/wails/v2/cmd/wails@latest
	cd frontend && pnpm install

start:
	wails dev