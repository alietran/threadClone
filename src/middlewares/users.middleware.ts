import { NextFunction, Request, Response } from 'express'
import { checkSchema } from 'express-validator'
import userService from '~/services/user.service'
import { USER_MESSAGE } from './../constants/messages'

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
      errorMessage: USER_MESSAGE.CONFIRM_PASSWORD_LENGTH
    },
    isString: {
      errorMessage: USER_MESSAGE.NAME_MUST_BE_A_STRING
    },
    trim: true,
    notEmpty: {
      errorMessage: USER_MESSAGE.NAME_IS_REQUIRED
    }
  },
  email: {
    isEmail: {
      errorMessage: USER_MESSAGE.EMAIL_IS_INVALID
    },
    notEmpty: {
      errorMessage: USER_MESSAGE.EMAIL_IS_REQUIRED
    },
    trim: true,
    custom: {
      options: async (value) => {
        const isExistEmail = await userService.emailExisted(value)
        if (isExistEmail) {
          throw new Error(USER_MESSAGE.EMAIL_ALREADY_EXIST)
        }
        return true
      }
    }
  },
  password: {
    isLength: {
      options: { min: 6 },
      errorMessage: USER_MESSAGE.PASSWORD_LENGTH
    },
    notEmpty: true,
    isStrongPassword: {
      errorMessage: USER_MESSAGE.PASSWORD_MUST_BE_STRONG,
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
      errorMessage: USER_MESSAGE.PASSWORD_LENGTH
    },
    notEmpty: true,

    isStrongPassword: {
      errorMessage: USER_MESSAGE.PASSWORD_MUST_BE_STRONG,
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
          throw new Error(USER_MESSAGE.CONFIRM_PASSWORD_NOT_MATCH)
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
      },
      errorMessage: USER_MESSAGE.DATE_OF_BIRTH_MUST_BE_ISO8601
    }
  }
})
