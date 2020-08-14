import { HttpRequest, HttpResponse, Validator } from '../../protocols'
import { badRequest, serverError, conflict } from '../../helpers/http-helper'
import { AddUser } from '../../../domain/use-cases/add-user'
import { DuplicateEmailError } from '../../errors'

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
    try {
      const error = this.validator.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      await this.addUser.add(httpRequest.body)
      return conflict(new DuplicateEmailError())
    } catch (error) {
      return serverError()
    }
  }
}
