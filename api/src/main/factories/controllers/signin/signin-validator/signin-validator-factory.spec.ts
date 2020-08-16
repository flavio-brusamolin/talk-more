import { makeSignInValidator } from './signin-validator-factory'
import { Validator } from '../../../../../presentation/protocols/validator'
import { ValidationComposite } from '../../../../../validation/validation-composite/validation-composite'
import { RequiredFieldValidation, EmailValidation } from '../../../../../validation/validators'
import { EmailValidator } from '../../../../../validation/protocols/email-validator'

jest.mock('../../../../../validation/validation-composite/validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    public isValid (_email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

describe('SignIn Validator Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSignInValidator()

    const validations: Validator[] = []

    const requiredFields = ['email', 'password']
    for (const field of requiredFields) {
      validations.push(new RequiredFieldValidation(field))
    }

    validations.push(new EmailValidation('email', makeEmailValidator()))

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
