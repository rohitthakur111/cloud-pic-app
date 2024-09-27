import React from 'react'
import ImageCard from '../../components/ImageCard'
import { useSelector } from 'react-redux'
import { imageLoading, imagesList } from '../../feature/imageSlice'
import { Link } from 'react-router-dom'
import Loading from '../../components/Loading'

const Home = () => {
  const loadingState = useSelector(imageLoading)

  const images = useSelector(imagesList)
  return (
    <div className='flex w-full flex-row flex-wrap gap-y-4 justify-center md:justify-start'>
      {loadingState ? Array(6)?.fill()?.map((_,i)=><Loading key={i}/>) : 
     
      images?.map((image,i) => (
        <div className='w-full md:w-1/4'>
          <Link to={`/image/${image?._id}`} key={i}>
          <ImageCard image={image}/>
          </Link>
        </div>
        
        ))
      }
    </div>
  )
}

export default Home