import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { LoadPlans } from '../../../domain/use-cases/load-plans'
import { serverError } from '../../helpers/http-helper'

export class LoadPlansController implements Controller {
  public constructor (private readonly loadPlans: LoadPlans) {}

  public async handle (_httpRequest: HttpRequest<any>): Promise<HttpResponse> {
    try {
      await this.loadPlans.load()

      return null
    } catch (error) {
      console.error(error)
      return serverError()
    }
  }
}
