package google_sheets

import (
	"context"
	"errors"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/guilhermegarcia86/batch/internal/domain"
	"github.com/guilhermegarcia86/batch/internal/utils"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/option"
	"google.golang.org/api/sheets/v4"
)

type googleSheets struct{}

func New() *googleSheets {
	return &googleSheets{}
}

func (search *googleSheets) SearchItems() ([]domain.Item, error) {
	ctx := context.Background()
	b, err := os.ReadFile("credentials.json")
	if err != nil {
		log.Fatalf("Unable to read client secret file: %v", err)
		return nil, err
	}

	config, err := google.JWTConfigFromJSON(b, "https://www.googleapis.com/auth/spreadsheets.readonly")
	if err != nil {
		log.Fatalf("Unable to parse client secret file to config: %v", err)
		return nil, err
	}
	client := config.Client(ctx)

	srv, err := sheets.NewService(ctx, option.WithHTTPClient(client))
	if err != nil {
		log.Fatalf("Unable to retrieve Sheets client: %v", err)
		return nil, err
	}

	spreadsheetId := "1fcuyPiw5vM6q38MfxD5XjXg2uG4vRBPUJliXsVOH8zA"
	month := utils.GetCurrentMonth(time.Now().Month())
	readRange := fmt.Sprintf("%s!A2:F", month)
	resp, err := srv.Spreadsheets.Values.Get(spreadsheetId, readRange).Do()
	if err != nil {
		log.Fatalf("Unable to retrieve data from sheet: %v", err)
		return nil, err
	}

	if len(resp.Values) == 0 {
		return nil, errors.New("NO DATA FOUND")
	} else {
		fmt.Println("Mes, Nome, Valor, Status, Vencimento, Tipo, Periodicidade:")
		itemSlice := make([]domain.Item, len(resp.Values))
		for index, row := range resp.Values {
			fmt.Printf("%s, %s, %s, %s, %s, %s, %s\n", month, row[0], row[1], row[2], row[3], row[4], row[5])
			itemSlice[index].Mes = month
			itemSlice[index].Nome = row[0].(string)
			itemSlice[index].Valor = row[1].(string)
			itemSlice[index].Status = row[2].(string)
			itemSlice[index].Vencimento = row[3].(string)
			itemSlice[index].Tipo = row[4].(string)
			itemSlice[index].Periodicidade = row[5].(string)
			itemSlice[index].Email = "supermandra@gmail.com"
		}
		return itemSlice, nil
	}
}
