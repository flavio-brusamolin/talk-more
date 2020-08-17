import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { LoadPlans } from '../../../domain/use-cases/load-plans'

export class LoadPlansController implements Controller {
  public constructor (private readonly loadPlans: LoadPlans) {}

  public async handle (_httpRequest: HttpRequest<any>): Promise<HttpResponse> {
    await this.loadPlans.load()

    return null
  }
}
