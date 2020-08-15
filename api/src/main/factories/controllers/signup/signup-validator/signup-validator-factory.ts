import { Validator } from '../../../../../presentation/protocols'
import { ValidationComposite } from '../../../../../validation/validation-composite/validation-composite'
import { RequiredFieldValidation } from '../../../../../validation/validators/required-field/required-field-validation'
import { EmailValidation } from '../../../../../validation/validators/email/email-validation'
import { EmailValidatorAdapter } from '../../../../../infra/validators/email-validator-adapter'

export const makeSignUpValidator = (): ValidationComposite => {
  const validations: Validator[] = []

  const requiredFields = ['name', 'email', 'password']
  for (const field of requiredFields) {
    validations.push(new RequiredFieldValidation(field))
  }

  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))

  return new ValidationComposite(validations)
}
