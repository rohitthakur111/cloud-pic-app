import React from 'react'
import Header from '../admin/components/Header'
import AdminSideBar from '../admin/components/AdminSideBar'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div className='flex min-h-screen bg-slate-100'>
        <AdminSideBar />
        <div className='w-full'>
            <Header/>
            <div className='p-16 '>
              <Outlet />
            </div>
            
        </div>
    </div>
  )
}

export default AdminLayout