
import { Repository } from '@/core/port/repository/repository'
import { Email, EmailDTO } from '@/core/service'
import { getRepository } from '@/infra/adapter/typeorm/config/data-source'

export class EmailRepository implements Repository<EmailDTO> {
  async findAll (): Promise<EmailDTO[] | undefined> {
    return await getRepository(Email).find()
  }

  async findOne (id: number): Promise<EmailDTO | undefined> {
    const email = await getRepository(Email).findOne({ where: { id } })
    return email ?? undefined
  }
}
