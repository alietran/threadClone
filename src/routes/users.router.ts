import express from 'express'
import { registerController } from '~/controllers/register.cotroller'
import { loginController } from '~/controllers/user.controller'
import { loginValidator, registerValidator } from '~/middlewares/users.middleware'
import { validate } from './../utils/validation'
const userRouter = express()

userRouter.post('/login', loginValidator, loginController)
userRouter.post('/register', validate(registerValidator), registerController)

export default userRouter
