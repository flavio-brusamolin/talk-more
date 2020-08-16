import { Controller, HttpResponse, HttpRequest } from '../../protocols'
import { LoadUserById } from '../../../domain/use-cases/load-user-by-id'
import { serverError } from '../../helpers/http-helper'

export class MeController implements Controller {
  public constructor (private readonly loadUserById: LoadUserById) {}

  public async handle (httpRequest: HttpRequest<any>): Promise<HttpResponse> {
    try {
      const { userId } = httpRequest
      await this.loadUserById.loadById(userId)

      return null
    } catch (error) {
      console.error(error)
      return serverError()
    }
  }
}
