import React, { useEffect, useState } from 'react'
import ImageCard from '../../components/ImageCard'
import { useSelector } from 'react-redux'
import { imageLoading, imagesList } from "../../feature/images/imageSlice"
import { Link, useOutletContext } from 'react-router-dom'
import Loading from '../../components/Loading'

const Home = () => {
  const loadingState = useSelector(imageLoading)
  const images = useSelector(imagesList)
  const keyword  = useOutletContext();
  const [filterImages, setFilterImages] = useState([]);
  useEffect(()=>{
    if(!images) return
    if(!keyword) return setFilterImages(images)
      setFilterImages(images?.filter(image=> image.title.toLowerCase().includes(keyword.toLowerCase()) || image.description.toLowerCase().includes(keyword.toLowerCase())))
  },[images,keyword])

  return (
    <div className='flex w-full flex-row flex-wrap gap-y-4 md:gap-y-2 justify-center md:justify-start'>
      {loadingState ? Array(6)?.fill()?.map((_,i)=> <div className='w-full md:w-1/2 lg:w-1/3 2xl:w-1/4'  key={i}> <Loading/> </div>) : 
     
     filterImages?.map((image,i) => (
        <div className='w-full md:w-1/2 lg:w-1/3 2xl:w-1/4' key={i}>
          <Link to={`/image/${image?._id}`}>
          <ImageCard image={image}/>
          </Link>
        </div>
        
        ))
      }
    </div>
  )
}

export default Home