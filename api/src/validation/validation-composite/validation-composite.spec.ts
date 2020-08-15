import { ValidationComposite } from './validation-composite'
import { Validator } from '../../presentation/protocols/validator'
import { MissingParamError } from '../../presentation/errors'

const makeValidator = (): Validator => {
  class ValidatorStub implements Validator {
    public validate (_input: any): Error {
      return null
    }
  }

  return new ValidatorStub()
}

interface SutTypes {
  validatorStubs: Validator[]
  sut: ValidationComposite
}

const makeSut = (): SutTypes => {
  const validatorStubs = [makeValidator(), makeValidator()]
  const sut = new ValidationComposite(validatorStubs)

  return {
    validatorStubs,
    sut
  }
}

describe('Validation Composite', () => {
  test('Should return an error if any validator fails', () => {
    const { sut, validatorStubs } = makeSut()
    jest.spyOn(validatorStubs[0], 'validate').mockReturnValueOnce(new MissingParamError('field'))

    const error = sut.validate({
      any_field: 'any_value'
    })

    expect(error).toEqual(new MissingParamError('field'))
  })
})
