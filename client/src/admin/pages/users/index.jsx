import React from 'react'
import Breadcrumbs from '../../../components/Breadcrumbs'

const index = () => {
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
    return (
        <div className='flex justify-between items-center position-sticky top-0 border-b bg-sky-50 rounded p-2 text-gray-600'>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
        </div>
    )
}

export default index