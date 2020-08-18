import { Controller, HttpResponse, HttpRequest, Validator } from '../../protocols'

export interface CreateContractModel {
  planId: string
}

export class CreateContractController implements Controller {
  public constructor (private readonly validator: Validator) {}

  public async handle (httpRequest: HttpRequest<CreateContractModel>): Promise<HttpResponse> {
    this.validator.validate(httpRequest.body)

    return null
  }
}
