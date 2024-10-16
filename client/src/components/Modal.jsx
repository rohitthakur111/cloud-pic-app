import React from 'react';
import LoginForm from './Form';
import { SiWelcometothejungle } from 'react-icons/si';
import { Link } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { showHideModal } from '../feature/visual/visualSlice';

const Modal = () => {
    const dispatch = useDispatch()
    return (
        <div className={`relative w-full flex flex-col flex-1 z-10`}>
            <button 
                onClick={()=>dispatch(showHideModal(false))}
        
                className="absolute top-0 right-4 text-gray-600 text-2xl hover:text-error"
            >
               <IoMdClose />
            </button>
            <div className='p-8'>
                <div className='flex flex-col'>
                    <h2 className='flex text-2xl font-semibold'>
                        <span className='text-3xl'><SiWelcometothejungle /></span>
                        <span>elcome Back</span>
                    </h2>
                    <p className='mt-1 font-medium text-base'>
                        Don’t have an account? 
                        <Link to="/register">
                            <span className='text-sky-500'> Sign Up</span>
                        </Link>
                    </p>
                    <LoginForm login={true} />
                </div>
            </div>
        </div>
    );
};

export default Modal;
