import { User } from '../models/user'

export type AddUserModel = Omit<User, 'id'>

export interface AddUser {
  add: (userData: AddUserModel) => Promise<User>
}
