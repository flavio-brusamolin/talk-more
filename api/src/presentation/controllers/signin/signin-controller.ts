import { Controller, HttpResponse, HttpRequest, Validator } from '../../protocols'

export interface SignInModel {
  email: string
  password: string
}

export class SignInController implements Controller {
  public constructor (private readonly validator: Validator) {}

  public async handle (httpRequest: HttpRequest<SignInModel>): Promise<HttpResponse> {
    this.validator.validate(httpRequest.body)

    return null
  }
}
