export interface SubscribePlanModel {
  userId: string
  planId: string
}

export interface SubscribePlan {
  subscribe: (subscriptionData: SubscribePlanModel) => Promise<void>
}
