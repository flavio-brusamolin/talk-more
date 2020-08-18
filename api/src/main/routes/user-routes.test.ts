import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'
import app from '../config/app'
import env from '../config/env'
import request from 'supertest'
import jwt from 'jsonwebtoken'

let userCollection: Collection

const mockAccessToken = async (): Promise<string> => {
  const result = await userCollection.insertOne({
    name: 'Test',
    email: 'test@mail.com',
    password: '123'
  })
  const [userRecord] = result.ops

  return jwt.sign({ id: userRecord._id }, env.jwtSecret)
}

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

    test('Should return 200 on load logged user with valid accessToken', async () => {
      const accessToken = await mockAccessToken()

      await request(app)
        .get('/api/me')
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })
})
