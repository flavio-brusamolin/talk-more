import { AddUserRepository, LoadUserByEmailRepository } from '../../../../data/protocols'
import { AddUserModel } from '../../../../domain/use-cases/add-user'
import { User } from '../../../../domain/models/user'
import { MongoHelper } from '../helpers/mongo-helper'

export class UserMongoRepository implements AddUserRepository, LoadUserByEmailRepository {
  public async loadByEmail (email: string): Promise<User> {
    const userCollection = await MongoHelper.getCollection('users')

    const userRecord = await userCollection.findOne({ email })

    return userRecord && MongoHelper.map(userRecord)
  }

  public async add (userData: AddUserModel): Promise<User> {
    const userCollection = await MongoHelper.getCollection('users')

    const result = await userCollection.insertOne(userData)
    const [userRecord] = result.ops

    return MongoHelper.map(userRecord)
  }
}
