package messaging

import "github.com/guilhermegarcia86/batch/internal/domain"

type Messaging interface {
	SendMessage(item domain.Item)
}
