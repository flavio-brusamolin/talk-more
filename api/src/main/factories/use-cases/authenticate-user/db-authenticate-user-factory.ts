import { DbAuthenticateUser } from '../../../../data/use-cases/authenticate-user/db-authenticate-user'
import { UserMongoRepository } from '../../../../infra/db/mongodb/user/user-mongo-repository'
import { BCryptAdapter } from '../../../../infra/criptography/bcrypt/bcrypt-adapter'
import { JwtAdapter } from '../../../../infra/criptography/jwt/jwt-adapter'
import env from '../../../config/env'

export const makeDbAuthenticateUser = (): DbAuthenticateUser => {
  const userMongoRepository = new UserMongoRepository()

  const salt = 12
  const bCryptAdapter = new BCryptAdapter(salt)

  const expiresIn = 43200
  const jwtAdapter = new JwtAdapter(env.jwtSecret, expiresIn)

  return new DbAuthenticateUser(userMongoRepository, bCryptAdapter, jwtAdapter)
}
