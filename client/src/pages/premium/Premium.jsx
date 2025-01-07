import React from 'react'
import { useSelector } from 'react-redux'
import { orderList, orderLoading } from '../../feature/order/orderSlice'
import ImageCard from '../../components/ImageCard'
import { Link } from 'react-router-dom'
import Loading from '../../components/Loading'
import { TbBrandAppgallery } from 'react-icons/tb'
import Breadcrumbs from '../../components/Breadcrumbs'
import LoginProtect from '../../components/LoginProtect'

const Premium = () => {
  const loadingState = useSelector(orderLoading)
  const order = useSelector(orderList)
  const breadcrumbs = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "Premium Collection",
      link: "/premium",
    },
  ]
  return (
    <div className="section-container">
      <div className="outlet-container container">
        <div className='flex w-full flex-row flex-wrap gap-y-4 md:gap-y-2 justify-center md:justify-start'>
          {loadingState ? Array(6)?.fill()?.map((_, i) => <div className='w-full md:w-1/2 lg:w-1/3 2xl:w-1/4' key={i}> <Loading /> </div>) :
            <>
              <div className='w-full flex justify-between items-center border-b bg-sky-50 rounded p-2 text-gray-600'>
                <Breadcrumbs breadcrumbs={breadcrumbs} />
              </div>

              {order?.map(({ image }, i) => (
                <div className='w-full md:w-1/2 lg:w-1/3 2xl:w-1/4' key={i}>
                  <Link to={`/image/${image?._id}`}>
                    <ImageCard image={image} />
                  </Link>
                </div>
              ))}
            </>
          }
        </div>
      </div>
    </div>

  )
}

export default LoginProtect(Premium)