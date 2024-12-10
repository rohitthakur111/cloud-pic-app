import React from 'react'
import { Link } from 'react-router-dom'

const CardBox = ({title, link, icon, length}) => {
    return (
        <div className="group rounded-lg border-t border-gray-100 border-stroke bg-green-100 py-6 px-4 shadow-default  hover:text-white hover:bg-sky-200 shadow-lg">
            <Link to={link}>
                <div className='text-2xl  flex'>
                    <span className='bg-stone-200 border p-4 rounded-full icon group-hover:bg-sky-300'>
                        {icon}  
                    </span>
                </div>
                <div className="mt-4 flex items-end justify-between">
                    <div bis_skin_checked="1">
                        <h4 className="text-title-md font-bold dark:text-white">{length}</h4>
                        <span className="text-sm font-medium"> {title} </span>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default CardBox