import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { RegisterDTO } from '~/models/schemas/dto/user.dto'
import userService from '~/services/user.service'
export const registerController = async (req: Request<ParamsDictionary, any, RegisterDTO>, res: Response) => {
  try {
    const result = await userService.register(req.body)
    return res.status(200).send({
      message: 'Register successfully',
      result
    })
  } catch (err) {
    console.log('err', err)
    return res.status(400).send({
      error: err
    })
  }
}
