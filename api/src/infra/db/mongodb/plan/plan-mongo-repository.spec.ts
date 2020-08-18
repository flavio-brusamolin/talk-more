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

  test('Should return an empty list', async () => {
    const sut = makeSut()
    const plans = await sut.loadAll()
    expect(plans.length).toBe(0)
  })

  test('Should return a plan on loadById success', async () => {
    const sut = makeSut()

    const result = await planCollection.insertOne({
      name: 'any_name',
      minutes: 30,
      price: 50
    })
    const [planRecord] = result.ops

    const plan = await sut.loadById(planRecord._id)

    expect(plan).toBeTruthy()
    expect(plan.id).toEqual(planRecord._id)
    expect(plan.name).toBe('any_name')
    expect(plan.minutes).toBe(30)
    expect(plan.price).toBe(50)
  })
})
