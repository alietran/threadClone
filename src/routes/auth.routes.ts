import express from 'express'
import {
  loginController,
  logOutController,
  registerController,
  resendVerifyEmailController,
  verifyEmailController
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

userRouter.post('/verify-email', emailTokenValidator, wrapRequestHandler(verifyEmailController))
userRouter.post('/resend-verify-email', accessTokenValidator, wrapRequestHandler(resendVerifyEmailController))
export default userRouter
