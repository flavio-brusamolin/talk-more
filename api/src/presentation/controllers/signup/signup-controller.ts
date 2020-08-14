import { HttpRequest, HttpResponse, Validator } from '../../protocols'
import { badRequest, serverError, conflict } from '../../helpers/http-helper'
import { AddUser } from '../../../domain/use-cases/add-user'
import { DuplicateEmailError } from '../../errors'
import { AuthenticateUser } from '../../../domain/use-cases/authenticate-user'

export interface SignUpModel {
  name: string
  email: string
  password: string
}

export class SignUpController {
  public constructor (
    private readonly validator: Validator,
    private readonly addUser: AddUser,
    private readonly authenticateUser: AuthenticateUser
  ) {}

  public async handle (httpRequest: HttpRequest<SignUpModel>): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { name, email, password } = httpRequest.body

      await this.addUser.add({
        name,
        email,
        password
      })

      await this.authenticateUser.authenticate({
        email,
        password
      })

      return conflict(new DuplicateEmailError())
    } catch (error) {
      return serverError()
    }
  }
}
