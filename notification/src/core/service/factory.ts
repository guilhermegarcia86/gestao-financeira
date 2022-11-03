import { EmailService } from '@/core/service/service'
import { EmailRepository } from '@/infra/adapter/typeorm/typeorm-repository'

export const makeEmailService = (): EmailService => {
  const emailService = new EmailService(new EmailRepository())
  return emailService
}
