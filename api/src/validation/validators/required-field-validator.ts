import { Validator } from '../../presentation/protocols'
import { MissingParamError } from '../../presentation/errors'

export class RequiredFieldValidator implements Validator {
  public constructor (private readonly field: string) {}

  public validate (_input: any): MissingParamError {
    return new MissingParamError(this.field)
  }
}
