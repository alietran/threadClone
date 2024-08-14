import { Request } from 'express'
import { checkSchema } from 'express-validator'
import { JsonWebTokenError } from 'jsonwebtoken'
import { capitalize } from 'lodash'
import HTTP_STATUS from '~/constants/httpStatus'
import authService from '~/services/auth.service'
import databaseService from '~/services/database.service'
import { hashPassword } from '~/utils/crypto'
import { verifyToken } from '~/utils/jwt'
import { validate } from '~/utils/validation'
import { USER_MESSAGE } from '../constants/messages'
import { ErrorWithStatus } from '../models/Errors'

export const loginValidator = validate(
  checkSchema(
    {
      email: {
        isEmail: {
          errorMessage: USER_MESSAGE.EMAIL_IS_INVALID
        },

        trim: true,
        custom: {
          options: async (value, { req }) => {
            const user = await databaseService.users.findOne({
              email: value,
              password: hashPassword(req.body.password)
            })
            if (!user) {
              throw new Error(USER_MESSAGE.USER_INFO_NOT_VALID)
            }
            req.user = user
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
      }
    },
    ['body']
  )
)

export const registerValidator = validate(
  checkSchema(
    {
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

        trim: true,
        custom: {
          options: async (value) => {
            const isExistEmail = await authService.emailExisted(value)
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
    },
    ['body']
  )
)

export const accessTokenValidator = validate(
  checkSchema(
    {
      Authorization: {
        trim: true,
        custom: {
          options: async (value: string, { req }) => {
            const access_token = (value || '').split(' ')[1]
            if (!access_token) {
              throw new ErrorWithStatus({
                message: USER_MESSAGE.ACCESS_TOKEN_IS_INVALID,
                status: HTTP_STATUS.UNAUTHORIZED
              })
            }
            try {
              const decode = await verifyToken({
                token: access_token,
                secretOrPublicKey: process.env.JWT_SECRET_ACCESS_TOKEN as string
              })
              req.decode = decode
            } catch (error) {
              throw new ErrorWithStatus({
                message: capitalize((error as JsonWebTokenError).message),
                status: HTTP_STATUS.UNAUTHORIZED
              })
            }
            return true
          }
        }
      }
    },
    ['headers']
  )
)

export const refreshTokenValidator = validate(
  checkSchema(
    {
      refresh_token: {
        trim: true,
        custom: {
          options: async (value: string, { req }) => {
            if (!value) {
              throw new ErrorWithStatus({
                message: USER_MESSAGE.REFRESH_TOKEN_IS_REQUIRED,
                status: HTTP_STATUS.UNAUTHORIZED
              })
            }
            try {
              const [decode, refresh_token] = await Promise.all([
                verifyToken({ token: value, secretOrPublicKey: process.env.JWT_SECRET_REFRESH_TOKEN as string }),
                databaseService.refreshToken.findOne({
                  token: value
                })
              ])
              req.decode = decode
              if (!refresh_token) {
                throw new ErrorWithStatus({
                  message: USER_MESSAGE.USED_REFRESH_TOKEN_OR_NOT_EXISTED,
                  status: HTTP_STATUS.UNAUTHORIZED
                })
              }
            } catch (error) {
              if (error instanceof JsonWebTokenError) {
                throw new ErrorWithStatus({
                  message: capitalize(error.message),
                  status: HTTP_STATUS.UNAUTHORIZED
                })
              } else throw error
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)

export const emailTokenValidator = validate(
  checkSchema(
    {
      email_verify_token: {
        trim: true,
        custom: {
          options: async (value: string, { req }) => {
            if (!value) {
              throw new ErrorWithStatus({
                message: USER_MESSAGE.EMAIL_VERIFY_TOKEN_IS_REQUIRED,
                status: HTTP_STATUS.UNAUTHORIZED
              })
            }
            try {
              const decode_email_verify = await verifyToken({
                token: value,
                secretOrPublicKey: process.env.JWT_SECRET_EMAIL_VERIFY_TOKEN as string
              })
              ;(req as Request).decode_email_verify_token = decode_email_verify
            } catch (error) {
              if (error instanceof JsonWebTokenError) {
                throw new ErrorWithStatus({
                  message: capitalize(error.message),
                  status: HTTP_STATUS.UNAUTHORIZED
                })
              } else throw error
            }

            return true
          }
        }
      }
    },
    ['body']
  )
)
