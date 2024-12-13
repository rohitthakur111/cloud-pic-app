import React from 'react'
import { FiEdit } from 'react-icons/fi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { Link } from 'react-router-dom'

const Table = ({images, paginations}) => {
  return (
    <div className='rounded-sm shadow-default '>
        <div className='w-full grid grid-cols-3 rounded-sm bg-gray-50 sm:grid-cols-6 p-4'>
            <h5 className="text-sm center font-medium xsm:text-base">#</h5>
            <h5 className="text-sm font-medium  xsm:text-base">Image</h5>
            <h5 className="text-sm font-medium xsm:text-base">Title</h5>
            <h5 className="text-sm font-medium xsm:text-base">Price</h5>
            <h5 className="text-sm font-medium xsm:text-base">Sales</h5>
            <h5 className="text-sm font-medium xsm:text-base text-center">Action</h5>
        </div>
        {images.map((image,i)=>(
           <div key={i} className="grid grid-cols-3 border-b border-stroke sm:grid-cols-6 p-4">
            <div className="items-center">
                <p className="font-medium text-black">{((paginations.currentPage-1) * paginations.pageSize)+ i+1}</p>
            </div>

            <div className="flex-shrink-0">
                <Link to={`/image/${image._id}`}>
                    <img className="w-12 rounded-full h-12" src={image.imageUrl} alt="Brand"/>
                </Link>
            </div>
     
            <div className="items-center">
                <Link to={`/image/${image._id}`}>
                    <p className="font-medium text-black">{image.title}</p>
                </Link>
            </div>
            <div className="items-center">
                <p className="font-medium text-black font-semibold">
                    {image?.price? image.price : 'Free'}
                    <span className='text-yellow-500 text-semibold font-semibold'> {image?.currency &&  image.currency}</span>
                </p>
            </div>
            <div className="items-center">
                <p className="font-medium text-black">{image.orderCount}</p>
            </div>
            <div className="items-center ">
               <div className='flex justify-center gap-2'>
                    <button className='bg-red-500 text-white p-2 rounded'><RiDeleteBin6Line /></button>
                    <button className='bg-green-500 text-white p-2 rounded'><FiEdit /></button>
               </div>
            </div>
          
         </div>
        ))}
        
    </div>  
  )
}

export default Table