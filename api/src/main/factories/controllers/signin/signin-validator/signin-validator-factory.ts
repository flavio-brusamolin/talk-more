import { Validator } from '../../../../../presentation/protocols'
import { ValidationComposite } from '../../../../../validation/validation-composite/validation-composite'
import { RequiredFieldValidation, EmailValidation } from '../../../../../validation/validators'
import { EmailValidatorAdapter } from '../../../../../infra/validators/email-validator-adapter'

export const makeSignInValidator = (): ValidationComposite => {
  const validations: Validator[] = []

  const requiredFields = ['email', 'password']
  for (const field of requiredFields) {
    validations.push(new RequiredFieldValidation(field))
  }

  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))

  return new ValidationComposite(validations)
}
