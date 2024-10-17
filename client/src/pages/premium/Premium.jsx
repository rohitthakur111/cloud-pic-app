import React from 'react'
import { useSelector } from 'react-redux'
import { orderList, orderLoading } from '../../feature/order/orderSlice'
import ImageCard from '../../components/ImageCard'
import { Link } from 'react-router-dom'
import Loading from '../../components/Loading'
import { TbBrandAppgallery } from 'react-icons/tb'

const Premium = () => {
    const loadingState = useSelector(orderLoading)
    const order = useSelector(orderList)

  return (
    <div className='flex w-full flex-row flex-wrap gap-y-4 md:gap-y-2 justify-center md:justify-start'>
      {loadingState ? Array(6)?.fill()?.map((_,i)=> <div className='w-full md:w-1/2 lg:w-1/3 2xl:w-1/4'  key={i}> <Loading/> </div>) : 
      <>
        <h2 className='text-2xl font-medium p-4 border-b w-full flex items-center gap-2'> 
          <span className='text-teal-500'><TbBrandAppgallery/></span>
          <span>Premium  Collection</span>
        </h2>
          {order?.map(({image},i) => (
           <div className='w-full md:w-1/2 lg:w-1/3 2xl:w-1/4' key={i}>
           <Link to={`/image/${image?._id}`}>
           <ImageCard image={image}/>
           </Link>
         </div>
          ))}
      </>
     
      }
    </div>
  )
}

export default Premium