import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ObjectId } from 'mongodb'
import { USER_MESSAGE } from '~/constants/messages'
import { RegisterDTO } from '~/models/dto/user.dto'
import User from '~/models/schemas/User.schema'
import userService from '~/services/user.service'

export const loginController = async (req: Request, res: Response) => {
  console.log(req)
  const user = req.user as User
  const user_id = user._id as ObjectId
  const result = await userService.login(user_id.toString())
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
  const result = await userService.register(req.body)
  return res.json({
    message: USER_MESSAGE.REGISTER_SUCCESS,
    result
  })
}

export const logOutController = () => {}
