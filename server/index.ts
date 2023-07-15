import { User } from "./models/User"

const users = User.findAll()
console.log({users})

const user = User.findOne({
  where: 'id = 2'
})
console.log({ user })

const userById = User.findById(1)
console.log({ userById })

User.create({
  email: "azizah@gmail.com" + Date.now().toString(),
  password: "123123"
})

const newUsers = User.findAll()
console.log({newUsers})

User.delete({
  where: 'id > 2'
})
