import { CheckUserAuthentication } from '../../../domain/use-cases/check-user-authentication'
import { Decrypter } from '../../protocols'

export class DbCheckUserAuthentication implements CheckUserAuthentication {
  public constructor (private readonly decrypter: Decrypter) {}

  public async checkAuthentication (token: string): Promise<string> {
    try {
      await this.decrypter.decrypt(token)
    } catch (error) {
      console.error(error)
      return null
    }
  }
}
