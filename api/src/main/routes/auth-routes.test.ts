import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'
import bcrypt from 'bcrypt'

let userCollection: Collection

describe('Auth Routes', () => {
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

  describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Test',
          email: 'test@mail.com',
          password: '123'
        })
        .expect(200)

      await request(app)
        .post('/api/signup')
        .send({
          name: 'Test',
          email: 'test@mail.com',
          password: '123'
        })
        .expect(409)
    })
  })

  describe('POST /signin', () => {
    test('Should return 200 on signin', async () => {
      await userCollection.insertOne({
        name: 'Test',
        email: 'test@mail.com',
        password: await bcrypt.hash('123', 12)
      })

      await request(app)
        .post('/api/signin')
        .send({
          email: 'test@mail.com',
          password: '123'
        })
        .expect(200)
    })

    test('Should return 401 on signin', async () => {
      await request(app)
        .post('/api/signin')
        .send({
          email: 'test@mail.com',
          password: '123'
        })
        .expect(401)
    })
  })
})
