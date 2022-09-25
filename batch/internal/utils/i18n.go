package utils

import "time"

var months = [...]string{
	"Janeiro",
	"Fevereiro",
	"Março",
	"Abril",
	"Maio",
	"Junho",
	"Julho",
	"Agosto",
	"Setembro",
	"Outubro",
	"Novembro",
	"Dezembro",
}

func GetCurrentMonth(month time.Month) string {
	return months[month-1]
}
