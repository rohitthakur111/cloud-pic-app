import React, { useEffect } from 'react'
import Breadcrumbs from '../../../components/Breadcrumbs'
import Table from './Table.jsx'
import { useSelector } from 'react-redux'
import { users } from '../../../feature/users/userSlice.jsx'

const breadcrumbs = [
    {
        title : "Admin",
        link : "/Admin",
    },
    {
        title : "Users",
        link : "",
    }
    
]
const index = () => {
    const usersList = useSelector(users)
    return (
        <div>
        <div className='flex justify-between items-center position-sticky top-0 border-b bg-sky-50 rounded p-2 text-gray-600'>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
        </div>
            <Table users={usersList} />
        </div>
    )
}

export default index