import { SignInController, SignInModel } from './signin-controller'
import { Validator, HttpRequest } from '../../protocols'
import { MissingParamError } from '../../errors'
import { badRequest, serverError } from '../../helpers/http-helper'
import { AuthenticateUser, AuthenticateUserModel } from '../../../domain/use-cases/authenticate-user'

const makeFakeRequest = (): HttpRequest<SignInModel> => ({
  body: {
    email: 'any_email@mail.com',
    password: 'any_password'
  }
})

const makeValidator = (): Validator => {
  class ValidatorStub implements Validator {
    public validate (_input: any): Error {
      return null
    }
  }

  return new ValidatorStub()
}

const makeAuthenticateUser = (): AuthenticateUser => {
  class AuthenticateUserStub implements AuthenticateUser {
    public async authenticate (_credentials: AuthenticateUserModel): Promise<string> {
      return 'any_token'
    }
  }

  return new AuthenticateUserStub()
}

interface SutTypes {
  validatorStub: Validator
  authenticateUserStub: AuthenticateUser
  sut: SignInController
}

const makeSut = (): SutTypes => {
  const validatorStub = makeValidator()
  const authenticateUserStub = makeAuthenticateUser()
  const sut = new SignInController(validatorStub, authenticateUserStub)

  return {
    validatorStub,
    authenticateUserStub,
    sut
  }
}

describe('SignIn Controller', () => {
  test('Should call Validator with correct values', async () => {
    const { sut, validatorStub } = makeSut()
    const validateSpy = jest.spyOn(validatorStub, 'validate')

    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)

    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return a bad request error if Validator returns an error', async () => {
    const { sut, validatorStub } = makeSut()
    jest.spyOn(validatorStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))

    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })

  test('Should call AuthenticateUser with correct values', async () => {
    const { sut, authenticateUserStub } = makeSut()
    const authenticateSpy = jest.spyOn(authenticateUserStub, 'authenticate')

    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)

    expect(authenticateSpy).toHaveBeenCalledWith({
      email: 'any_email@mail.com',
      password: 'any_password'
    })
  })

  test('Should return an internal server error if AuthenticateUser throws', async () => {
    const { sut, authenticateUserStub } = makeSut()
    jest.spyOn(authenticateUserStub, 'authenticate').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(serverError())
  })
})
