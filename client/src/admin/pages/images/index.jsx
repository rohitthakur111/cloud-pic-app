import React, { useEffect, useState } from 'react'
import { getImageList } from '../../../feature/images/service'
import Breadcrumbs from '../../../components/Breadcrumbs'
import { useSearchParams } from 'react-router-dom'
import Table from './Table.jsx'
import Paginations from '../../../components/Paginations.jsx'
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
        setSearchParams((prevState)=>({...prevState, type : e.target.value}))
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

    // paginations data
    const [paginations,setPaginations] = useState({ totalPage : 20, pageSize : 5, currentPage : 3})

    // set current page
    const setPage = (page)=> {
        if(page <1 || page > paginations.totalPage || page === paginations.currentPage) return
        setPaginations(prevState=>({...prevState, currentPage : page}))
    } 
    useEffect(()=>{
        setSearchParams((prevState=>({...prevState, ...paginations})))
    },[paginations])
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
        <Paginations paginations={paginations} setPage={setPage}/>
    </div>
  )
}

export default index