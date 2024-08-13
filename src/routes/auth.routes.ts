import express from 'express'
import { registerController } from '~/controllers/auth.controller'
import { registerValidator } from '~/middlewares/auth.middleware'
import { wrapRequestHandler } from '~/utils/handlers'

const authRouter = express()

authRouter.post('/register', registerValidator, wrapRequestHandler(registerController))

export default authRouter
