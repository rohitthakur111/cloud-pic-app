import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getImage } from '../../../feature/images/service';
import SingleLoading from '../../../components/SingleLoading'
import { useParams } from 'react-router-dom';
import Breadcrumbs from '../../../components/Breadcrumbs';
import ErrorMessage from '../../../components/Error';
import Image from './Image'
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

const index = () => {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('');
    const {id} =  useParams()
    const dispatch = useDispatch()
    
    useEffect(()=>{
        if(!id)return
        (async()=>{
            setError('')   
            setLoading(true)
            try{
                const response = await getImage(id)
                setLoading(false)
                if(response.status ==="success") return setImage(response.image)
            }catch(err){
             setError("Image not found") 
            setLoading(false)
        }
        })()
    },[])

  return (
    <div>
        <div className='flex justify-between items-center border-b bg-sky-50 rounded p-2 text-gray-600'>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
        </div>
        {error && <ErrorMessage error={error}/>}
        {loading && <SingleLoading />}
        {!error && !loading && image &&
        <>  
            <Image image={image}/>
        </> 
        }

    </div>
  )
}

export default index