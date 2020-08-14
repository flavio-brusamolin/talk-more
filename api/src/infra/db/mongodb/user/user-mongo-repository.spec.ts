import { MongoHelper } from '../helpers/mongo-helper'
import { AddUserModel } from '../../../../domain/use-cases/add-user'
import { UserMongoRepository } from './user-mongo-repository'
import { Collection } from 'mongodb'

const makeSut = (): UserMongoRepository => {
  return new UserMongoRepository()
}

let userCollection: Collection

describe('User Mongo Repository', () => {
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

  test('Should return a user on loadByEmail success', async () => {
    const sut = makeSut()

    await userCollection.insertOne({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })

    const user = await sut.loadByEmail('any_email@mail.com')

    expect(user).toBeTruthy()
    expect(user.id).toBeTruthy()
    expect(user.name).toBe('any_name')
    expect(user.email).toBe('any_email@mail.com')
    expect(user.password).toBe('any_password')
  })

  test('Should return null if loadByEmail fails', async () => {
    const sut = makeSut()
    const user = await sut.loadByEmail('any_email@mail.com')
    expect(user).toBeFalsy()
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
