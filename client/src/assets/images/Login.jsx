import React from 'react'
import { SiWelcometothejungle } from "react-icons/si";
import LoginForm from './LoginForm';
import Background from '../../../public/images/login-3.jpg';

const imageStyle = {
  width: "100%",
  height: "400px",
  backgroundImage: "url(" + { Background } + ")"
};
const Login = () => {
  return (
    <div className='w-full flex rounded gap-8 justify-center items-center border bodder-slate-100 bg-slate-50 p-8 md:p-8 2xl:px-20 md:mt-12'>
        <div 
            style={imageStyle}
            className='w-full h-full lg:w-1/2 flex flex-col hidden rounded lg:block'
        >
            {/* <img src="./images/login-2.jpg" className='w:full h-full 2xl:w-5/6'/> */}
        </div>
        
        <div className='w-full lg:w-1/2 flex flex-col'>
            <div className='flex flex-col'>
                <h2 className='flex items-center text-2xl font-semibold'>
                    <span className='text-3xl'><SiWelcometothejungle /></span>
                    <span>elcome Back</span>
                </h2>
                <p className='mt-2 font-medium tex-base'>Don’t have an account? Sign up. </p>
                <LoginForm />
            </div>
        </div>
       
    </div>
  )
}

export default Login