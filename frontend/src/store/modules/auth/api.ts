import { createApi } from '@reduxjs/toolkit/query/react'
import {
  ILoginRequest,
  ILoginResponse,
  IRegisterUserRequest,
  IResetPasswordRequest,
  ISendEmailResetPasswordRequest,
  IValidateSessionResetPasswordRequest,
  IValidateSessionResetPasswordResponse,
} from './types'
import { baseQuery } from '../../query'

export const authApi = createApi({
  reducerPath: 'auth',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    register: builder.mutation<void, IRegisterUserRequest>({
      query: ({ fullname, email, password }) => ({
        url: '/user',
        method: 'POST',
        body: { email, password, fullname },
      }),
    }),
    login: builder.mutation<ILoginResponse, ILoginRequest>({
      query: ({ email, password, remember }) => ({
        url: '/user/login',
        method: 'POST',
        body: { email, password, remember },
      }),
      transformResponse: (response: ILoginResponse) => {
        return response
      },
    }),
    resetPassword: builder.mutation<void, IResetPasswordRequest>({
      query: ({ newPassword, t, u }) => ({
        url: `/user/reset-password`,
        method: 'PATCH',
        body: {
          newPassword, t, u
        },
      }),
    }),
    sendEmailResetPassword: builder.mutation<void, ISendEmailResetPasswordRequest>({
      query: ({ email }) => ({
        url: '/user/forgot-password/',
        method: 'POST',
        body: { email },
      }),
    }),
    validateSessionResetPassword: builder.query<IValidateSessionResetPasswordResponse, IValidateSessionResetPasswordRequest>({
      query: ({ t, u }) => ({
        url: '/user/validate-session-token',
        method: 'POST',
        body: { t, u },
      })
    })
  }),
})

export const {
  useRegisterMutation,
  useLoginMutation,
  useResetPasswordMutation,
  useSendEmailResetPasswordMutation,
  useLazyValidateSessionResetPasswordQuery
} = authApi