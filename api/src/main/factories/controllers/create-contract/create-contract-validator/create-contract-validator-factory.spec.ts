import { makeCreateContractValidator } from './create-contract-validator-factory'
import { RequiredFieldValidation } from '../../../../../validation/validators'

describe('CreateContract Validator Factory', () => {
  test('Should return a RequiredFieldValidation', () => {
    const validator = makeCreateContractValidator()
    expect(validator).toEqual(new RequiredFieldValidation('planId'))
  })
})
