import 'dotenv/config';
import Kafka, { KafkaConsumer, Message } from "node-rdkafka";

import { createConsumer } from './consumerConfig';

async function consumerNotification(): Promise<void> {
    console.log('Lets read some records from topic email-notification, okay?');
  
    const consumer: KafkaConsumer = await createConsumer(Kafka.KafkaConsumer, onData)
  
    consumer.subscribe(['email-notification']);
    consumer.consume();
  
    process.on('SIGINT', () => {
      console.log('\nDisconnecting consumer ...');
      consumer.disconnect();
    });
  }
  
  // callback to handle message delivery
  function onData(data: Message): void {
    const messageDate: Date = new Date(<number>data.timestamp);
    const readableMessageDate: string = `${messageDate.toDateString()} ${messageDate.toTimeString()}`;
    console.log(`Consumed record with key ${data.key} and value ${data.value} of partition ${data.partition} @ offset ${data.offset}, sent at ${readableMessageDate}`);
  };
  
  // start application
  consumerNotification()
    .catch((err) => {
      console.error(`Something went wrong:\n${err}`);
      process.exit(1);
    });
  