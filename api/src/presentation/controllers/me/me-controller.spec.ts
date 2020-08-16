import { MeController } from './me-controller'
import { User } from '../../../domain/models/user'
import { LoadUserById } from '../../../domain/use-cases/load-user-by-id'
import { HttpRequest } from '../../protocols'
import { serverError, ok, forbidden } from '../../helpers/http-helper'
import { InvalidParamError } from '../../errors'

const makeFakeRequest = (): HttpRequest<any> => ({
  userId: 'any_id'
})

const makeFakeUser = (): User => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password'
})

const makeLoadUserById = (): LoadUserById => {
  class LoadUserByIdStub implements LoadUserById {
    public async loadById (_id: string): Promise<User> {
      return makeFakeUser()
    }
  }

  return new LoadUserByIdStub()
}

interface SutTypes {
  loadUserByIdStub: LoadUserById
  sut: MeController
}

const makeSut = (): SutTypes => {
  const loadUserByIdStub = makeLoadUserById()
  const sut = new MeController(loadUserByIdStub)

  return {
    loadUserByIdStub,
    sut
  }
}

describe('Me Controller', () => {
  test('Should call LoadUserById with correct value', async () => {
    const { sut, loadUserByIdStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadUserByIdStub, 'loadById')

    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)

    expect(loadByIdSpy).toHaveBeenCalledWith(httpRequest.userId)
  })

  test('Should return an internal server error if LoadUserById throws', async () => {
    const { sut, loadUserByIdStub } = makeSut()
    jest.spyOn(loadUserByIdStub, 'loadById').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(serverError())
  })

  test('Should return an forbidden error if LoadUserById returns null', async () => {
    const { sut, loadUserByIdStub } = makeSut()
    jest.spyOn(loadUserByIdStub, 'loadById').mockReturnValueOnce(null)

    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(forbidden(new InvalidParamError('userId')))
  })

  test('Should return an ok response on success', async () => {
    const { sut } = makeSut()

    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(ok(makeFakeUser()))
  })
})
