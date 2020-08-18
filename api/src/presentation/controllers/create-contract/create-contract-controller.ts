import { Controller, HttpResponse, HttpRequest, Validator } from '../../protocols'
import { badRequest, serverError, ok } from '../../helpers/http-helper'
import { SubscribePlan } from '../../../domain/use-cases/subscribe-plan'
import { InvalidParamError } from '../../errors'

export interface CreateContractModel {
  planId: string
}

export class CreateContractController implements Controller {
  public constructor (
    private readonly validator: Validator,
    private readonly subscribePlan: SubscribePlan
  ) {}

  public async handle (httpRequest: HttpRequest<CreateContractModel>): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { userId } = httpRequest
      const { planId } = httpRequest.body

      const user = await this.subscribePlan.subscribe({
        userId,
        planId
      })
      if (!user) {
        return badRequest(new InvalidParamError('planId'))
      }

      return ok(user)
    } catch (error) {
      console.error(error)
      return serverError()
    }
  }
}
