import { EmailValidation } from './email-validation'
import { EmailValidator } from '../../protocols/email-validator'

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    public isValid (_email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

interface SutTypes {
  emailValidatorStub: EmailValidator
  sut: EmailValidation
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const sut = new EmailValidation('email', emailValidatorStub)

  return {
    emailValidatorStub,
    sut
  }
}

describe('Email Validation', () => {
  test('Should call EmailValidator with correct value', () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')

    sut.validate({
      email: 'any_email@mail.com'
    })

    expect(isValidSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
