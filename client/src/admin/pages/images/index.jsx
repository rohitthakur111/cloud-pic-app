import React, { useEffect, useRef, useState } from 'react'
import { getImageList } from '../../../feature/images/service'
import Breadcrumbs from '../../../components/Breadcrumbs'
import { useSearchParams } from 'react-router-dom'
import Table from './Table.jsx'
import Paginations from '../../../components/Paginations.jsx'
import PageSize from './PageSize.jsx'   
import PopupDialog from '../../components/PopupDialog.jsx'
import Loading from '../../components/Loading.jsx'
 // Type of images
 const options = [
    { title : "All", value : 'all'},
    { title : "Free", value : 'free'},
    {title : "Premium",value : 'premium'},
    { title : "Popular",value : 'popular'},
]

const index = () => {
   
    const [searchParams, setSearchParams] = useSearchParams();
    const [loading, setLoading] = useState(false)

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


    // HANDLE CHANGE IMAGE TYPE
    const handleSelect = (e)=>{ 
        const newValue = e.target.value;
        // setSearchParams((prevState)=>{
        //     const newParams = new URLSearchParams(prevState);
        //     newParams.set('type',newValue)
        //     return newParams
        // })
        setPage(1)
        setPaginations((prevState)=>({...prevState, type : newValue}))
    }

    const [images, setImages] = useState([])

    useEffect(()=>{
        (async ()=>{
            setLoading(true)
            const type = searchParams.get('type')
            const pageSize = searchParams.get('pagesize')
            const currentPage = searchParams.get('currentpage')
            const query = `type=${type}&pagesize=${pageSize}&currentpage=${currentPage}`
            try{
                const response = await getImageList(query)
                if(response.status === "success"){
                    const {totalImages, totalPages,images } = response
                    setImages(images)
                    setPaginations(prevState=> ({...prevState, totalImages, totalPages }))
                }
            }catch(err){
                console.log(err)
            }
            
            finally{
                setLoading(false)
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
        }
    ]

    // paginations data
    const [paginations,setPaginations] = useState({ 
        totalImages : 5,
        totalPages : 1,
        pageSize : Number(searchParams.get('pagesize')) || 5, 
        currentPage : Number(searchParams.get('currentpage')) || 1,
        type : searchParams.get('type') || 'popular'
    })

    // set current page 
    const setPage = (page)=> {
        if(page <1 || page > paginations.totalPages || page === paginations.currentPage) return
        setPaginations(prevState=>({...prevState, currentPage : page}))
    }
    const setPageSize = (pageSize)=> {
        if(pageSize === paginations.pageSize) return
        setPaginations(prevState=>({...prevState,currentPage : 1, pageSize}))
    }

    // handle params when change param
    useEffect(()=>{
        const {currentPage, pageSize, type } = paginations;
        
        setSearchParams((prevState=>{
            const newParams = new URLSearchParams(prevState)
            newParams.set('pagesize',pageSize)
            newParams.set('currentpage',currentPage)
            newParams.set('currentpage',currentPage)
            newParams.set('type',type)
            return newParams
        }))
    },[paginations,searchParams])

    if(loading === true) return <Loading />
  return (
    <div>
        <div className='flex flex-col md:flex-row justify-between items-center border-b bg-sky-50 rounded p-2 text-gray-600'>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <PageSize 
                handleSelect={handleSelect} 
                searchParams={searchParams} 
                options={options} 
                setPageSize={setPageSize}  
            />
        </div>
        <div className='mt-4'>
            <Table images={images} setImages={setImages} paginations={paginations}/>
        </div>
        <Paginations paginations={paginations} setPage={setPage}/>
    </div>
  )
}

export default index