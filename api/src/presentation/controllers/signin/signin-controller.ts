import { Controller, HttpResponse, HttpRequest, Validator } from '../../protocols'
import { badRequest } from '../../helpers/http-helper'

export interface SignInModel {
  email: string
  password: string
}

export class SignInController implements Controller {
  public constructor (private readonly validator: Validator) {}

  public async handle (httpRequest: HttpRequest<SignInModel>): Promise<HttpResponse> {
    const error = this.validator.validate(httpRequest.body)

    return badRequest(error)
  }
}
