import { SignInController, SignInModel } from './signin-controller'
import { Validator, HttpRequest } from '../../protocols'
import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'

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

interface SutTypes {
  validatorStub: Validator
  sut: SignInController
}

const makeSut = (): SutTypes => {
  const validatorStub = makeValidator()
  const sut = new SignInController(validatorStub)

  return {
    validatorStub,
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
})
