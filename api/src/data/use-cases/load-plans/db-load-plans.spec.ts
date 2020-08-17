import { DbLoadPlans } from './db-load-plans'
import { Plan } from '../../../domain/models/plan'
import { LoadPlansRepository } from '../../protocols'

const makeFakePlans = (): Plan[] => ([
  {
    id: 'any_id',
    name: 'any_name',
    minutes: 30,
    price: 50
  },
  {
    id: 'any_id',
    name: 'any_name',
    minutes: 60,
    price: 90
  }
])

const makeLoadPlansRepository = (): LoadPlansRepository => {
  class LoadPlansRepositoryStub implements LoadPlansRepository {
    public async loadAll (): Promise<Plan[]> {
      return makeFakePlans()
    }
  }

  return new LoadPlansRepositoryStub()
}

interface SutTypes {
  loadPlansRepositoryStub: LoadPlansRepository
  sut: DbLoadPlans
}

const makeSut = (): SutTypes => {
  const loadPlansRepositoryStub = makeLoadPlansRepository()
  const sut = new DbLoadPlans(loadPlansRepositoryStub)

  return {
    loadPlansRepositoryStub,
    sut
  }
}

describe('DbLoadPlans Use Case', () => {
  test('Should call LoadPlansRepository', async () => {
    const { sut, loadPlansRepositoryStub } = makeSut()
    const loadAllSpy = jest.spyOn(loadPlansRepositoryStub, 'loadAll')

    await sut.load()

    expect(loadAllSpy).toHaveBeenCalledTimes(1)
  })

  test('Should throw if LoadPlansRepository throws', async () => {
    const { sut, loadPlansRepositoryStub } = makeSut()
    jest.spyOn(loadPlansRepositoryStub, 'loadAll').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.load()

    await expect(promise).rejects.toThrow()
  })

  test('Should return a list of plans on success', async () => {
    const { sut } = makeSut()

    const plans = await sut.load()

    expect(plans).toEqual(makeFakePlans())
  })
})
