import { useSelector } from "react-redux"
import { authToken } from "../feature/auth/authSlice"
import { Navigate } from "react-router-dom"

const LoginProtect = (WrappedComponent) =>{
    return ((props)=>{
        const token = useSelector(authToken)
        return token ? <WrappedComponent {...props}/> : <Navigate to="/login"/>
    })
}

export default LoginProtect