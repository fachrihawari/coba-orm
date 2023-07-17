import { Model } from './model'

export interface IUser {
  id?: number
  email: string
  password: string
  role: 'admin' | 'user'
}

class UserModel extends Model<IUser> {
  protected table = 'users'

  protected attributes = ['email', 'password', 'role']
}

export const User = Object.freeze(new UserModel())
