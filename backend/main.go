package main

import (
	"backend/api/manager"
)

func init() {

}

func main() {

	backendApi := manager.NewBackendAPI("127.0.0.1", "8888")
	backendApi.Start()

	// keep the main terminal open
	select {}

}
