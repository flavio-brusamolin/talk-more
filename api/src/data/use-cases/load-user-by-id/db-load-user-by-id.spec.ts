import { DbLoadUserById } from './db-load-user-by-id'
import { User } from '../../../domain/models/user'
import { LoadUserByIdRepository } from '../../protocols'

const makeFakeUser = (): User => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password'
})

const makeLoadUserByIdRepository = (): LoadUserByIdRepository => {
  class LoadUserByIdRepositoryStub implements LoadUserByIdRepository {
    public async loadById (_id: string): Promise<User> {
      return makeFakeUser()
    }
  }

  return new LoadUserByIdRepositoryStub()
}

interface SutTypes {
  loadUserByIdRepositoryStub: LoadUserByIdRepository
  sut: DbLoadUserById
}

const makeSut = (): SutTypes => {
  const loadUserByIdRepositoryStub = makeLoadUserByIdRepository()
  const sut = new DbLoadUserById(loadUserByIdRepositoryStub)

  return {
    loadUserByIdRepositoryStub,
    sut
  }
}

describe('DbLoadUserById Use Case', () => {
  test('Should call LoadUserByIdRepository with correct value', async () => {
    const { sut, loadUserByIdRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadUserByIdRepositoryStub, 'loadById')

    await sut.loadById('any_id')

    expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should throw if LoadUserByIdRepository throws', async () => {
    const { sut, loadUserByIdRepositoryStub } = makeSut()
    jest.spyOn(loadUserByIdRepositoryStub, 'loadById').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.loadById('any_id')

    await expect(promise).rejects.toThrow()
  })

  test('Should return null if LoadUserByIdRepository returns null', async () => {
    const { sut, loadUserByIdRepositoryStub } = makeSut()
    jest.spyOn(loadUserByIdRepositoryStub, 'loadById').mockReturnValueOnce(null)

    const user = await sut.loadById('any_id')

    expect(user).toBeNull()
  })
})
