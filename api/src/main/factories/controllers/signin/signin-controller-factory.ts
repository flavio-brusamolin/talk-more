import { SignInController } from '../../../../presentation/controllers/signin/signin-controller'
import { makeSignInValidator } from './signin-validator/signin-validator-factory'
import { makeDbAuthenticateUser } from '../../use-cases/authenticate-user/db-authenticate-user'

export const makeSignInController = (): SignInController => {
  return new SignInController(makeSignInValidator(), makeDbAuthenticateUser())
}
