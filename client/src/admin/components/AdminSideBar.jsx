import React from 'react';
import { FaBars, FaChartLine, FaCogs, FaSignOutAlt, FaTachometerAlt, FaUsers } from 'react-icons/fa';
import { IoMdLogOut } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { logout } from '../../feature/auth/authSlice';

const AdminSideBar = ({ isSidebarOpen, toggleSidebar, closeSidebar }) => {
  const dispatch = useDispatch()
  const { pathname } = useLocation();
  // Array of menu items
  const menuItems = [
    { to: '/Admin', label: 'Dashboard', icon: <FaTachometerAlt /> },
    { to: '/Admin/images', label: 'Images', icon: <FaCogs /> },
    { to: '/Admin/users', label: 'Users', icon: <FaUsers /> },
    { to: '/Admin/add-new', label: 'Add New', icon: <FaCogs /> },
    // { to: '/Admin/order', label: 'Order', icon: <FaChartLine /> },
    // { to: '/Admin/logout', label: 'Logout', icon: <FaSignOutAlt /> },
  ];

  return (
    <div className="w-0px md:w-64 h-full">
      <div className="static md:fixed inset-y-0 left-0 bg-gray-800">
        {/* Hamburger Menu Button */}
        <button
          className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md"
          onClick={toggleSidebar}
        >
          <FaBars size={24} />
        </button>

        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white p-5 transform ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 lg:static transition-transform duration-300 ease-in-out z-40`}
        >
          <div className="flex items-center space-x-2 mb-10">
            <Link to="/Admin" className="text-2xl font-semibold" onClick={closeSidebar}>
              Admin Panel
            </Link>
          </div>

          <nav className="flex flex-col space-y-4 overflow-y-auto hide-scrollbar">
            {/* Mapping through menuItems */}
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.to}
                onClick={closeSidebar}
                className={`flex items-center  transition-all duration-300 text-medium md:text-lg font-medium ${
                  pathname.toLocaleLowerCase() === item.to.toLocaleLowerCase() ? 'text-sky-500' : 'text-gray-300 hover:text-white'
                }`}
              >
                <span className="mr-3">{item.icon}</span> {item.label}
              </Link>
            ))}
            <button 
              className='flex items-center gap-1 justify-center mt-4 text-white bg-teal-500 hover:bg-teal-400 px-4 py-2 rounded-md font-medium'
              onClick={()=>dispatch(logout())}
              >
              <span><IoMdLogOut size={20}/></span>
              <span>Sign Out</span>
            </button>
          </nav>
        </div>

        {/* Overlay for Mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-30"
            onClick={toggleSidebar}
          ></div>
        )}
      </div>
    </div>
  );
};

export default AdminSideBar;
