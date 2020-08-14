import { AddUser, AddUserModel } from '../../../domain/use-cases/add-user'
import { User } from '../../../domain/models/user'
import { Hasher } from '../../protocols/hasher'

export class DbAddUser implements AddUser {
  public constructor (private readonly hasher: Hasher) {}

  public async add (user: AddUserModel): Promise<User> {
    await this.hasher.hash(user.password)

    return null
  }
}
