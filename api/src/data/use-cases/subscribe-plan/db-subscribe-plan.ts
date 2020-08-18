import { SubscribePlan, SubscribePlanModel } from '../../../domain/use-cases/subscribe-plan'
import { User } from '../../../domain/models/user'
import { LoadPlanByIdRepository } from '../../protocols'

export class DbSubscribePlan implements SubscribePlan {
  public constructor (private readonly loadPlanByIdRepository: LoadPlanByIdRepository) {}

  public async subscribe (subscriptionData: SubscribePlanModel): Promise<User> {
    await this.loadPlanByIdRepository.loadById(subscriptionData.planId)

    return null
  }
}
