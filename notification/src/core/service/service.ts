import logger from '@/infra/adapter/logger/logger'
import { Email } from '@/infra/adapter/typeorm/entity/entity'
import { EmailNotFoundError } from '@/core/errors/error'
import { Repository } from '../port/repository/repository'
import { EmailDTO } from '../domain/domain'
import { Mail } from '../port/mail/mail'
import { EmailConsumer } from '../domain/emailConsumer'

const log = logger({ context: 'EmailService' })
export class EmailService {
  constructor (private readonly emailRepository: Repository<Email>, private readonly emailSender: Mail) {}

  async sendEmail (emailConsumer: EmailConsumer): Promise<void> {
    const email = new EmailDTO(undefined, "", emailConsumer.email, '', '', false)
    const emailSaved = await this.emailRepository.save(email)
    await this.emailSender.send(emailSaved)
    await this.emailRepository.update(emailSaved)
  }

  async searchAllSentByEmail (email: string): Promise<EmailDTO[]> {
    log.info(`Find all emails sent to ${email}`)
    const emailArray = await this.emailRepository.findByEmailAndIsSent(email)
    if (!emailArray) throw new EmailNotFoundError(`Emails not found for ${email}`)
    return emailArray.map(email => EmailDTO.fromEntity(email))
  }

  async findEmailById (id: number): Promise<EmailDTO> {
    log.info(`Finding by id - ${id}`)
    const email = await this.emailRepository.findOne(id)
    if (!email) {
      throw new EmailNotFoundError(`Email not found for id ${id}`)
    }
    return EmailDTO.fromEntity(email)
  }

  async findAll (): Promise<EmailDTO[]> {
    log.info('Finding all emails')
    const emails = await this.emailRepository.findAll()
    if (!emails) {
      throw new EmailNotFoundError('Email not found')
    }

    return emails.map(email => EmailDTO.fromEntity(email))
  }
}
