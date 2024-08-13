import express from 'express'
import { ValidationChain, validationResult } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/lib/middlewares/schema'
import HTTP_STATUS from '~/constant/httpStatus'
import { EntityError, ErrorWithStatus } from '~/models/Errors'

// can be reused by many routes
export const validate = (validations: RunnableValidationChains<ValidationChain>) => {
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log('Request body:', req.body)
    // sequential processing, stops running validations chain if one fails.
    await validations.run(req)
    const errors = validationResult(req)
    // console.log(errors)
    // console.log(req)
    if (errors.isEmpty()) {
      return next()
    }

    const errorsObj = errors.mapped()
    const entityErr = new EntityError({ errors: {} })

    for (const key in errorsObj) {
      const { msg } = errorsObj[key]
      //Trả về lỗi kh phải do validate
      if (msg instanceof ErrorWithStatus && msg.status !== HTTP_STATUS.UNPROCESSABLE_ENTITY) {
        return next(msg)
      }
      entityErr.errors[key] = errorsObj[key]
    }

    next(entityErr)
  }
}
