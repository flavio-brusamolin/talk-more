import { SignUpController, SignUpModel } from './signup-controller'
import { Validator, HttpRequest } from '../../protocols'
import { MissingParamError, DuplicateEmailError } from '../../errors'
import { badRequest, serverError, conflict, ok } from '../../helpers/http-helper'
import { AddUser, AddUserModel } from '../../../domain/use-cases/add-user'
import { User } from '../../../domain/models/user'
import { AuthenticateUser, AuthenticateUserModel } from '../../../domain/use-cases/authenticate-user'

const makeFakeRequest = (): HttpRequest<SignUpModel> => ({
  body: {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password'
  }
})

const makeFakeUser = (): User => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password'
})

const makeValidator = (): Validator => {
  class ValidatorStub implements Validator {
    public validate (_input: any): Error {
      return null
    }
  }

  return new ValidatorStub()
}

const makeAddUser = (): AddUser => {
  class AddUserStub implements AddUser {
    public async add (_user: AddUserModel): Promise<User> {
      return makeFakeUser()
    }
  }

  return new AddUserStub()
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
  addUserStub: AddUser
  authenticateUserStub: AuthenticateUser
  sut: SignUpController
}

const makeSut = (): SutTypes => {
  const validatorStub = makeValidator()
  const addUserStub = makeAddUser()
  const authenticateUserStub = makeAuthenticateUser()
  const sut = new SignUpController(validatorStub, addUserStub, authenticateUserStub)

  return {
    validatorStub,
    addUserStub,
    authenticateUserStub,
    sut
  }
}

describe('SignUp Controller', () => {
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

  test('Should call AddUser with correct values', async () => {
    const { sut, addUserStub } = makeSut()
    const addSpy = jest.spyOn(addUserStub, 'add')

    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)

    expect(addSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return an internal server error if AddUser throws', async () => {
    const { sut, addUserStub } = makeSut()
    jest.spyOn(addUserStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(serverError())
  })

  test('Should return a conflict error if AddUser returns null', async () => {
    const { sut, addUserStub } = makeSut()
    jest.spyOn(addUserStub, 'add').mockReturnValueOnce(null)

    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(conflict(new DuplicateEmailError()))
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

  test('Should return an ok response on success', async () => {
    const { sut } = makeSut()

    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(ok({
      user: 'valid_name',
      accessToken: 'any_token'
    }))
  })
})
