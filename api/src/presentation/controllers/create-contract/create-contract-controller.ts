import { Controller, HttpResponse, HttpRequest, Validator } from '../../protocols'
import { badRequest } from '../../helpers/http-helper'

export interface CreateContractModel {
  planId: string
}

export class CreateContractController implements Controller {
  public constructor (private readonly validator: Validator) {}

  public async handle (httpRequest: HttpRequest<CreateContractModel>): Promise<HttpResponse> {
    const error = this.validator.validate(httpRequest.body)
    return badRequest(error)
  }
}
