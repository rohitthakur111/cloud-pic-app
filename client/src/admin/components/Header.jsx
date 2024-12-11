import React, { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'

const Header = () => {
  return (
    <>
        <div className="navbar bg-base-100 w-full flex justify-end px-32 py-4 border-b">
            <div className="flex-none gap-2">
                <div className="form-control">
                </div>
                <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS Navbar component"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 p-2 shadow">
                    <li><a>Logout</a></li>
                </ul>
                </div>
            </div>
        </div>
        <Toaster
        position="top-center"
        reverseOrder={false}
    />
</>
  )
}

export default Header