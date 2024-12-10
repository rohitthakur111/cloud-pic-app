import React, { useEffect, useState } from 'react'
import Table from './table'
import { getImageList } from '../../../feature/images/service'
import Breadcrumbs from '../../../components/Breadcrumbs'
import { useSearchParams } from 'react-router-dom'

const index = () => {
    const options = [
        { title : "All", value : 'all'},
        { title : "Free", value : 'free'},
        {title : "Premium",value : 'premium'},
        { title : "Popular",value : 'popular'},
    ]
   const [searchParams, setSearchParams] = useSearchParams();
    const [imageType, setImageType] = useState(searchParams.get('type') || '')

    // HANDLE CHAMNGE IMAGE TYPE
    const handleSelect = (e)=>{ 
        setImageType(e.target.value)
        setSearchParams({type : e.target.value})
    }
    const [images, setImages] = useState([])
    useEffect(()=>{
        (async ()=>{
            const response = await getImageList({ type : imageType})
            if(response.status === "success"){
                setImages(response.images)
            }
        })()
    },[searchParams])
    const breadcrumbs = [
        {
            title : "Admin",
            link : "/Admin",
        },
        {
            title : "Images",
            link : "",
        }
    ]
  return (
    <div>
        <div className='flex justify-between items-center position-sticky top-0 border-b bg-sky-50 rounded p-2 text-gray-600'>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <div>
            <select 
                className="select w-full max-w-xs  select-bordered" 
                value={imageType}
                onChange={handleSelect}
            >
                <option value="" disabled defaultValue>Select your images</option>
                {options.map((option,i)=> <option value={option.value} key={i}>{option.title} </option>)}
               
                </select>
            </div>
        </div>
        <div className='mt-4'>
            <Table images={images}/>
        </div>
    </div>
  )
}

export default index