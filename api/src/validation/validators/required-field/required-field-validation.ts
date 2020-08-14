import { Validator } from '../../../presentation/protocols'
import { MissingParamError } from '../../../presentation/errors'

export class RequiredFieldValidation implements Validator {
  public constructor (private readonly field: string) {}

  public validate (input: any): MissingParamError {
    if (!input[this.field]) {
      return new MissingParamError(this.field)
    }
  }
}
