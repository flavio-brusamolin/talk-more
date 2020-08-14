import { MongoHelper } from '../helpers/mongo-helper'
import { AddUserModel } from '../../../../domain/use-cases/add-user'
import { UserMongoRepository } from './user-mongo-repository'

const makeSut = (): UserMongoRepository => {
  return new UserMongoRepository()
}

describe('User Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const userCollection = await MongoHelper.getCollection('users')
    await userCollection.deleteMany({})
  })

  test('Should return a user on add success', async () => {
    const sut = makeSut()

    const userData: AddUserModel = {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    }

    const user = await sut.add(userData)

    expect(user).toBeTruthy()
    expect(user.id).toBeTruthy()
    expect(user.name).toBe(userData.name)
    expect(user.email).toBe(userData.email)
    expect(user.password).toBe(userData.password)
  })
})
