import React from 'react'
import Form from '../../components/Form'
import { SiWelcometothejungle } from 'react-icons/si'
import Background from './../../assets/images/login-31.jpg';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import LoginBox from '../login/LoginBox';
import { useDispatch, useSelector } from 'react-redux';
import { setTransition, transitionState } from '../../feature/visual/visualSlice';

const Register = () => {
    const dispatch = useDispatch()
    const transition = useSelector(transitionState)
    const navigate = useNavigate()

    const handleTransition = ()=>{
        dispatch(setTransition(true))
        navigate('/login')
        setTimeout(()=>{
            dispatch(setTransition(false))
        },800)
    }

    return (
        <div className='w-full flex rounded gap-8 justify-center items-stretch border border-slate-100 bg-slate-50 md:mt-12'>
            <div className={`w-full lg:w-1/2 flex flex-col flex-1 z-10 ${transition && 'animate-slide-left'}`}>
                <div className='flex flex-col  p-8 2xl:p-24'>
                    <h2 className='flex text-2xl font-semibold'>
                        <span className='text-3xl'><SiWelcometothejungle /></span>
                        <span>elcome! Create Your Account</span>
                    </h2>
                    <p className='mt-2 font-medium tex-base'>Already have an account? 
                        <button to="/login" onClick={handleTransition}><span className='text-sky-500'> Sign In</span></button> 
                    </p>
                    <Form login={false}/>
                </div>
            </div>
            <div className={`w-full lg:w-1/2 flex flex-col rounded hidden lg:block flex-1 z-20  ${transition &&'animate-slide-right'}`}>
                <LoginBox login={false} handleTransition={handleTransition} />
            </div>
        </div>
    )
    
}

export default Register