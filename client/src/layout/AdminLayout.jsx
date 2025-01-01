import React, { useState } from 'react';
import Header from '../admin/components/Header';
import AdminSideBar from '../admin/components/AdminSideBar';
import { Outlet } from 'react-router-dom';
import ProtectRoute from '../admin/components/ProtectRoute';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar */}
      <AdminSideBar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main content */}
      <div
        className={`flex-1 flex flex-col ${
          isSidebarOpen && 'lg:ml-64' // Add margin when sidebar is visible
        } transition-all duration-300 ease-in-out`}
      >
        {/* Header */}
        <Header />

        {/* Outlet */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProtectRoute(AdminLayout);
