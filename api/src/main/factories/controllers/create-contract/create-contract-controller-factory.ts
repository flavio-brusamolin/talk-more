import { CreateContractController } from '../../../../presentation/controllers/create-contract/create-contract-controller'
import { makeCreateContractValidator } from './create-contract-validator/create-contract-validator-factory'
import { makeDbSubscribePlan } from '../../use-cases/subscribe-plan/db-subscribe-plan-factory'

export const makeCreateContractController = (): CreateContractController => {
  return new CreateContractController(makeCreateContractValidator(), makeDbSubscribePlan())
}
