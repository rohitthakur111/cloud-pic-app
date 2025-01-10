import React, { useEffect } from 'react'
import Breadcrumbs from '../../../components/Breadcrumbs'
import Table from '../../components/Table.jsx'
import { getUsers } from '../../../feature/users/service.jsx'

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
    useEffect(()=>{
        (async()=>{
            await getUsers()
        })()
    },[])
    return (
        <div>
        <div className='flex justify-between items-center position-sticky top-0 border-b bg-sky-50 rounded p-2 text-gray-600'>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
        </div>
            <Table/>
        </div>
    )
}

export default index