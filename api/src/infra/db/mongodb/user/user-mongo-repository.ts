import { AddUserRepository, LoadUserByEmailRepository, LoadUserByIdRepository, UpdateUserPlanRepository } from '../../../../data/protocols'
import { AddUserModel } from '../../../../domain/use-cases/add-user'
import { User } from '../../../../domain/models/user'
import { MongoHelper } from '../helpers/mongo-helper'
import { ObjectId } from 'mongodb'
import { SubscribePlanModel } from '../../../../domain/use-cases/subscribe-plan'

export class UserMongoRepository implements AddUserRepository, LoadUserByEmailRepository, LoadUserByIdRepository, UpdateUserPlanRepository {
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

  public async loadById (id: string): Promise<User> {
    const userCollection = await MongoHelper.getCollection('users')
    const userRecord = await userCollection.findOne({ _id: new ObjectId(id) })
    return userRecord && MongoHelper.map(userRecord)
  }

  public async updatePlan ({ userId, planId }: SubscribePlanModel): Promise<User> {
    const userCollection = await MongoHelper.getCollection('users')

    const userRecord = await userCollection.findOneAndUpdate(
      { _id: userId },
      { $set: { planId: planId } },
      { returnOriginal: false }
    )

    return MongoHelper.map(userRecord.value)
  }
}
