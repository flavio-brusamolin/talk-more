import { Router } from 'express'
import { auth } from '../middlewares/auth'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeMeController } from '../factories/controllers/me/me-controller-factory'

export default (router: Router): void => {
  router.get('/me', auth, adaptRoute(makeMeController()))
}
