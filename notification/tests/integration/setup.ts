import { GenericContainer, Wait } from 'testcontainers'

export default async (): Promise<any> => {
  const pgContainer = await new GenericContainer('postgres')
    .withEnv('POSTGRES_PASSWORD', 'postgres')
    .withExposedPorts(5432)
    .withWaitStrategy(Wait.forLogMessage('database system is ready to accept connections'))
    .start()

  process.env.TYPEORM_HOST = pgContainer.getHost()
  process.env.TYPEORM_PORT = pgContainer.getMappedPort(5432).toString()
  process.env.TYPEORM_DATABASE = 'postgres'
  process.env.TYPEORM_USERNAME = 'postgres'
  process.env.TYPEORM_PASSWORD = 'postgres'
  process.env.TYPEORM_ENTITIES = 'src/infra/adapter/typeorm/entity/**/*.ts'
  process.env.TYPEORM_MIGRATIONS = 'src/infra/adapter/typeorm/config/migration/**/*.ts'

  // @ts-expect-error
  global.__PG__ = pgContainer
}
