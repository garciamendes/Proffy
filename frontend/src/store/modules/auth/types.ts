export interface ILoginRequest {
  email: string
  password: string
  remember: boolean
}

export interface ILoginResponse {
  access_token: string
}

export interface ISendEmailResetPasswordRequest {
  email: string
}

export interface IResetPasswordRequest {
  newPassword: string
  u: string
  t: string
}

export type IValidateSessionResetPasswordRequest = Pick<IResetPasswordRequest, 't' | 'u'>
export interface IValidateSessionResetPasswordResponse {
  status: boolean
}

export interface IRegisterUserRequest {
  fullname: string
  email: string
  password: string
}