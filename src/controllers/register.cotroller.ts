import { Request, Response } from 'express'
import userService from '~/services/user.service'

export const registerController = async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    const result = await userService.register({ email, password })
    return res.status(200).send({
      message: 'Register successfully',
      result
    })
  } catch (err) {
    return res.status(400).send({
      error: err
    })
  }
}
