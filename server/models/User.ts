import { Model } from './Model'

export interface IUser {
  email: string
  password: string
  age?: number
}

class UserModel extends Model<IUser> {
  protected table = 'users'

  protected attributes = ['email', 'password', 'age']
}

export const User = Object.freeze(new UserModel())
