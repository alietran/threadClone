import express from 'express'
import { registerController } from '~/controllers/register.cotroller'
import { loginController } from '~/controllers/user.controller'
import { loginValidator } from '~/middlewares/users.middleware'
const userRouter = express()

userRouter.post('/login', loginValidator, loginController)
userRouter.post('/register', registerController)

export default userRouter
