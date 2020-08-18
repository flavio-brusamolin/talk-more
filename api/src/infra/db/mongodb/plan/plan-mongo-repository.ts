import { LoadPlansRepository, LoadPlanByIdRepository } from '../../../../data/protocols'
import { Plan } from '../../../../domain/models/plan'
import { MongoHelper } from '../helpers/mongo-helper'
import { ObjectId } from 'mongodb'

export class PlanMongoRepository implements LoadPlansRepository, LoadPlanByIdRepository {
  public async loadAll (): Promise<Plan[]> {
    const planCollection = await MongoHelper.getCollection('plans')
    const planRecords = await planCollection.find().toArray()
    return MongoHelper.mapArray(planRecords)
  }

  public async loadById (id: string): Promise<Plan> {
    const planCollection = await MongoHelper.getCollection('plans')
    const planRecord = await planCollection.findOne({ _id: new ObjectId(id) })
    return MongoHelper.map(planRecord)
  }
}
