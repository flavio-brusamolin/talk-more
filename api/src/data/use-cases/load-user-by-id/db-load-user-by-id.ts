import { LoadUserById } from '../../../domain/use-cases/load-user-by-id'
import { User } from '../../../domain/models/user'
import { LoadUserByIdRepository } from '../../protocols'

export class DbLoadUserById implements LoadUserById {
  public constructor (private readonly loadUserByIdRepository: LoadUserByIdRepository) {}

  public async loadById (id: string): Promise<User> {
    return await this.loadUserByIdRepository.loadById(id)
  }
}
