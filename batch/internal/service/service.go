package service

import (
	"fmt"

	"github.com/guilhermegarcia86/batch/internal/ports/messaging"
	"github.com/guilhermegarcia86/batch/internal/ports/search"
)

type service struct {
	search    search.Search
	messaging messaging.Messaging
}

func New(search search.Search, messaging messaging.Messaging) *service {
	return &service{
		search:    search,
		messaging: messaging,
	}
}

func (s *service) SearchItemAndDispatch() {
	items, err := s.search.SearchItems()
	if err != nil {
		fmt.Println("ERRO AO BUSCAR ITEMS")
		panic(err.Error())
	}

	for _, item := range items {
		s.messaging.SendMessage(item)
	}

}
