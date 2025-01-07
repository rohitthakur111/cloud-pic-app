import React, { useEffect, useState } from 'react'
import { whishItems, whishLoading } from '../../feature/whish/whishSlice'
import { useSelector } from 'react-redux'
import { imagesList } from '../../feature/images/imageSlice'
import Loading from '../../components/Loading'
import { Link } from 'react-router-dom'
import ImageCard from '../../components/ImageCard'
import { TfiGallery } from 'react-icons/tfi'
import Breadcrumbs from '../../components/Breadcrumbs'
import LoginProtect from '../../components/LoginProtect'

const Whish = () => {
  const loadingState = useSelector(whishLoading)
  const images = useSelector(imagesList)
  const whish = useSelector(whishItems)

  const [whishImage, setWhishImages] = useState([])

  useEffect(() => {
    const whishList = images.filter(image => {
      const index = whish?.indexOf(image?._id)
      return index >= 0;
    })
    setWhishImages(whishList)
  }, [whish])

  // Breadcrums
  const breadcrumbs = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "Whish",
      link: "/whish",
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

              {whishImage?.map((image, i) => (
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

export default LoginProtect(Whish)