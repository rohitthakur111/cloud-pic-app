import React, { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, logout } from '../../feature/auth/authSlice'
import { CiUser } from 'react-icons/ci'
import { RiLogoutCircleRFill } from 'react-icons/ri'
import { Link, Navigate } from 'react-router-dom'
import { getUsersAsync } from '../../feature/users/userSlice'

const Header = () => {
  const admin = useSelector(loginUser)
  const dispatch = useDispatch()
  
  // run function on load like get users
  useEffect(()=>{
    (async()=>{
       await dispatch(getUsersAsync())
    })()
  },[])
  return (
    <>
      <div className="navbar bg-base-100 w-full flex justify-end lg:px-32 py-4 border-b sticky top-0 z-30">
        <div className="flex-none gap-2">
          {/* Profile Avatar with Hover Dropdown */}
          <div className="group relative">
            {/* Avatar */}
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
              {admin?.profilePicture ? (
                      <img src={admin?.profilePicture} alt="User Avatar" className="rounded-full" />
                    ) : (
                      <p className="w-full h-full rounded-full text-2xl flex justify-center items-center">{admin?.userName?.charAt(0)}</p>
                    )}
              </div>
            </div>
            {/* Dropdown Menu */}
            <ul
              tabIndex={0}
              className="absolute w-32 right-[-30px] top-8 hidden group-hover:block bg-base-100 rounded  mt-3 p-2 shadow-lg transition-all ease-in-out duration-200 transform opacity-0 group-hover:opacity-100">
              <li className="hover:bg-gray-200 p-2 rounded">
                <Link to="profile" className="flex items-center space-x-2">
                  <span><CiUser size={24}/></span>
                  <span>Profile</span>
                </Link>
              </li>
              <li className="hover:bg-gray-200 p-2 rounded">
                <button 
                  className="flex items-center space-x-2" 
                  onClick={()=>dispatch(logout())}
                >
                <span><RiLogoutCircleRFill size={24}/></span>
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  )
}

export default Header
