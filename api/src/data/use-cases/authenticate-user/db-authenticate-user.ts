import { AuthenticateUser, AuthenticateUserModel } from '../../../domain/use-cases/authenticate-user'
import { LoadUserByEmailRepository, HashComparator } from '../../protocols'

export class DbAuthenticateUser implements AuthenticateUser {
  public constructor (
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly hashComparator: HashComparator
  ) {}

  public async authenticate (credentials: AuthenticateUserModel): Promise<string> {
    const user = await this.loadUserByEmailRepository.loadByEmail(credentials.email)
    if (!user) {
      return null
    }

    await this.hashComparator.compare(credentials.password, user.password)
  }
}
