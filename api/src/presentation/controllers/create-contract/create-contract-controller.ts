import { Controller, HttpResponse, HttpRequest, Validator } from '../../protocols'
import { badRequest } from '../../helpers/http-helper'
import { SubscribePlan } from '../../../domain/use-cases/subscribe-plan'

export interface CreateContractModel {
  planId: string
}

export class CreateContractController implements Controller {
  public constructor (
    private readonly validator: Validator,
    private readonly subscribePlan: SubscribePlan
  ) {}

  public async handle (httpRequest: HttpRequest<CreateContractModel>): Promise<HttpResponse> {
    const error = this.validator.validate(httpRequest.body)

    const { userId } = httpRequest
    const { planId } = httpRequest.body

    await this.subscribePlan.subscribe({
      userId,
      planId
    })

    return badRequest(error)
  }
}
