import { SignUpController } from '../../../../presentation/controllers/signup/signup-controller'
import { makeSignUpValidator } from './signup-validator/signup-validator-factory'
import { makeDbAddUser } from '../../use-cases/add-user/db-add-user-factory'
import { makeDbAuthenticateUser } from '../../use-cases/authenticate-user/db-authenticate-user-factory'

export const makeSignUpController = (): SignUpController => {
  return new SignUpController(makeSignUpValidator(), makeDbAddUser(), makeDbAuthenticateUser())
}
