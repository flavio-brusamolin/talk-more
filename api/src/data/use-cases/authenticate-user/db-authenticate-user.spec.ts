import { DbAuthenticateUser } from './db-authenticate-user'
import { AuthenticateUserModel } from '../../../domain/use-cases/authenticate-user'
import { User } from '../../../domain/models/user'
import { LoadUserByEmailRepository } from '../../protocols'

const makeFakeCredentials = (): AuthenticateUserModel => ({
  email: 'valid_email@mail.com',
  password: 'valid_password'
})

const makeFakeUser = (): User => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'hashed_password'
})

const makeLoadUserByEmailRepository = (): LoadUserByEmailRepository => {
  class LoadUserByEmailRepositoryStub implements LoadUserByEmailRepository {
    public async loadByEmail (_email: string): Promise<User> {
      return makeFakeUser()
    }
  }

  return new LoadUserByEmailRepositoryStub()
}

interface SutTypes {
  loadUserByEmailRepositoryStub: LoadUserByEmailRepository
  sut: DbAuthenticateUser
}

const makeSut = (): SutTypes => {
  const loadUserByEmailRepositoryStub = makeLoadUserByEmailRepository()
  const sut = new DbAuthenticateUser(loadUserByEmailRepositoryStub)

  return {
    loadUserByEmailRepositoryStub,
    sut
  }
}

describe('DbAuthenticateUser Use Case', () => {
  test('Should call LoadUserByEmailRepository with correct value', async () => {
    const { sut, loadUserByEmailRepositoryStub } = makeSut()
    const loadByEmailSpy = jest.spyOn(loadUserByEmailRepositoryStub, 'loadByEmail')

    const credentials = makeFakeCredentials()
    await sut.authenticate(credentials)

    expect(loadByEmailSpy).toHaveBeenCalledWith(credentials.email)
  })

  test('Should throw if LoadUserByEmailRepository throws', async () => {
    const { sut, loadUserByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadUserByEmailRepositoryStub, 'loadByEmail').mockImplementationOnce(() => {
      throw new Error()
    })

    const credentials = makeFakeCredentials()
    const promise = sut.authenticate(credentials)

    await expect(promise).rejects.toThrow()
  })

  test('Should return null if LoadUserByEmailRepository returns null', async () => {
    const { sut, loadUserByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadUserByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(null)

    const credentials = makeFakeCredentials()
    const accessToken = await sut.authenticate(credentials)

    expect(accessToken).toBeNull()
  })
})
