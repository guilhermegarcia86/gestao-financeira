import { EmailDTO } from '@/core/domain/domain'
import { Repository } from '@/core/port/repository/repository'

export class InMemoryRepository implements Repository<EmailDTO> {
  private readonly domainList: EmailDTO[] = []

  async findOne (id: number): Promise<EmailDTO | undefined> {
    if (id === 2) return undefined
    if (id === 3) throw new Error('any_error')
    return new EmailDTO(id, 'AAA111', '123456789', 'SP')
  }

  async findAll (): Promise<EmailDTO[] | undefined> {
    this.domainList.push(new EmailDTO(1, 'AAA111', '123456789', 'SP'))
    return this.domainList
  }
}
