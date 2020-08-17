import { Middleware } from '../protocols/middleware'
import { HttpRequest, HttpResponse } from '../protocols'
import { CheckUserAuthentication } from '../../domain/use-cases/check-user-authentication'

export class AuthMiddleware implements Middleware {
  public constructor (private readonly checkUserAuthentication: CheckUserAuthentication) {}

  public async handle (httpRequest: HttpRequest<any>): Promise<HttpResponse> {
    const accessToken = httpRequest.headers?.authorization
    await this.checkUserAuthentication.checkAuthentication(accessToken)

    return null
  }
}
