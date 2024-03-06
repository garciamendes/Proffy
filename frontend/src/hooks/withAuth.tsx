import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { AUTH_TOKEN_KEY } from '../store/constants'
import { Loader } from '../components/loader/índex'

export const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  shouldBeAuthenticated = true
) => {

  const AuthenticatedComponent = (props: P) => {
    const navigate = useNavigate()
    const [cookies] = useCookies([AUTH_TOKEN_KEY])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      const authToken = cookies[AUTH_TOKEN_KEY]

      if (!authToken && shouldBeAuthenticated) {
        navigate('/')
        return
      }

      if (authToken && !shouldBeAuthenticated) {
        navigate('/home')
        return
      }

      setLoading(false)
    }, [])

    return loading ? <Loader /> :
      <WrappedComponent {...props} />
  }

  return AuthenticatedComponent
}