import { useCookies } from 'react-cookie'
import { useEffect } from 'react'
import { AUTH_TOKEN_KEY } from '../store/constants'
import { useLoginMutation } from '../store/modules/auth/api'
import { toast } from 'sonner'

export function useLogin() {
  const [, setCookie] = useCookies([AUTH_TOKEN_KEY])

  const [loginAction, { isLoading, isSuccess, isError, data }] = useLoginMutation()

  useEffect(() => {
    if (!data?.access_token || isLoading || isError) return

    isSuccess &&
      setCookie(AUTH_TOKEN_KEY, data?.access_token, {
        path: '/',
        sameSite: true,
        httpOnly: import.meta.env.ENVIRONMENT === 'production',
      })
  }, [data])

  const login = (email: string, password: string, remember: boolean) => {
    loginAction({ email, password, remember })
      .unwrap()
      .catch(() => toast.error('Email ou Senha incorretas'))
  }


  const logout = () => {
    setCookie(AUTH_TOKEN_KEY, '', {
      path: '/',
      maxAge: 0,
      sameSite: true,
    })
    window.location.href = '/'
  }

  return {
    login,
    logout,
    isLoading,
    isSuccess,
    isError,
    data,
  }
}