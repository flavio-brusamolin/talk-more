import { Controller, HttpResponse, HttpRequest } from '../../protocols'
import { LoadUserById } from '../../../domain/use-cases/load-user-by-id'

export class MeController implements Controller {
  public constructor (private readonly loadUserById: LoadUserById) {}

  public async handle (httpRequest: HttpRequest<any>): Promise<HttpResponse> {
    const { userId } = httpRequest
    await this.loadUserById.loadById(userId)

    return null
  }
}
