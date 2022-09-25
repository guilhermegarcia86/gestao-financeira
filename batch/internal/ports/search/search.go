package search

import "github.com/guilhermegarcia86/batch/internal/domain"

type Search interface {
	SearchItems() ([]domain.Item, error)
}
