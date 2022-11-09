import { EmailConsumer } from '@/core/domain/emailConsumer'
import { EmailDTO, EmailService } from '@/core/service'
import { makeEmailService } from '@/core/service/factory'
import 'dotenv/config'
import Kafka, { KafkaConsumer, Message } from "node-rdkafka"

import { createConsumer } from './consumerConfig'

const emailService = makeEmailService()

export async function consumerNotification(): Promise<void> {
    console.log('Lets read some records from topic email-notification')
  
    const consumer: KafkaConsumer = await createConsumer(Kafka.KafkaConsumer, onData)
  
    consumer.subscribe(['email-notification'])
    consumer.consume()
  
    process.on('SIGINT', () => {
      console.log('\nDisconnecting consumer ...')
      consumer.disconnect()
    })
  }
  
  // callback to handle message delivery
  async function onData(data: Message): Promise<void> {
    const messageDate: Date = new Date(<number>data.timestamp)
    const readableMessageDate: string = `${messageDate.toDateString()} ${messageDate.toTimeString()}`
    console.log(`Consumed record with key ${data.key} and value ${data.value} of partition ${data.partition} @ offset ${data.offset}, sent at ${readableMessageDate}`)

    const msgString = data.value?.toString()
    if(msgString){
      const emailConsumer = JSON.parse(msgString) as EmailConsumer
      await emailService.sendEmail(emailConsumer)
    }
  }
  