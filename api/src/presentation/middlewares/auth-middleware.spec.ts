import { AuthMiddleware } from './auth-middleware'
import { HttpRequest } from '../protocols'
import { CheckUserAuthentication } from '../../domain/use-cases/check-user-authentication'
import { serverError, unauthorized, ok } from '../helpers/http-helper'

const makeFakeRequest = (): HttpRequest<any> => ({
  headers: {
    'x-access-token': 'any_token'
  }
})

const makeCheckUserAuthentication = (): CheckUserAuthentication => {
  class CheckUserAuthenticationStub implements CheckUserAuthentication {
    public async checkAuthentication (_token: string): Promise<string> {
      return 'any_id'
    }
  }

  return new CheckUserAuthenticationStub()
}

interface SutTypes {
  checkUserAuthenticationStub: CheckUserAuthentication
  sut: AuthMiddleware
}

const makeSut = (): SutTypes => {
  const checkUserAuthenticationStub = makeCheckUserAuthentication()
  const sut = new AuthMiddleware(checkUserAuthenticationStub)

  return {
    checkUserAuthenticationStub,
    sut
  }
}

describe('Auth Middleware', () => {
  test('Should return an unauthorized error if no x-access-token exists in headers', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle({})

    expect(httpResponse).toEqual(unauthorized())
  })

  test('Should call CheckUserAuthentication with correct value', async () => {
    const { sut, checkUserAuthenticationStub } = makeSut()
    const checkAuthenticationSpy = jest.spyOn(checkUserAuthenticationStub, 'checkAuthentication')

    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)

    expect(checkAuthenticationSpy).toHaveBeenCalledWith(httpRequest.headers?.['x-access-token'])
  })

  test('Should return an internal server error if CheckUserAuthentication throws', async () => {
    const { sut, checkUserAuthenticationStub } = makeSut()
    jest.spyOn(checkUserAuthenticationStub, 'checkAuthentication').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(serverError())
  })

  test('Should return an unauthorized error if CheckUserAuthentication returns null', async () => {
    const { sut, checkUserAuthenticationStub } = makeSut()
    jest.spyOn(checkUserAuthenticationStub, 'checkAuthentication').mockReturnValueOnce(null)

    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(unauthorized())
  })

  test('Should return an ok response on success', async () => {
    const { sut } = makeSut()

    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(ok({
      userId: 'any_id'
    }))
  })
})
