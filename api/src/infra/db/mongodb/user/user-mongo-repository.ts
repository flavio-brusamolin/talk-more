import { AddUserRepository } from '../../../../data/protocols'
import { AddUserModel } from '../../../../domain/use-cases/add-user'
import { User } from '../../../../domain/models/user'
import { MongoHelper } from '../helpers/mongo-helper'

export class UserMongoRepository implements AddUserRepository {
  public async add (userData: AddUserModel): Promise<User> {
    const userCollection = await MongoHelper.getCollection('users')

    const result = await userCollection.insertOne(userData)
    const [userRecord] = result.ops

    return MongoHelper.map(userRecord)
  }
}
