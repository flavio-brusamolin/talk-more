import { LoadPlansRepository } from '../../../../data/protocols'
import { Plan } from '../../../../domain/models/plan'
import { MongoHelper } from '../helpers/mongo-helper'

export class PlanMongoRepository implements LoadPlansRepository {
  public async loadAll (): Promise<Plan[]> {
    const planCollection = await MongoHelper.getCollection('plans')
    const planRecords = await planCollection.find().toArray()
    return MongoHelper.mapArray(planRecords)
  }
}
