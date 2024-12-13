import React, { useEffect, useState } from 'react'
import { getImageList } from '../../../feature/images/service'
import Breadcrumbs from '../../../components/Breadcrumbs'
import { useSearchParams } from 'react-router-dom'
import Table from './Table.jsx'
import Paginations from '../../../components/Paginations.jsx'
import PageSize from './PageSize.jsx'   
 // Type of images
 const options = [
    { title : "All", value : 'all'},
    { title : "Free", value : 'free'},
    {title : "Premium",value : 'premium'},
    { title : "Popular",value : 'popular'},
]

const index = () => {
   
    const [searchParams, setSearchParams] = useSearchParams();

    // declare initials query param
    const query  = {
        type : searchParams.get('type') || 'all',
        pagesize : searchParams.get('pagesize') || 5,
        currentpage : searchParams.get('currentpage') || 1,
    }
    /** set  initials query param */
    useEffect(()=>{
        setSearchParams(query)
    },[])


    // HANDLE CHAMNGE IMAGE TYPE
    const handleSelect = (e)=>{ 
        const newValue = e.target.value;
        setSearchParams((prevState)=>{
            const newParams = new URLSearchParams(prevState);
            newParams.set('type',newValue)
            return newParams
        })
    }

    const [images, setImages] = useState([])
    useEffect(()=>{
        (async ()=>{
            const type = searchParams.get('type')
            const pageSize = searchParams.get('pagesize')
            const currentPage = searchParams.get('currentpage')
            const query = `type=${type}&pagesize=${pageSize}&curentpage=${currentPage}`
            const response = await getImageList(query)
            if(response.status === "success"){
                const {totalImages, totalPages,images } = response
                setImages(images)
                setPaginations(prevState=> ({...prevState, totalImages, totalPages}))
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
    const [paginations,setPaginations] = useState({ 
        totalImages : 5,
        totalPages : 1,
        pageSize : Number(searchParams.get('pagesize')) || 5, 
        currentPage : Number(searchParams.get('currentpage')) || 1
    })

    // set current page 
    const setPage = (page)=> {
        if(page <1 || page > paginations.totalPages || page === paginations.currentPage) return
        setPaginations(prevState=>({...prevState, currentPage : page}))
    }
    const setPageSize = (pageSize)=> {
        if(pageSize === paginations.pageSize) return
        setPaginations(prevState=>({...prevState, pageSize}))
    }

    // handle params when change param
    useEffect(()=>{
        const {currentPage, pageSize } = paginations;
        setSearchParams((prevState=>{
            const newParams = new URLSearchParams(prevState)
            newParams.set('pagesize',pageSize)
            newParams.set('currentpage',currentPage)
            return newParams
        }))
    },[paginations])
  return (
    <div>
        <div className='flex justify-between items-center border-b bg-sky-50 rounded p-2 text-gray-600'>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <PageSize 
                handleSelect={handleSelect} 
                searchParams={searchParams} 
                options={options} 
                setPageSize={setPageSize}  
            />
        </div>
        <div className='mt-4'>
            <Table images={images} paginations={paginations}/>
        </div>
        <Paginations paginations={paginations} setPage={setPage}/>
    </div>
  )
}

export default index