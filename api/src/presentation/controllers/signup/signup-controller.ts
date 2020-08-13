import { HttpRequest, HttpResponse } from '../../protocols'
import { Validator } from '../../protocols/validator'

export interface SignUpModel {
  name: string
  email: string
  password: string
}

export class SignUpController {
  public constructor (private readonly validator: Validator) {}

  public async handle (httpRequest: HttpRequest<SignUpModel>): Promise<HttpResponse> {
    this.validator.validate(httpRequest.body)

    return null
  }
}
