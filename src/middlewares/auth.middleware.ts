import { checkSchema } from 'express-validator'
import { AUTH_MESSAGE } from '~/constant/message'
import authService from '~/services/auth.service'
import { validate } from '~/utils/validation'

export const registerValidator = validate(
  checkSchema(
    {
      name: {
        isLength: {
          options: { min: 1, max: 100 },
          errorMessage: AUTH_MESSAGE.NAME_LENGTH
        },
        isString: {
          errorMessage: AUTH_MESSAGE.NAME_MUST_BE_A_STRING
        },
        trim: true,
        notEmpty: {
          errorMessage: AUTH_MESSAGE.NAME_IS_REQUIRED
        }
      },
      email: {
        isEmail: {
          errorMessage: AUTH_MESSAGE.EMAIL_IS_INVALID
        },

        trim: true,
        custom: {
          options: async (value) => {
            const isExistEmail = await authService.emailExisted(value)
            if (isExistEmail) {
              throw new Error(AUTH_MESSAGE.EMAIL_ALREADY_EXIST)
            }
            return true
          }
        }
      },
      password: {
        isLength: {
          options: { min: 6 },
          errorMessage: AUTH_MESSAGE.PASSWORD_LENGTH
        },
        notEmpty: true,
        isStrongPassword: {
          errorMessage: AUTH_MESSAGE.PASSWORD_MUST_BE_STRONG,
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
          errorMessage: AUTH_MESSAGE.CONFIRM_PASSWORD_LENGTH
        },
        notEmpty: true,

        isStrongPassword: {
          errorMessage: AUTH_MESSAGE.PASSWORD_MUST_BE_STRONG,
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
              throw new Error(AUTH_MESSAGE.CONFIRM_PASSWORD_NOT_MATCH)
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
          errorMessage: AUTH_MESSAGE.DATE_OF_BIRTH_MUST_BE_ISO8601
        }
      }
    },
    ['body']
  )
)
