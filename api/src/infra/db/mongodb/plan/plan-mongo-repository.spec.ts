import { PlanMongoRepository } from './plan-mongo-repository'
import { MongoHelper } from '../helpers/mongo-helper'
import { Collection } from 'mongodb'

const makeSut = (): PlanMongoRepository => {
  return new PlanMongoRepository()
}

let planCollection: Collection

describe('Plan Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    planCollection = await MongoHelper.getCollection('plans')
    await planCollection.deleteMany({})
  })

  test('Should return a list of plans on loadAll success', async () => {
    const sut = makeSut()

    const plansData = [
      {
        name: 'any_name',
        minutes: 30,
        price: 50
      },
      {
        name: 'any_name',
        minutes: 60,
        price: 90
      }
    ]
    await planCollection.insertMany(plansData)

    const plans = await sut.loadAll()

    expect(plans).toBeTruthy()
    expect(plans.length).toBe(2)

    expect(plans[0].id).toBeTruthy()
    expect(plans[0].name).toBe(plansData[0].name)
    expect(plans[0].minutes).toBe(plansData[0].minutes)
    expect(plans[0].price).toBe(plansData[0].price)

    expect(plans[1].id).toBeTruthy()
    expect(plans[1].name).toBe(plansData[1].name)
    expect(plans[1].minutes).toBe(plansData[1].minutes)
    expect(plans[1].price).toBe(plansData[1].price)
  })
})
