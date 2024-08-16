export interface RegisterDTO {
  name: string
  email: string
  date_of_birth: Date
  password: string
  confirm_password: string
}

export interface LoginDTO {
  email: string
  password: string
}

export interface VerifyEmailDTO {
  email_verify_token: string
}

export interface LogoutDTO {
  refresh_token: string
}

export interface ForgotPasswordDTO {
  email: string
}

export interface ResetPasswordDTO {
  password: string
  confirm_password: string
  forgot_password_token: string
}
