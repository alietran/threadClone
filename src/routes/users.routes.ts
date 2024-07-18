import express from 'express'
import { registerController } from '~/controllers/register.cotroller'
import { loginController } from '~/controllers/user.controller'
import { loginValidator, registerValidator } from '~/middlewares/users.middleware'
import { wrapRequestHandler } from '~/utils/handlers'
import { validate } from '../utils/validation'
const userRouter = express()

userRouter.post('/login', loginValidator, loginController)
userRouter.post('/register', validate(registerValidator), wrapRequestHandler(registerController))

export default userRouter
