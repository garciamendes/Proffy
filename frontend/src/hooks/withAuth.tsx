import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

export const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  shouldBeAuthenticated = true
) => {

  const AuthenticatedComponent = (props: P) => {
    const navigate = useNavigate()
    const [cookies] = useCookies(['sessionId'])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      const authToken = cookies['sessionId']

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

    return loading ?
      <div className='flex item-center justify-center mt-10'>
        <Loader2 className="animate-spin text-violet-700 size-16" />
      </div> :
      <WrappedComponent {...props} />
  }

  return AuthenticatedComponent
}