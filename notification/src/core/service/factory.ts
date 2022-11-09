import { EmailService } from '@/core/service/service'
import { EmailSender } from '@/infra/adapter/mail/nodemailer'
import { EmailRepository } from '@/infra/adapter/typeorm/typeorm-repository'

export const makeEmailService = (): EmailService => {
  const emailService = new EmailService(new EmailRepository(), new EmailSender())
  return emailService
}
