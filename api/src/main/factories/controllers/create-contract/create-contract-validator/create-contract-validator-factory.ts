import { RequiredFieldValidation } from '../../../../../validation/validators'

export const makeCreateContractValidator = (): RequiredFieldValidation => {
  return new RequiredFieldValidation('planId')
}
