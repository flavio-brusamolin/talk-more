import { LoadPlansController } from '../../../../presentation/controllers/load-plans/load-plans-controller'
import { makeDbLoadPlans } from '../../use-cases/load-plans/db-load-plans'

export const makeLoadPlansController = (): LoadPlansController => {
  return new LoadPlansController(makeDbLoadPlans())
}
