import React from 'react'
import { SiWelcometothejungle } from "react-icons/si";
import LoginForm from '../../components/Form';
import Background from './../../assets/images/login-2.jpg';
import LoginBox from './LoginBox';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setTransition, transitionState } from '../../feature/visual/visualSlice';
  
const Login = () => {
  const dispatch = useDispatch()
    const transition = useSelector(transitionState)
    const navigate = useNavigate()

    const handleTransition = ()=>{
        dispatch(setTransition(true))
        navigate('/register')
        setTimeout(()=>{
            dispatch(setTransition(false))
        },800)
    }

  return (
    <div className='w-full flex rounded justify-center items-stretch border border-slate-100 bg-slate-50 md:mt-12 '>
      <div className={`w-full lg:w-1/2 flex flex-col rounded hidden lg:block flex-1 z-20 ${transition &&'animate-slide-left'}`}>
        <LoginBox login={true} className="w-full lg:w-1/2" handleTransition={handleTransition}/>
      </div>
      
      <div className={`w-full lg:w-1/2 flex flex-col flex-1  z-10 ${transition && 'animate-slide-right'}`}>
          <div className='p-8 2xl:p-24'>
              <div className='flex flex-col'>
                  <h2 className='flex text-2xl font-semibold'>
                      <span className='text-3xl'><SiWelcometothejungle /></span>
                      <span>Welcome Back</span>
                  </h2>
                  <p className='mt-2 font-medium text-base'>Don’t have an account? 
                    <button onClick={handleTransition}> <span className='text-sky-500'> Sign Up</span></button> 
                  </p>
                  <LoginForm login={true} />
              </div>
          </div>
      </div>
    </div>
  )
}

export default Login