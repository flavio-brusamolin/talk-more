import { AddUser, AddUserModel } from '../../../domain/use-cases/add-user'
import { User } from '../../../domain/models/user'
import { LoadUserByEmailRepository, Hasher, AddUserRepository } from '../../protocols'

export class DbAddUser implements AddUser {
  public constructor (
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly hasher: Hasher,
    private readonly addUserRepository: AddUserRepository
  ) {}

  public async add (userData: AddUserModel): Promise<User> {
    const user = await this.loadUserByEmailRepository.loadByEmail(userData.email)
    if (!user) {
      const hashedPassword = await this.hasher.hash(userData.password)

      const newUser = await this.addUserRepository.add({
        ...userData,
        password: hashedPassword
      })

      return newUser
    }

    return null
  }
}
