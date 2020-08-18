import { DbSubscribePlan } from '../../../../data/use-cases/subscribe-plan/db-subscribe-plan'
import { PlanMongoRepository } from '../../../../infra/db/mongodb/plan/plan-mongo-repository'
import { UserMongoRepository } from '../../../../infra/db/mongodb/user/user-mongo-repository'

export const makeDbSubscribePlan = (): DbSubscribePlan => {
  return new DbSubscribePlan(new PlanMongoRepository(), new UserMongoRepository())
}
