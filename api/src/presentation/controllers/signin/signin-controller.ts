import { Controller, HttpResponse, HttpRequest, Validator } from '../../protocols'
import { badRequest, serverError, unauthorized, ok } from '../../helpers/http-helper'
import { AuthenticateUser } from '../../../domain/use-cases/authenticate-user'

export interface SignInModel {
  email: string
  password: string
}

export class SignInController implements Controller {
  public constructor (
    private readonly validator: Validator,
    private readonly authenticateUser: AuthenticateUser
  ) {}

  public async handle (httpRequest: HttpRequest<SignInModel>): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { email, password } = httpRequest.body

      const accessToken = await this.authenticateUser.authenticate({
        email,
        password
      })
      if (!accessToken) {
        return unauthorized()
      }

      return ok({ accessToken })
    } catch (error) {
      console.error(error)
      return serverError()
    }
  }
}
