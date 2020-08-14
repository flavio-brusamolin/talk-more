import { AuthenticateUser, AuthenticateUserModel } from '../../../domain/use-cases/authenticate-user'
import { LoadUserByEmailRepository, HashComparator, Encrypter } from '../../protocols'

export class DbAuthenticateUser implements AuthenticateUser {
  public constructor (
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly hashComparator: HashComparator,
    private readonly encrypter: Encrypter
  ) {}

  public async authenticate (credentials: AuthenticateUserModel): Promise<string> {
    const user = await this.loadUserByEmailRepository.loadByEmail(credentials.email)
    if (!user) {
      return null
    }

    const passwordMatch = await this.hashComparator.compare(credentials.password, user.password)
    if (!passwordMatch) {
      return null
    }

    await this.encrypter.encrypt(user.id)
  }
}
