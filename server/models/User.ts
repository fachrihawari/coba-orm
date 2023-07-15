import { Model } from './Model'

export interface IUser {
  email: string
  password: string
  age?: number
}

export const User = new (class User extends Model<IUser> {
  protected table = 'users'

  protected attributes = ['email', 'password', 'age']
})()
