import React, { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { useDispatch } from 'react-redux'
import { getUserAsync, loginAsync, registerAsync } from '../feature/auth/authSlice'
import toast from 'react-hot-toast';
import GoogleLoginBtn from './GoogleLoginBtn';

const Form = ({login}) => {
    const dispatch = useDispatch()
    const [ userData, setUserData ] = useState({ userName : '', email : '', password : ''})
    // handle userdata
    const handleUserData = (e)=> setUserData(prevData=>({ ...prevData, [e.target.name] : e.target.value}))
    // handle submit user data
    const handleFormSubmit = async(e)=>{
        e.preventDefault();
        if(login){
            delete userData.userName
            console.log('user', userData)
            const data = await dispatch(loginAsync(userData))
            if( data?.payload?.status === 'success'){
                toast.success('Login Successfully')  
                const user = await dispatch(getUserAsync());
            }
            else toast.error('Login with valid credential!')
        }else{
            const data = await dispatch(registerAsync(userData))
            if( data?.payload?.status === 'success')
                toast.success('Account created Successfully')  
            else toast.error('Enter a valid data!')

        }
    }
  return (
    <>
    <form onSubmit={handleFormSubmit}>
        <div className='w-full flex-col mt-4 md:mt-12'>
        {!login && 

            <div className='w-full flex flex-col mb-4'>
                <label className="w-full input input-bordered flex items-center gap-2">
                    
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                        d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    
                    <input 
                        type="text" 
                        className="grow" 
                        placeholder="User Name" 
                        name="userName" 
                        value={userData?.userName}
                        onChange={handleUserData}
                        required
                    />
                </label>
            </div>
            }

            <div className='w-full flex flex-col 2xl:flex-row gap-4 2xl:gap-8'>
                <label className="w-full input input-bordered flex items-center gap-2">
                    
                     {/* User name */}
                    {login ?
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                        d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    :
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                        d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                        <path
                        d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    }
                    <input 
                        type="email" 
                        className="grow" 
                        placeholder="User Email"
                        name="email" 
                        value={userData?.email}
                        onChange={handleUserData}
                        autoComplete ="username"
                        required
                    />
                </label>

                <label className="w-full input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                        fillRule="evenodd"
                        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                        clipRule="evenodd" />
                    </svg>
                    <input 
                        type="password" 
                        autoComplete = "current-password"
                        className="grow"  
                        placeholder='Password'
                        name="password" 
                        value={userData?.password}
                        onChange={handleUserData}
                        required
                    />
                </label>
            </div>
            <div className='w-full mt-4 flex justify-center items-center gap-4 '>
                <div className='border-t flex-grow'></div>
                <span>or</span>
                <div className='border-t flex-grow'></div>
            </div>
            {/* <button type="button" className='w-full flex justify-center items-center rounded-md gap-x-2 mt-4 text-md font-medium flex-grow p-3 bg-white transition-colors duration-500 ease-in-out hover:bg-sky-100'>
                <span className="text-2xl"><FcGoogle /></span>
                <span> Sign in with Google </span>
            </button> */}
            <GoogleLoginBtn />

            <button type="button" className='flex ml-auto mt-2 text-sm font-semibold text-sky-400'>
                Forgot Password?
            </button>
            <button className='w-full flex justify-center items-center mt-4 p-3  text-base uppercase font-semibold rounded-md bg-error text-white  transition-colors duration-500 ease-in-out border border-red-200 border-opacity-40 hover:bg-teal-500 '>
               { login ? 'Sign in to your Account' : 'Create Your Account' }
            </button>
        </div>
    </form>
    </>
  )
}

export default Form 