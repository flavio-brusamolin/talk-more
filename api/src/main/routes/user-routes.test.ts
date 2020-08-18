import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'
import app from '../config/app'
import request from 'supertest'

let userCollection: Collection

describe('User Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    userCollection = await MongoHelper.getCollection('users')
    await userCollection.deleteMany({})
  })

  describe('GET /me', () => {
    test('Should return 401 on load logged user without accessToken', async () => {
      await request(app)
        .get('/api/me')
        .expect(401)
    })
  })
})
