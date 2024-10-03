import React from 'react'
import Form from '../../components/Form'
import { SiWelcometothejungle } from 'react-icons/si'
import Background from './../../assets/images/login-31.jpg';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { Link } from 'react-router-dom';
import LoginBox from '../login/LoginBox';

const Register = () => {
    return (
        <div className='w-full flex rounded gap-8 justify-center items-stretch border border-slate-100 bg-slate-50 md:mt-12'>
            <div className='w-full lg:w-1/2 flex flex-col flex-1 animate-slide-left z-10'>
                <div className='flex flex-col  p-8 2xl:p-24'>
                    <h2 className='flex text-2xl font-semibold'>
                        <span className='text-3xl'><SiWelcometothejungle /></span>
                        <span>elcome! Create Your Account</span>
                    </h2>
                    <p className='mt-2 font-medium tex-base'>Already have an account? 
                        <Link to="/login"><span className='text-sky-500'> Sign In</span></Link> 
                    </p>
                    <Form login={false}/>
                </div>
            </div>
            <div className='w-full lg:w-1/2 flex flex-col rounded hidden lg:block flex-1 z-20 animate-slide-right'>
                <LoginBox login={false}/>
            </div>
        </div>
    )
    
}

export default Register