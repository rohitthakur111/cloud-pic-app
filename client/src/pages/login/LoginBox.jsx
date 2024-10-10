import React from 'react'
import RegisterBackground from './../../assets/images/login-31.jpg';
import LoginBackground from './../../assets/images/login-image.jpg';
import { Link } from 'react-router-dom';
import { IoIosArrowRoundForward } from 'react-icons/io';
const LoginBox = ({login, handleTransition}) => {
    const data = { 
        imageStyle : {
            backgroundImage: `url(${login ? LoginBackground : RegisterBackground})`,
            backgroundSize: 'cover',
           backgroundRepeat: 'no-repeat'
        },
        firstHeading : login  ? "Don't have an Account?" : "Already have an Account?",
        secondHeading : login  ? "Create Your Account" : "Sign In to your Account",
        buttonText : login  ? "Sign Up Now " : "Sign In",
        redirectUrl : login  ? "/register" : "/login"
    }
  return (
    <div style={data?.imageStyle} className='w-full  h-full flex flex-col rounded-r '>
        <div className='w-full h-full flex justify-center items-center'>
            <div className='w-full bg-red-500 rounded bg-stone-700 bg-opacity-15 flex flex-col h-full flex justify-center items-center'>
                <div className='w-full flex justify-center items-center flex-col p-12 gap-y-32'>
                    <div className= 'text-white'>
                        <h2 className='text-4xl font-semibold text-center mb-2'>{data?.firstHeading}</h2>
                        <h2 className='text-4xl text-center font-semibold'>{data?.secondHeading}</h2>
                    </div>
                    <div className='w-full flex justify-center'>
                        <button to={data?.redirectUrl}
                            className='w-1/2 flex justify-center p-2 items-center text-base rounded-md  bg-error  text-white hover:bg-white transition-colors duration-500 ease-in-out hover:text-error hover:bg-white uppercase font-semibold'
                            onClick={handleTransition}
                            >
                            <span>{data?.buttonText}</span>
                            <span className='text-3xl text-error'><IoIosArrowRoundForward /></span>
                        </button>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default LoginBox