import { DbLoadPlans } from './db-load-plans'
import { Plan } from '../../../domain/models/plan'
import { LoadPlansRepository } from '../../protocols'

const makeFakePlans = (): Plan[] => ([
  {
    id: 'any_id',
    name: 'any_title',
    minutes: 30,
    price: 50
  },
  {
    id: 'any_id',
    name: 'any_title',
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
})
