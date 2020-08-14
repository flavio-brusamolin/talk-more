import { SignUpController, SignUpModel } from './signup-controller'
import { Validator, HttpRequest } from '../../protocols'
import { MissingParamError } from '../../errors'
import { badRequest, serverError } from '../../helpers/http-helper'
import { AddUser, AddUserModel } from '../../../domain/use-cases/add-user'
import { User } from '../../../domain/models/user'

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

interface SutTypes {
  validatorStub: Validator
  addUserStub: AddUser
  sut: SignUpController
}

const makeSut = (): SutTypes => {
  const validatorStub = makeValidator()
  const addUserStub = makeAddUser()
  const sut = new SignUpController(validatorStub, addUserStub)

  return {
    validatorStub,
    addUserStub,
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
})
