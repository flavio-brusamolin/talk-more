import { SignUpController, SignUpModel } from './signup-controller'
import { Validator, HttpRequest } from '../../protocols'

const makeFakeRequest = (): HttpRequest<SignUpModel> => ({
  body: {
    name: 'any_name',
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
  sut: SignUpController
}

const makeSut = (): SutTypes => {
  const validatorStub = makeValidator()
  const sut = new SignUpController(validatorStub)

  return {
    validatorStub,
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
})
