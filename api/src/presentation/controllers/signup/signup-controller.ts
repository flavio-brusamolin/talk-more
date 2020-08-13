import { HttpRequest, HttpResponse, Validator } from '../../protocols'
import { badRequest } from '../../helpers/http-helper'

export interface SignUpModel {
  name: string
  email: string
  password: string
}

export class SignUpController {
  public constructor (private readonly validator: Validator) {}

  public async handle (httpRequest: HttpRequest<SignUpModel>): Promise<HttpResponse> {
    const error = this.validator.validate(httpRequest.body)

    return badRequest(error)
  }
}
