import { User } from '../../../domain/models/user'

export interface LoadUserByIdRepository {
  loadById: (id: string) => Promise<User>
}
