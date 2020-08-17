import { LoadPlansController } from './load-plans-controller'
import { Plan } from '../../../domain/models/plan'
import { LoadPlans } from '../../../domain/use-cases/load-plans'

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

const makeLoadPlans = (): LoadPlans => {
  class LoadPlansStub implements LoadPlans {
    public async load (): Promise<Plan[]> {
      return makeFakePlans()
    }
  }

  return new LoadPlansStub()
}

interface SutTypes {
  loadPlansStub: LoadPlans
  sut: LoadPlansController
}

const makeSut = (): SutTypes => {
  const loadPlansStub = makeLoadPlans()
  const sut = new LoadPlansController(loadPlansStub)

  return {
    loadPlansStub,
    sut
  }
}

describe('LoadPlans Controller', () => {
  test('Should call LoadPlans', async () => {
    const { sut, loadPlansStub } = makeSut()
    const loadSpy = jest.spyOn(loadPlansStub, 'load')

    await sut.handle({})

    expect(loadSpy).toHaveBeenCalledTimes(1)
  })
})
