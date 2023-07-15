import { Model } from './Model'

export interface IUser {
  email: String
  password: String
  age?: number
}

export const User = new class User extends Model<IUser> {

  protected table =  'users'

  protected attributes = ['email', 'password', 'age']

}
