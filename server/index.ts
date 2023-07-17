import { IUser, User } from './models/user'

const users = User.findAll()
console.log({ users })

const user = User.findOne({
  where: 'id = 2',
})
console.log({ user })

const userById = User.findById(1)
console.log({ userById })

const newUser: IUser = {
  email: 'azizah@gmail.com' + Date.now().toString(),
  password: '123123',
}
User.create(newUser)

const newUsers = User.findAll()
console.log({ newUsers })

User.delete({
  where: 'id > 2',
})
