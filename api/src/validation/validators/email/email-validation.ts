import { Validator } from '../../../presentation/protocols'
import { EmailValidator } from '../../protocols/email-validator'
import { InvalidParamError } from '../../../presentation/errors'

export class EmailValidation implements Validator {
  public constructor (
    private readonly field: string,
    private readonly emailValidator: EmailValidator
  ) {}

  public validate (input: any): Error {
    if (!this.emailValidator.isValid(input[this.field])) {
      return new InvalidParamError(this.field)
    }
  }
}
