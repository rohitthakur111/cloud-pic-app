import React from 'react'
import { FaChartLine, FaCogs, FaSignOutAlt, FaTachometerAlt, FaUsers } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const AdminSideBar = () => {
  return (
    <div className="h-screen w-64 ">
      <div className="h-screen  w-64 bg-gray-800 text-white p-5 flex flex-col overflow-y-hidden fixed">
        <div className="flex items-center space-x-2 mb-10">
          <Link to="/Admin" className="text-2xl font-semibold" >Admin Panel</Link>
        </div>

        <nav className="flex flex-col space-y-4 overflow-y-auto hide-scrollbar">
          <Link to="/Admin" className="flex items-center text-gray-300 hover:text-white transition-all duration-300">
            <FaTachometerAlt className="mr-3" /> Dashboard
          </Link>
          <Link to="users" className="flex items-center text-gray-300 hover:text-white transition-all duration-300">
            <FaUsers className="mr-3" /> Users
          </Link>
          <Link to="images" className="flex items-center text-gray-300 hover:text-white transition-all duration-300">
            <FaCogs className="mr-3" /> Images
          </Link>
          <Link to="add-new" className="flex items-center text-gray-300 hover:text-white transition-all duration-300">
            <FaCogs className="mr-3" /> Add New
          </Link>
          <Link to="/admin"className="flex items-center text-gray-300 hover:text-white transition-all duration-300">
            <FaChartLine className="mr-3" /> Order
          </Link>
          <Link to="/admin" className="flex items-center text-gray-300 hover:text-white transition-all duration-300">
            <FaSignOutAlt className="mr-3" /> Logout
          </Link>
        </nav>
  </div>
  </div>
  )
}

export default AdminSideBar