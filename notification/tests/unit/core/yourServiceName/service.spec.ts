import { EmailDTO, EmailNotFoundError, EmailService } from '@/core/service'
import { Repository } from '@/core/port/repository/repository'
import { InMemoryRepository } from '@/infra/adapter/in-memory/in-memory-repository'

describe('EmailService', () => {
  let emailRepo: Repository<EmailDTO>
  let sut: EmailService

  beforeAll(() => {
    emailRepo = new InMemoryRepository()
  })

  beforeEach(() => {
    sut = new EmailService(emailRepo)
  })

  describe('findEmailById', () => {
    it('should rethrow if emailRepo.findOne throws', async () => {
      const promise = sut.findEmailById(3)

      await expect(promise).rejects.toThrow(new Error('any_error'))
    })

    it('should return undefined if emailRepo.findOne did not finds yourServiceName', async () => {
      const promise = sut.findEmailById(2)

      await expect(promise).rejects.toThrow(new EmailNotFoundError('YourServiceName not found for id 2'))
    })

    it('should return yourServiceName if emailRepo.findOne returns ok', async () => {
      const yourServiceName = await sut.findEmailById(1)

      expect(yourServiceName).toEqual({ id: 1, licensePlate: 'AAA111', renavam: 123456789, state: 'SP' })
    })
  })
})
