import React from 'react'
import { authToken } from '../feature/auth/authSlice'
import { useSelector } from 'react-redux'
import  { Navigate } from 'react-router-dom'

const PrivateRoute = ({ element   }) => {
    const loginToken = useSelector(authToken)

  return (
    loginToken ? <Navigate to="/" /> : element
  )
}

export default PrivateRoute