import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'

interface AuthLayoutProps {
  children: React.ReactNode
  authentication?: boolean
}

const AuthLayout = ({ children, authentication = false }: AuthLayoutProps) => {
  const navigate = useNavigate()
  const isAuthenticated = useAppSelector(({ users }) => users.isAuthenticated)

  useEffect(() => {
    if (authentication && isAuthenticated !== authentication) {
      navigate('/signin')
    } else if (!authentication && isAuthenticated !== authentication) {
      navigate('/')
    }
  }, [isAuthenticated, navigate, authentication])


  return <>{children}</>
}

export default AuthLayout
