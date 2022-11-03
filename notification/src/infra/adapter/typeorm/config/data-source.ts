import './module-alias'

import { DataSource, EntityTarget, ObjectLiteral, Repository } from 'typeorm'
import dotenv from 'dotenv'
dotenv.config()

export const EmailDataSource = new DataSource({
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  synchronize: false,
  logging: process.env.NODE_ENV === 'production' ? false : ['query'],
  entities: [process.env.TYPEORM_ENTITIES ?? 'src/infra/adapter/typeorm/entity/**/*.ts'],
  migrations: [process.env.TYPEORM_MIGRATIONS ?? 'src/infra/adapter/typeorm/config/migration/**/*.ts']
})

export const getRepository = <T extends ObjectLiteral>(entity: EntityTarget<T>): Repository<T> => {
  return EmailDataSource.getRepository(entity)
}
