import { MongoHelper } from '../helpers/mongo-helper'
import { AddUserModel } from '../../../../domain/use-cases/add-user'
import { UserMongoRepository } from './user-mongo-repository'
import { Collection, ObjectId } from 'mongodb'

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

  test('Should return a user on loadById success', async () => {
    const sut = makeSut()

    const result = await userCollection.insertOne({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    const [userRecord] = result.ops

    const user = await sut.loadById(userRecord._id)

    expect(user).toBeTruthy()
    expect(user.id).toEqual(userRecord._id)
    expect(user.name).toBe('any_name')
    expect(user.email).toBe('any_email@mail.com')
    expect(user.password).toBe('any_password')
  })

  test('Should return null if loadById fails', async () => {
    const sut = makeSut()
    const user = await sut.loadById(new ObjectId().toHexString())
    expect(user).toBeFalsy()
  })

  test('Should update the user plan on updatePlan success', async () => {
    const sut = makeSut()

    const result = await userCollection.insertOne({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    let [user] = result.ops

    expect(user.planId).toBeFalsy()

    const planId = new ObjectId().toHexString()
    user = await sut.updatePlan({
      userId: user._id,
      planId
    })

    expect(user).toBeTruthy()
    expect(user.planId).toBe(planId)
  })
})
