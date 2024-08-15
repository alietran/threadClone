import express from 'express'
import {
  forgotPasswordController,
  loginController,
  logOutController,
  registerController,
  resendVerifyEmailController,
  verifyEmailController,
  verifyForgotPassController
} from '~/controllers/auth.controller'
import {
  accessTokenValidator,
  emailTokenValidator,
  forgotPasswordValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator,
  verifyForgotPasswordTokenValidator
} from '~/middlewares/auth.middleware'
import { wrapRequestHandler } from '~/utils/handlers'
const authRouter = express()

authRouter.post('/login', loginValidator, wrapRequestHandler(loginController))
authRouter.post('/register', registerValidator, wrapRequestHandler(registerController))
authRouter.post('/logout', accessTokenValidator, refreshTokenValidator, wrapRequestHandler(logOutController))

authRouter.post('/verify-email', emailTokenValidator, wrapRequestHandler(verifyEmailController))
authRouter.post('/resend-verify-email', accessTokenValidator, wrapRequestHandler(resendVerifyEmailController))

authRouter.post('/forgot-password', forgotPasswordValidator, wrapRequestHandler(forgotPasswordController))
authRouter.post(
  '/verify-forgot-password-token',
  verifyForgotPasswordTokenValidator,
  wrapRequestHandler(verifyForgotPassController)
)

export default authRouter
