import { AuthMiddleware } from './auth-middleware'
import { HttpRequest } from '../protocols'
import { CheckUserAuthentication } from '../../domain/use-cases/check-user-authentication'

const makeFakeRequest = (): HttpRequest<any> => ({
  headers: {
    authorization: 'any_token'
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
  test('Should call CheckUserAuthentication with correct value', async () => {
    const { sut, checkUserAuthenticationStub } = makeSut()
    const checkAuthenticationSpy = jest.spyOn(checkUserAuthenticationStub, 'checkAuthentication')

    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)

    expect(checkAuthenticationSpy).toHaveBeenCalledWith(httpRequest.headers.authorization)
  })
})
