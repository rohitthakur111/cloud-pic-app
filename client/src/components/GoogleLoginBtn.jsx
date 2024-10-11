import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'

import React from 'react'
import { useDispatch } from 'react-redux'
import { googleLoginAsync } from '../feature/auth/authSlice'
const cliintID = "834342822153-15b1gncburi5gi2isrvkkmhlm5qg7fo0.apps.googleusercontent.com"


const GoogleLoginBtn = () => {
    const dispatch = useDispatch()
    const responseMessage = async(response)=>{
        console.log(response)
        const token = response?.credential
        const data = await dispatch(googleLoginAsync(token))
        console.log(data)
    }
    const errorMessage = ()=>{
        console.log('error')
    }

  return (
    <GoogleOAuthProvider clientId={cliintID}>
            <button 
                type="button" 
                className="google-login-btn w-full flex justify-center items-center rounded-md gap-x-2 mt-4 text-md font-medium flex-grow bg-white border-none transition-colors duration-500 ease-in-out hover:bg-sky-100 p-0"
            >
                <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
            </button>
        </GoogleOAuthProvider>
    )
}

export default GoogleLoginBtn