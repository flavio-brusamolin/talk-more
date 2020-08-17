import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { LoadPlans } from '../../../domain/use-cases/load-plans'
import { serverError, ok } from '../../helpers/http-helper'

export class LoadPlansController implements Controller {
  public constructor (private readonly loadPlans: LoadPlans) {}

  public async handle (_httpRequest: HttpRequest<any>): Promise<HttpResponse> {
    try {
      const plans = await this.loadPlans.load()
      return ok(plans)
    } catch (error) {
      console.error(error)
      return serverError()
    }
  }
}
