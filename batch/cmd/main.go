package main

import (
	"github.com/guilhermegarcia86/batch/internal/adapter/messaging/kafka_messaging"
	"github.com/guilhermegarcia86/batch/internal/adapter/search/google_sheets"
	"github.com/guilhermegarcia86/batch/internal/service"
)

func main() {

	service.New(google_sheets.New(), kafka_messaging.New()).SearchItemAndDispatch()

}
