import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { RegisterDTO } from '~/models/dto/user.dto'
export const registerController = async (
  req: Request<ParamsDictionary, any, RegisterDTO>,
  res: Response,
  next: NextFunction
) => {
  throw new Error('Lỗi rồi')
  // const result = await userService.register(req.body)
  // return res.status(200).send({
  //   message: 'Register successfully',
  //   result
  // })
}
