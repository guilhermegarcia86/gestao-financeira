import Kafka, { KafkaConsumer, Message } from 'node-rdkafka'

export function createConsumer(kafkaConsumer: typeof Kafka.KafkaConsumer, onDataCallback: (data: Message) => void): Promise<KafkaConsumer> {
  const consumer: KafkaConsumer = new Kafka.KafkaConsumer({
    'bootstrap.servers': process.env.bootstrap_servers,
    'group.id': process.env.group_id,
  }, {
    'auto.offset.reset': 'earliest'
  });

  return new Promise((resolve, reject) => {
    consumer
      .on('ready', () => resolve(consumer))
      .on('data', onDataCallback);

    consumer.connect();
  });
}
