import Breadcrumbs from '../../components/Breadcrumbs'
import React, { useEffect, useState } from 'react'
import { imageLoading, imagesList } from '../../feature/images/imageSlice'
import { useSelector } from 'react-redux'
import { Link, useOutletContext } from 'react-router-dom'
import Loading from '../../components/Loading'
import ImageCard from '../../components/ImageCard'


const breadcrumbs = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "Paid Images",
    },
  ]

const Paid = () => {
    const [freeImages, setFreeimages] = useState([])
    const loadingState = useSelector(imageLoading)
    const images = useSelector(imagesList)
    const keyword  = useOutletContext();
    const [filterImages, setFilterImages] = useState([]);

    // select free images
    useEffect(()=>{
        setFreeimages(images.filter(image=> image?.imageType == 'paid'))
      },[images])

      useEffect(()=>{
        if(!images) return
        if(!keyword) return setFilterImages(freeImages)
          setFilterImages(freeImages?.filter(image=> image.title.toLowerCase().includes(keyword.toLowerCase()) || image.description.toLowerCase().includes(keyword.toLowerCase())))
      },[freeImages,keyword])

  return (
    <div className="section-container">
      <div className="outlet-container container">
        <div className='flex w-full flex-row flex-wrap gap-y-4 md:gap-y-2 justify-center md:justify-start'>
          {loadingState ? Array(6)?.fill()?.map((_, i) => <div className='w-full md:w-1/2 lg:w-1/3 2xl:w-1/4' key={i}> <Loading /> </div>) :
            <>
              <div className='w-full flex justify-between items-center border-b bg-sky-50 rounded p-2 text-gray-600'>
                <Breadcrumbs breadcrumbs={breadcrumbs} />
              </div>

              {filterImages?.map((image,i) => (
              <div className='w-full md:w-1/2 lg:w-1/3 2xl:w-1/4' key={i}>
                <Link to={`/image/${image?._id}`}>
                <ImageCard image={image}/>
                </Link>
              </div>
              
              ))
            }
            </>
          }
        </div>
      </div>
    </div>

  )
}

export default Paid