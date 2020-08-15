import { Validator } from '../../presentation/protocols'

export class ValidationComposite implements Validator {
  public constructor (private readonly validators: Validator[]) {}

  public validate (input: any): Error {
    for (const validator of this.validators) {
      const error = validator.validate(input)

      if (error) {
        return error
      }
    }
  }
}
