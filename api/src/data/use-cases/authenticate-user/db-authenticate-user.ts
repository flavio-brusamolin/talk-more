import { AuthenticateUser, AuthenticateUserModel } from '../../../domain/use-cases/authenticate-user'
import { LoadUserByEmailRepository } from '../../protocols'

export class DbAuthenticateUser implements AuthenticateUser {
  public constructor (private readonly loadUserByEmailRepository: LoadUserByEmailRepository) {}

  public async authenticate (credentials: AuthenticateUserModel): Promise<string> {
    await this.loadUserByEmailRepository.loadByEmail(credentials.email)

    return null
  }
}
