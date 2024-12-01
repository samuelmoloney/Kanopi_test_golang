package manager

import (
	"backend/api"
	healthcheck "backend/api/endpoints/health-check"
	"backend/api/endpoints/swatches"
	"fmt"
	"net/http"

	"github.com/danielgtaylor/huma/v2"
	"github.com/danielgtaylor/huma/v2/adapters/humago"
	"github.com/go-resty/resty/v2"
	"github.com/sirupsen/logrus"
)

type BackendAPI struct {
	HttpClient *resty.Client
	router     *http.ServeMux
	instance   huma.API
	host       string
	port       string
}

func NewBackendAPI(host string, port string) *BackendAPI {
	// Create a new router & API
	router := http.NewServeMux()
	instance := humago.New(router, huma.DefaultConfig("Backend API", "0.0.1"))

	api.ApiInstance = &instance

	// Register endpoints
	huma.Register(instance, healthcheck.HealthCheckOperation, healthcheck.HealthCheckEcho)
	huma.Register(instance, swatches.SwatchesOperation, swatches.GetRandomColor)

	return &BackendAPI{
		HttpClient: resty.New(),
		router:     router,
		instance:   instance,
		host:       host,
		port:       port,
	}
}

func (api *BackendAPI) Start() {
	// Start the server!
	serveLocation := fmt.Sprintf("%s:%s", api.host, api.port)
	logrus.Infof("Server started at http://%s\n", serveLocation)
	error := http.ListenAndServe(serveLocation, api.router)
	if error != nil {
		logrus.Fatal(error)
	}
}
