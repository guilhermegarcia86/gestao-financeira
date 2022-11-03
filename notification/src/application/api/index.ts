import '../../infra/adapter/typeorm/config/module-alias'

import 'reflect-metadata'

import dotenv from 'dotenv'
dotenv.config()

/* eslint-disable import/first */
import { app } from '@/application/api/app'
import { env } from '@/infra/adapter/typeorm/config/env'
import logger from '@/infra/adapter/logger/logger'
import { EmailDataSource } from '@/infra/adapter/typeorm/config/data-source'

const log = logger({ context: 'App' })

EmailDataSource.initialize().then(() => {
  const server = app.listen(env.serverPort, () => log.info(`Service started at ${env.serverPort}`))

  process.on('SIGTERM', () => {
    log.info('Terminating application')
    server.close()
  })
}).catch(err => {
  log.error(err)
  process.exit(0)
})
