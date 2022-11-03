
import request from 'supertest'

import { app } from '@/application/api/app'
import { getRepository, EmailDataSource } from '@/infra/adapter/typeorm/config/data-source'
import { Repository } from 'typeorm'
import { Email } from '@/infra/adapter/typeorm/entity/entity'
import { clearDb } from '../../utils'

describe('YourServiceNameController', () => {
  let repository: Repository<Email>

  describe('findYourServiceNameById', () => {
    beforeAll(async () => {
      await EmailDataSource.initialize()
      await EmailDataSource.synchronize()
      repository = getRepository(Email)
    })

    afterAll(async () => {
      await EmailDataSource.destroy()
    })

    beforeEach(async () => {
      await clearDb(Email, 'your_service_name')
    })

    it('should return 404 if yourServiceName not found', async () => {
      const { status } = await request(app).get('/boilerplate/v1/yourServiceName/1')

      expect(status).toBe(404)
    })

    it('should return 200 and yourServiceName info if yourServiceName exists', async () => {
      await repository.query('insert into your_service_name (license_plate, renavam, state) values (\'AAA1111\', 123456789, \'SP\');')

      const { status, body } = await request(app).get('/boilerplate/v1/yourServiceName/1')
      expect(status).toBe(200)
      expect(body).toMatchObject({ id: 1, licensePlate: 'AAA1111', renavam: 123456789 })
    })
  })
})
