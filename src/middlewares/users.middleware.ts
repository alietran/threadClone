import { NextFunction, Request, Response } from 'express'
import { checkSchema } from 'express-validator'
import userService from '~/services/user.service'

export const loginValidator = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({
      error: 'Missing or invalid email'
    })
  }
  next()
}

export const registerValidator = checkSchema({
  name: {
    isLength: {
      options: { min: 1, max: 100 },
      errorMessage: 'Name should be max 100 chars'
    },
    trim: true,
    notEmpty: true
  },
  email: {
    errorMessage: 'Invalid email',
    isEmail: true,
    notEmpty: true,
    trim: true,
    custom: {
      options: async (value) => {
        const isExistEmail = await userService.emailExisted(value)
        if (isExistEmail) {
          throw new Error('Email already exists')
        }
        return isExistEmail
      }
    }
  },
  password: {
    isLength: {
      options: { min: 6 },
      errorMessage: 'Password should be at least 6 chars'
    },
    notEmpty: true,
    isStrongPassword: {
      errorMessage:
        'Password must be at least 6 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol',
      options: {
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minSymbols: 1,
        minNumbers: 1
      }
    }
  },
  confirm_password: {
    isLength: {
      options: { min: 6 },
      errorMessage: 'Confirm password should be at least 6 chars'
    },
    notEmpty: true,

    isStrongPassword: {
      errorMessage:
        'Password must be at least 6 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol',
      options: {
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minSymbols: 1,
        minNumbers: 1
      }
    },
    custom: {
      options: (value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Password confirmation does not match password')
        }
        return true
      }
    }
  },
  date_of_birth: {
    isISO8601: {
      options: {
        strict: true,
        strictSeparator: true
      }
    }
  }
})
