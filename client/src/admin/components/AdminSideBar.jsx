import React, { useState } from 'react';
import { FaBars, FaChartLine, FaCogs, FaSignOutAlt, FaTachometerAlt, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AdminSideBar = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <>
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
          <Link to="/Admin" className="text-2xl font-semibold">
            Admin Panel
          </Link>
        </div>

        <nav className="flex flex-col space-y-4 overflow-y-auto hide-scrollbar">
          <Link
            to="/Admin"
            className="flex items-center text-gray-300 hover:text-white transition-all duration-300"
          >
            <FaTachometerAlt className="mr-3" /> Dashboard
          </Link>
          <Link
            to="users"
            className="flex items-center text-gray-300 hover:text-white transition-all duration-300"
          >
            <FaUsers className="mr-3" /> Users
          </Link>
          <Link
            to="images"
            className="flex items-center text-gray-300 hover:text-white transition-all duration-300"
          >
            <FaCogs className="mr-3" /> Images
          </Link>
          <Link
            to="add-new"
            className="flex items-center text-gray-300 hover:text-white transition-all duration-300"
          >
            <FaCogs className="mr-3" /> Add New
          </Link>
          <Link
            to="/admin"
            className="flex items-center text-gray-300 hover:text-white transition-all duration-300"
          >
            <FaChartLine className="mr-3" /> Order
          </Link>
          <Link
            to="/admin"
            className="flex items-center text-gray-300 hover:text-white transition-all duration-300"
          >
            <FaSignOutAlt className="mr-3" /> Logout
          </Link>
        </nav>
      </div>

      {/* Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-30"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default AdminSideBar;
