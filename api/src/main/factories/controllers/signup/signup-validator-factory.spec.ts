import { makeSignUpValidator } from './signup-validator-factory'
import { Validator } from '../../../../presentation/protocols/validator'
import { ValidationComposite } from '../../../../validation/validation-composite/validation-composite'
import { RequiredFieldValidation } from '../../../../validation/validators/required-field/required-field-validation'
import { EmailValidation } from '../../../../validation/validators/email/email-validation'
import { EmailValidator } from '../../../../validation/protocols/email-validator'

jest.mock('../../../../validation/validation-composite/validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    public isValid (_email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

describe('SignUp Validator Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSignUpValidator()

    const validations: Validator[] = []

    const requiredFields = ['name', 'email', 'password']
    for (const field of requiredFields) {
      validations.push(new RequiredFieldValidation(field))
    }

    validations.push(new EmailValidation('email', makeEmailValidator()))

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
