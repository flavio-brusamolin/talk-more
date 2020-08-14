import { HttpRequest, HttpResponse, Validator } from '../../protocols'
import { badRequest } from '../../helpers/http-helper'
import { AddUser } from '../../../domain/use-cases/add-user'

export interface SignUpModel {
  name: string
  email: string
  password: string
}

export class SignUpController {
  public constructor (
    private readonly validator: Validator,
    private readonly addUser: AddUser
  ) {}

  public async handle (httpRequest: HttpRequest<SignUpModel>): Promise<HttpResponse> {
    const error = this.validator.validate(httpRequest.body)

    this.addUser.add(httpRequest.body)

    return badRequest(error)
  }
}
