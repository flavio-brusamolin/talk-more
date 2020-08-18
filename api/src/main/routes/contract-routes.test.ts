import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'
import app from '../config/app'
import request from 'supertest'

let userCollection: Collection
let planCollection: Collection

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

  describe('POST /contract', () => {
    test('Should return 401 on create contract without accessToken', async () => {
      await request(app)
        .post('/api/contract')
        .expect(401)
    })
  })
})
