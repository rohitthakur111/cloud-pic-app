import React, {useState } from 'react'
import { useDispatch } from 'react-redux'
import { getUserAsync } from '../../feature/auth/authSlice'
import { Navigate } from 'react-router-dom'
import Loading from './Loading'

const ProtectRoute = (WrappedComponent) => {
    
  return (props)=>{
    const [isAuth, seIsAuth] = useState(null)
    const dispatch = useDispatch()
    const getUser = async()=>{
        try{
            const response = await dispatch(getUserAsync())
            if(response?.payload?.data?.user) return seIsAuth(true)
            return seIsAuth(false) 
        }catch(err){
            seIsAuth(false)
        }
    }
    getUser()
    if (isAuth === null ) return <Loading />
    return isAuth ? <WrappedComponent {...props}/> : <Navigate to="/login"/> 
  }
}

export default ProtectRoute