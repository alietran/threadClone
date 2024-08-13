import express from 'express'
import {
  emailVerifyValidator,
  loginController,
  logOutController,
  registerController
} from '~/controllers/auth.controller'
import {
  accessTokenValidator,
  emailTokenValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator
} from '~/middlewares/auth.middleware'
import { wrapRequestHandler } from '~/utils/handlers'
const userRouter = express()

userRouter.post('/login', loginValidator, wrapRequestHandler(loginController))
userRouter.post('/register', registerValidator, wrapRequestHandler(registerController))
userRouter.post('/logout', accessTokenValidator, refreshTokenValidator, wrapRequestHandler(logOutController))

userRouter.post('/verifyEmail', emailTokenValidator, wrapRequestHandler(emailVerifyValidator))
export default userRouter
