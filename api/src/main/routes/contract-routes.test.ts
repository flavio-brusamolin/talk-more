import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'
import app from '../config/app'
import env from '../config/env'
import request from 'supertest'
import jwt from 'jsonwebtoken'

let userCollection: Collection
let planCollection: Collection

const mockAccessToken = async (): Promise<string> => {
  const result = await userCollection.insertOne({
    name: 'Test',
    email: 'test@mail.com',
    password: '123'
  })
  const [userRecord] = result.ops

  return jwt.sign({ id: userRecord._id }, env.jwtSecret)
}

describe('Contract Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    userCollection = await MongoHelper.getCollection('users')
    await userCollection.deleteMany({})

    planCollection = await MongoHelper.getCollection('plans')
    await planCollection.deleteMany({})
  })

  describe('POST /contracts', () => {
    test('Should return 401 on create contract without accessToken', async () => {
      await request(app)
        .post('/api/contracts')
        .expect(401)
    })

    test('Should return 200 on create contract with valid accessToken', async () => {
      const accessToken = await mockAccessToken()

      const result = await planCollection.insertOne({
        name: 'any_name',
        minutes: 30,
        price: 50
      })
      const [planRecord] = result.ops

      await request(app)
        .post('/api/contracts')
        .set('x-access-token', accessToken)
        .send({
          planId: planRecord._id
        })
        .expect(200)
    })
  })
})
