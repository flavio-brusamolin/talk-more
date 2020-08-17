import { DbLoadPlans } from '../../../../data/use-cases/load-plans/db-load-plans'
import { PlanMongoRepository } from '../../../../infra/db/mongodb/plan/plan-mongo-repository'

export const makeDbLoadPlans = (): DbLoadPlans => {
  return new DbLoadPlans(new PlanMongoRepository())
}
