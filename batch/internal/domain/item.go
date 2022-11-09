package domain

type Item struct {
	Id            string `json:"id,omitempty"`
	Mes           string `json:"mes,omitempty"`
	Nome          string `json:"nome,omitempty"`
	Valor         string `json:"valor,omitempty"`
	Status        string `json:"status,omitempty"`
	Vencimento    string `json:"vencimento,omitempty"`
	Tipo          string `json:"tipo,omitempty"`
	Periodicidade string `json:"periodicidade,omitempty"`
	Email         string `json:"email,omitempty"`
}
