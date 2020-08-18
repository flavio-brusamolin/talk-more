import { Router } from 'express'
import { auth } from '../middlewares/auth'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeCreateContractController } from '../factories/controllers/create-contract/create-contract-controller-factory'

export default (router: Router): void => {
  router.post('/contract', auth, adaptRoute(makeCreateContractController()))
}
