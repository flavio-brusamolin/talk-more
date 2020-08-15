import { EmailValidatorAdapter } from './email-validator-adapter'
import validator from 'validator'

const makeSut = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter()
}

describe('Email Validator Adapter', () => {
  test('Should call validator isEmail with correct value', () => {
    const sut = makeSut()
    const isEmailSpy = jest.spyOn(validator, 'isEmail')

    sut.isValid('any_email@mail.com')

    expect(isEmailSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('Should throw if validator isEmail throws', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isEmail').mockImplementationOnce(() => {
      throw new Error()
    })

    expect(sut.isValid).toThrow()
  })
})
