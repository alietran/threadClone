import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ObjectId } from 'mongodb'
import HTTP_STATUS from '~/constants/httpStatus'
import { USER_MESSAGE } from '~/constants/messages'
import { RegisterDTO } from '~/models/dto/auth.dto'
import User from '~/models/schemas/User.schema'
import authService from '~/services/auth.service'
import databaseService from '~/services/database.service'

export const loginController = async (req: Request, res: Response) => {
  const user = req.user as User
  const user_id = user._id as ObjectId
  const result = await authService.login(user_id.toString())
  return res.json({
    message: USER_MESSAGE.LOGIN_SUCCESS,
    result
  })
}

export const registerController = async (
  req: Request<ParamsDictionary, any, RegisterDTO>,
  res: Response,
  next: NextFunction
) => {
  const result = await authService.register(req.body)
  return res.json({
    message: USER_MESSAGE.REGISTER_SUCCESS,
    result
  })
}

export const logOutController = async (req: Request, res: Response) => {
  authService.logout(req.body.refresh_token)
  return res.json({
    message: USER_MESSAGE.LOGOUT_SUCCESS
  })
}

export const emailVerifyValidator = async (req: Request, res: Response, next: NextFunction) => {
  const { user_id } = req.decode_email_verify_token
  const user = await databaseService.users.findOne({ _id: new ObjectId(user_id) })

  if (!user) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      message: USER_MESSAGE.USER_NOT_FOUND
    })
  }

  if (user.email_verify_token === '') {
    return res.json({
      message: USER_MESSAGE.EMAIL_ALREADY_VERIFIED_BEFORE
    })
  }

  const result = await authService.verifyEmail(user_id)
  return res.json({
    message: USER_MESSAGE.EMAIL_VERIFY_SUCCESS,
    result
  })
}
