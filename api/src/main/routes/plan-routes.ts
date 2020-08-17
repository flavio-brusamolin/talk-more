import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeLoadPlansController } from '../factories/controllers/load-plans/load-plans-controller-factory'

export default (router: Router): void => {
  router.get('/plans', adaptRoute(makeLoadPlansController()))
}
