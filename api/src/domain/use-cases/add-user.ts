import { User } from '../models/user'

export type AddUserModel = Omit<User, 'id'>

export interface AddUser {
  add: (user: AddUserModel) => Promise<User>
}
