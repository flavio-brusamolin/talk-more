import { User } from '../models/user'

export interface LoadUserById {
  loadById: (id: string) => Promise<User>
}
