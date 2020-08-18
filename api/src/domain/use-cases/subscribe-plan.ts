import { User } from '../models/user'

export interface SubscribePlanModel {
  userId: string
  planId: string
}

export interface SubscribePlan {
  subscribe: (subscriptionData: SubscribePlanModel) => Promise<User>
}
