import { EntityTarget } from 'typeorm'
import { EmailDataSource } from '@/infra/adapter/typeorm/config/data-source'

export const clearDb = async <T> (entity: EntityTarget<T>, table: string): Promise<any> => {
  return await EmailDataSource.getRepository(entity).query(`TRUNCATE public.${table} RESTART IDENTITY`)
}
