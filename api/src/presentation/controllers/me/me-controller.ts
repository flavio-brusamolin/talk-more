import { Controller, HttpResponse, HttpRequest } from '../../protocols'
import { LoadUserById } from '../../../domain/use-cases/load-user-by-id'
import { serverError, ok } from '../../helpers/http-helper'

export class MeController implements Controller {
  public constructor (private readonly loadUserById: LoadUserById) {}

  public async handle (httpRequest: HttpRequest<any>): Promise<HttpResponse> {
    try {
      const user = await this.loadUserById.loadById(httpRequest.userId)
      return ok(user)
    } catch (error) {
      console.error(error)
      return serverError()
    }
  }
}
