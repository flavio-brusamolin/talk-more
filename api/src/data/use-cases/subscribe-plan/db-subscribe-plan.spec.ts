import { DbSubscribePlan } from './db-subscribe-plan'
import { SubscribePlanModel } from '../../../domain/use-cases/subscribe-plan'
import { Plan } from '../../../domain/models/plan'
import { LoadPlanByIdRepository, UpdateUserPlanRepository } from '../../protocols'
import { User } from '../../../domain/models/user'

const makeFakeSubscriptionData = (): SubscribePlanModel => ({
  userId: 'any_user_id',
  planId: 'any_plan_id'
})

const makeFakePlan = (): Plan => ({
  id: 'any_plan_id',
  name: 'any_name',
  minutes: 30,
  price: 50
})

const makeFakeUser = (): User => ({
  id: 'any_user_id',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password',
  planId: 'any_plan_id'
})

const makeLoadPlanByIdRepository = (): LoadPlanByIdRepository => {
  class LoadPlanByIdRepositoryStub implements LoadPlanByIdRepository {
    public async loadById (_id: string): Promise<Plan> {
      return makeFakePlan()
    }
  }

  return new LoadPlanByIdRepositoryStub()
}

const makeUpdateUserPlanRepository = (): UpdateUserPlanRepository => {
  class UpdateUserPlanRepositoryStub implements UpdateUserPlanRepository {
    public async updatePlan (_subscriptionData: SubscribePlanModel): Promise<User> {
      return makeFakeUser()
    }
  }

  return new UpdateUserPlanRepositoryStub()
}

interface SutTypes {
  loadPlanByIdRepositoryStub: LoadPlanByIdRepository
  updateUserPlanRepositoryStub: UpdateUserPlanRepository
  sut: DbSubscribePlan
}

const makeSut = (): SutTypes => {
  const loadPlanByIdRepositoryStub = makeLoadPlanByIdRepository()
  const updateUserPlanRepositoryStub = makeUpdateUserPlanRepository()
  const sut = new DbSubscribePlan(loadPlanByIdRepositoryStub, updateUserPlanRepositoryStub)

  return {
    loadPlanByIdRepositoryStub,
    updateUserPlanRepositoryStub,
    sut
  }
}

describe('DbSubscribePlan Use Case', () => {
  test('Should call LoadPlanByIdRepository with correct value', async () => {
    const { sut, loadPlanByIdRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadPlanByIdRepositoryStub, 'loadById')

    const subscriptionData = makeFakeSubscriptionData()
    await sut.subscribe(subscriptionData)

    expect(loadByIdSpy).toHaveBeenCalledWith(subscriptionData.planId)
  })

  test('Should throw if LoadPlanByIdRepository throws', async () => {
    const { sut, loadPlanByIdRepositoryStub } = makeSut()
    jest.spyOn(loadPlanByIdRepositoryStub, 'loadById').mockImplementationOnce(() => {
      throw new Error()
    })

    const subscriptionData = makeFakeSubscriptionData()
    const promise = sut.subscribe(subscriptionData)

    await expect(promise).rejects.toThrow()
  })

  test('Should return null if LoadPlanByIdRepository returns null', async () => {
    const { sut, loadPlanByIdRepositoryStub } = makeSut()
    jest.spyOn(loadPlanByIdRepositoryStub, 'loadById').mockReturnValueOnce(null)

    const subscriptionData = makeFakeSubscriptionData()
    const user = await sut.subscribe(subscriptionData)

    expect(user).toBeNull()
  })

  test('Should call UpdateUserPlanRepository with correct values', async () => {
    const { sut, updateUserPlanRepositoryStub } = makeSut()
    const updatePlanSpy = jest.spyOn(updateUserPlanRepositoryStub, 'updatePlan')

    const subscriptionData = makeFakeSubscriptionData()
    await sut.subscribe(subscriptionData)

    expect(updatePlanSpy).toHaveBeenCalledWith(subscriptionData)
  })

  test('Should throw if UpdateUserPlanRepository throws', async () => {
    const { sut, updateUserPlanRepositoryStub } = makeSut()
    jest.spyOn(updateUserPlanRepositoryStub, 'updatePlan').mockImplementationOnce(() => {
      throw new Error()
    })

    const subscriptionData = makeFakeSubscriptionData()
    const promise = sut.subscribe(subscriptionData)

    await expect(promise).rejects.toThrow()
  })
})
