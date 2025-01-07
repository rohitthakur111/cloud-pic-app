import React, { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { loginUser } from '../../feature/auth/authSlice'
import { CiUser } from 'react-icons/ci'
import { RiLogoutCircleRFill } from 'react-icons/ri'

const Header = () => {
  const admin = useSelector(loginUser)
  return (
    <>
      <div className="navbar bg-base-100 w-full flex justify-end lg:px-32 py-4 border-b sticky top-0 z-30">
        <div className="flex-none gap-2">
          {/* Profile Avatar with Hover Dropdown */}
          <div className="group relative">
            {/* Avatar */}
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Admin Profile"
                  src={admin.profilePicture}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
            {/* Dropdown Menu */}
            <ul
              tabIndex={0}
              className="absolute w-32 right-0 lg:right-[-20] top-8 hidden group-hover:block bg-base-100 rounded  mt-3 p-2 shadow-lg transition-all ease-in-out duration-200 transform opacity-0 group-hover:opacity-100">
              <li className="hover:bg-gray-200 p-2 rounded">
                <a className="flex items-center space-x-2">
                  <span><CiUser size={24}/></span>
                  <span>Profile</span>
                </a>
              </li>
              <li className="hover:bg-gray-200 p-2 rounded">
                <a className="flex items-center space-x-2">
                <span><RiLogoutCircleRFill size={24}/></span>
                  <span>Logout</span>
                </a>
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
