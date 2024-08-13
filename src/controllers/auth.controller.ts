import { NextFunction, Request, Response } from 'express'
import { AUTH_MESSAGE } from '~/constant/message'
import authService from '~/services/auth.service'

export const registerController = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body)
  const result = await authService.register(req.body)
  return res.json({
    message: AUTH_MESSAGE.REGISTER_SUCCESS,
    result
  })
}
