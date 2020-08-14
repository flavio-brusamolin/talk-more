import { AddUser, AddUserModel } from '../../../domain/use-cases/add-user'
import { User } from '../../../domain/models/user'
import { Hasher, AddUserRepository } from '../../protocols'

export class DbAddUser implements AddUser {
  public constructor (
    private readonly hasher: Hasher,
    private readonly addUserRepository: AddUserRepository
  ) {}

  public async add (userData: AddUserModel): Promise<User> {
    const hashedPassword = await this.hasher.hash(userData.password)

    const user = await this.addUserRepository.add({
      ...userData,
      password: hashedPassword
    })

    return user
  }
}
