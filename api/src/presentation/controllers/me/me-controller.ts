import { Controller, HttpResponse, HttpRequest } from '../../protocols'
import { LoadUserById } from '../../../domain/use-cases/load-user-by-id'
import { serverError, ok, forbidden } from '../../helpers/http-helper'
import { InvalidParamError } from '../../errors'

export class MeController implements Controller {
  public constructor (private readonly loadUserById: LoadUserById) {}

  public async handle (httpRequest: HttpRequest<any>): Promise<HttpResponse> {
    try {
      const { userId } = httpRequest

      const user = await this.loadUserById.loadById(userId)
      if (!user) {
        return forbidden(new InvalidParamError('userId'))
      }

      return ok(user)
    } catch (error) {
      console.error(error)
      return serverError()
    }
  }
}
