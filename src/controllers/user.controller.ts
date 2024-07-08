import { Request, Response } from 'express'

export const loginController = (req: Request, res: Response) => {
  const { email, password } = req.body
  if (email === 'test@gmail.com' && password === '123') {
    return res.status(200).send({
      message: ' Login successful'
    })
  }
  return res.status(400).send({
    error: ' Login failed'
  })
}
