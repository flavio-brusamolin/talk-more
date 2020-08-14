import { AddUser, AddUserModel } from '../../../domain/use-cases/add-user'
import { User } from '../../../domain/models/user'
import { Hasher, AddUserRepository } from '../../protocols'

export class DbAddUser implements AddUser {
  public constructor (
    private readonly hasher: Hasher,
    private readonly addUserRepository: AddUserRepository
  ) {}

  public async add (user: AddUserModel): Promise<User> {
    const hashedPassword = await this.hasher.hash(user.password)

    await this.addUserRepository.add({
      ...user,
      password: hashedPassword
    })

    return null
  }
}
