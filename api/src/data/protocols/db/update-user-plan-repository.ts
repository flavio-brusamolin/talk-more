import { SubscribePlanModel } from '../../../domain/use-cases/subscribe-plan'
import { User } from '../../../domain/models/user'

export interface UpdateUserPlanRepository {
  updatePlan: (subscriptionData: SubscribePlanModel) => Promise<User>
}
