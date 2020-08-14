import { RequiredFieldValidator } from './required-field-validator'
import { MissingParamError } from '../../presentation/errors'

const makeSut = (): RequiredFieldValidator => {
  return new RequiredFieldValidator('field')
}

describe('RequiredField Validator', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const sut = makeSut()

    const error = sut.validate({
      any_field: 'any_value'
    })

    expect(error).toEqual(new MissingParamError('field'))
  })
})
