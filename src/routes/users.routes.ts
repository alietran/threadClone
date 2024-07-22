import express from 'express'
import { loginController, registerController } from '~/controllers/user.controller'
import { accessTokenValidator, loginValidator, registerValidator } from '~/middlewares/users.middleware'
import { wrapRequestHandler } from '~/utils/handlers'
const userRouter = express()

userRouter.post('/login', loginValidator, wrapRequestHandler(loginController))
userRouter.post('/register', registerValidator, wrapRequestHandler(registerController))
userRouter.post(
  '/logout',
  accessTokenValidator,
  wrapRequestHandler((req, res) => {
    res.json({ message: 'Logout successfully' })
  })
)

export default userRouter
