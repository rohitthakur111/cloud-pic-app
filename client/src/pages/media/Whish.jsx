import React, { useEffect, useState } from 'react'
import { whishItems, whishLoading } from '../../feature/whish/whishSlice'
import { useSelector } from 'react-redux'
import { imagesList } from '../../feature/images/imageSlice'
import Loading from '../../components/Loading'
import { Link } from 'react-router-dom'
import ImageCard from '../../components/ImageCard'

const Whish = () => {
    const loadingState = useSelector(whishLoading)
    const images = useSelector(imagesList)
    const whish = useSelector(whishItems)

    const [whishImage,setWhishImages] = useState([])

    useEffect(()=>{
        const whishList = images.filter(image =>{
            const index = whish?.indexOf(image?._id)
            return index >= 0;
        })
        setWhishImages(whishList)
        console.log(whishList)
    },[whish])

  return (
    <div className='flex w-full flex-row flex-wrap gap-y-4 md:gap-y-2 justify-center md:justify-start'>
      {loadingState ? Array(6)?.fill()?.map((_,i)=> <div className='w-full md:w-1/2 lg:w-1/3 2xl:w-1/4'  key={i}> <Loading/> </div>) : 
     
     whishImage?.map((image,i) => (
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

export default Whish