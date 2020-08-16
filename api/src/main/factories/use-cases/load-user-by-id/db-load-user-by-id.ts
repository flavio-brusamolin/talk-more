import { DbLoadUserById } from '../../../../data/use-cases/load-user-by-id/db-load-user-by-id'
import { UserMongoRepository } from '../../../../infra/db/mongodb/user/user-mongo-repository'

export const makeDbLoadUserById = (): DbLoadUserById => {
  return new DbLoadUserById(new UserMongoRepository())
}
