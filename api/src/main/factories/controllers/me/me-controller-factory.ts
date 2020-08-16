import { MeController } from '../../../../presentation/controllers/me/me-controller'
import { makeDbLoadUserById } from '../../use-cases/load-user-by-id/db-load-user-by-id'

export const makeMeController = (): MeController => {
  return new MeController(makeDbLoadUserById())
}
