import { CreateContractController, CreateContractModel } from './create-contract-controller'
import { HttpRequest, Validator } from '../../protocols'

const makeFakeRequest = (): HttpRequest<CreateContractModel> => ({
  body: {
    planId: 'any_id'
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
  sut: CreateContractController
}

const makeSut = (): SutTypes => {
  const validatorStub = makeValidator()
  const sut = new CreateContractController(validatorStub)

  return {
    validatorStub,
    sut
  }
}

describe('CreateContract Controller', () => {
  test('Should call Validator with correct value', async () => {
    const { sut, validatorStub } = makeSut()
    const validateSpy = jest.spyOn(validatorStub, 'validate')

    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)

    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })
})
