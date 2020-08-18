import { Middleware } from '../../../presentation/protocols'
import { AuthMiddleware } from '../../../presentation/middlewares/auth-middleware'
import { makeDbCheckUserAuthentication } from '../use-cases/check-user-authentication/db-check-user-authentication-factory'

export const makeAuthMiddleware = (): Middleware => {
  return new AuthMiddleware(makeDbCheckUserAuthentication())
}
