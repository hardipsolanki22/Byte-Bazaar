import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'

interface AuthLayoutProps {
    children: React.ReactNode
}


function ProtectedForUnSecure({ children }: AuthLayoutProps) {
    const isAuthenticated = useAppSelector(({ users }) => users.isAuthenticated)

    if (isAuthenticated) {
        return <Navigate to="/" replace={true}></Navigate>;
    }
    return children;
}

export default ProtectedForUnSecure;

