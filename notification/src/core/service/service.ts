import logger from '@/infra/adapter/logger/logger'
import { Email } from '@/infra/adapter/typeorm/entity/entity'
import { EmailNotFoundError } from '@/core/errors/error'
import { Repository } from '../port/repository/repository'
import { EmailDTO } from '../domain/domain'

const log = logger({ context: 'EmailService' })
export class EmailService {
  constructor (private readonly emailRepository: Repository<Email>) {}

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
