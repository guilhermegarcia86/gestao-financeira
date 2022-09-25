package kafka_messaging

import (
	"encoding/json"
	"fmt"

	"github.com/confluentinc/confluent-kafka-go/kafka"
	"github.com/guilhermegarcia86/batch/internal/domain"
)

type kafkaProducer struct{}

func New() *kafkaProducer {
	return &kafkaProducer{}
}

func (producer *kafkaProducer) SendMessage(item domain.Item) {

	p, err := kafka.NewProducer(&kafka.ConfigMap{"bootstrap.servers": "localhost"})
	if err != nil {
		panic(err)
	}

	defer p.Close()

	go func() {
		for e := range p.Events() {
			switch ev := e.(type) {
			case *kafka.Message:
				if ev.TopicPartition.Error != nil {
					fmt.Printf("Entrega falhou: %v\n", ev.TopicPartition)
				} else {
					fmt.Printf("Mensagem entregue no topico: %v\n", ev.TopicPartition)
				}
			}
		}
	}()

	topic := "gestao-financeira"
	itemJson, _ := json.Marshal(&item)
	p.Produce(&kafka.Message{
		TopicPartition: kafka.TopicPartition{Topic: &topic, Partition: kafka.PartitionAny},
		Key:            []byte(item.Mes),
		Value:          []byte(itemJson),
	}, nil)

	// Wait for message deliveries before shutting down
	p.Flush(15 * 1000)

}
