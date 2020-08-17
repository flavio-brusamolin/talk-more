import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'

describe('Plan Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const planCollection = await MongoHelper.getCollection('plans')
    await planCollection.deleteMany({})
  })

  describe('GET /plans', () => {
    test('Should return 200 on load plans', async () => {
      await request(app)
        .get('/api/plans')
        .expect(200)
    })
  })
})
