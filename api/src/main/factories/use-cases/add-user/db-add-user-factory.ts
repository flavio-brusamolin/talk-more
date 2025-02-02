import { DbAddUser } from '../../../../data/use-cases/add-user/db-add-user'
import { UserMongoRepository } from '../../../../infra/db/mongodb/user/user-mongo-repository'
import { BCryptAdapter } from '../../../../infra/criptography/bcrypt/bcrypt-adapter'

export const makeDbAddUser = (): DbAddUser => {
  const userMongoRepository = new UserMongoRepository()

  const salt = 12
  const bCryptAdapter = new BCryptAdapter(salt)

  return new DbAddUser(userMongoRepository, bCryptAdapter, userMongoRepository)
}
