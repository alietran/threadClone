export const USER_MESSAGE = {
  VALIDATION_ERROR: 'Validation error',
  NAME_IS_REQUIRED: 'Name is required',
  NAME_MUST_BE_A_STRING: 'Name must be a string',
  NAME_LENGTH: 'Name length must be 1 to 100 string',
  EMAIL_ALREADY_EXIST: 'Email already exists',
  EMAIL_IS_REQUIRED: 'Email is required',
  EMAIL_IS_INVALID: 'Email is invalid',
  PASSWORD_IS_REQUIRED: 'Password is required',
  PASSWORD_MUST_BE_A_STRING: 'Password must be a string',
  PASSWORD_LENGTH: 'Password should be at least 6 chars',
  PASSWORD_MUST_BE_STRONG:
    'Password must be at least 6 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol',
  CONFIRM_PASSWORD_IS_REQUIRED: 'Confirm password is required',
  CONFIRM_PASSWORD_MUST_BE_A_STRING: 'Confirm password must be a string',
  CONFIRM_PASSWORD_LENGTH: 'Confirm password should be at least 6 chars',
  CONFIRM_PASSWORD_NOT_MATCH: 'Password confirmation does not match password',
  CONFIRM_PASSWORD_MUST_BE_STRONG:
    'Confirm password must be at least 6 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol',
  DATE_OF_BIRTH_MUST_BE_ISO8601: 'Date of birth must be in ISO 8601 format'
} as const
