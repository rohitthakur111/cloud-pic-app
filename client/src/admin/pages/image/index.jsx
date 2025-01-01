import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getImage, removeImage } from '../../../feature/images/service';
import SingleLoading from '../../../components/SingleLoading'
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Breadcrumbs from '../../../components/Breadcrumbs';
import ErrorMessage from '../../../components/Error';
import Image from './Image'
import PopupDialog from '../../components/PopupDialog';
import toast from 'react-hot-toast';


const index = () => {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('');
    const {id} =  useParams()
    const [deleteLoading, setDeleteLoading] = useState(false)
    const navigate = useNavigate()

    const breadcrumbs = [
        {
            title : "Admin",
            link : "/Admin",
        },
        {
            title : "Images",
            link : "/Admin/images",
        },
        {
            title : image?.title,
        }
    ]

    useEffect(()=>{
        if(!id)return
        (async()=>{
            setError('')   
            setLoading(true)
            try{
                const response = await getImage(id)
                setLoading(false)
                if(response.status ==="success" && response.image) return setImage(response.image)
                return setError("Image not found") 
            }catch(err){
            setError("Image not found") 
            setLoading(false)
        }
        })()
    },[id])

    
    // delete image 
    const [isOpen, setIsOpen] = useState(false)
    const deleteRef = useRef({})

    const handleDeleteClick = ()=> {
        setIsOpen(true)
    }

    const deletePost = async ()=>{
        try{
            setDeleteLoading(true)
            const response = await removeImage(id)
            if(response.status ==="success") {
                setIsOpen(false)
                toast.success('Post deleted successfully')
                navigate("/Admin/images")
            }
            setDeleteLoading(false)
        }catch(err){
            setIsOpen(false)
            setDeleteLoading(false)
            toast.success(err.response.error || 'Post is not deleted!')
        }
    }
  return (
    <div>
        <PopupDialog 
            message="Are you sure want to delete image" 
            title={image?.title}
            onConfirm={deletePost} 
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            deleteRef={deleteRef}
            loading={deleteLoading}
            setDeleteLoading={setDeleteLoading}
        />
        <div className='flex justify-between items-center border-b bg-sky-50 rounded p-2 text-gray-600'>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
        </div>
        {error && <ErrorMessage error={error}/>}
        {loading && <SingleLoading />}
        {!error && !loading && image &&
        <>  
            <Image image={image} deleteClick={handleDeleteClick} deleteRef={deleteRef}/>
        </> 
        }

    </div>
  )
}

export default index