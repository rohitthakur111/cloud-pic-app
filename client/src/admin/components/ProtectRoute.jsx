import React, {useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authToken, getUserAsync } from '../../feature/auth/authSlice'
import { Navigate } from 'react-router-dom'
import Loading from './Loading'

const ProtectRoute = (WrappedComponent) => {
  return (props)=>{
    const [isAuth, seIsAuth] = useState(null)
    const dispatch = useDispatch()
    const token = useSelector(authToken)
    const getUser = async()=>{
        try{
            const response = await dispatch(getUserAsync())
              if(response?.payload?.data?.user?.role?.toLocaleLowerCase() === "admin") return seIsAuth(true)
            return seIsAuth(false) 
        }catch(err){
            seIsAuth(false)
        }
    }
    useEffect(()=>{
      (async()=>{
        await getUser()
      })()
    },[token])
    
    if (isAuth === null ) return <Loading />
    return isAuth ? <WrappedComponent {...props}/> : <Navigate to="/login"/> 
  }
}

export default ProtectRoute