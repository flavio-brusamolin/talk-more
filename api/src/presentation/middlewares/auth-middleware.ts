import { Middleware } from '../protocols/middleware'
import { HttpRequest, HttpResponse } from '../protocols'
import { CheckUserAuthentication } from '../../domain/use-cases/check-user-authentication'
import { serverError, unauthorized, ok } from '../helpers/http-helper'

export class AuthMiddleware implements Middleware {
  public constructor (private readonly checkUserAuthentication: CheckUserAuthentication) {}

  public async handle (httpRequest: HttpRequest<any>): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers?.['x-access-token']
      if (!accessToken) {
        return unauthorized()
      }

      const userId = await this.checkUserAuthentication.checkAuthentication(accessToken)
      if (!userId) {
        return unauthorized()
      }

      return ok({ userId })
    } catch (error) {
      console.error(error)
      return serverError()
    }
  }
}
