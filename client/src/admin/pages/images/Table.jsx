import React, { useRef, useState } from 'react'
import { FiEdit } from 'react-icons/fi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import PopupDialog from '../../components/PopupDialog'
import toast from 'react-hot-toast'
import { removeImage } from '../../../feature/images/service'

const Table = ({images, paginations, setImages}) => {
        
    // delete image 
    const [isOpen, setIsOpen] = useState(false)
    const deleteRef = useRef({})
    const [image, setImage] = useState(null)
    const [deleteLoading, setDeleteLoading] = useState(false)

    const handleDeleteClick = (image)=> {
        setImage(image)
        setIsOpen(true)
    }

    const deletePost = async ()=>{
        try{
            setDeleteLoading(true)
            const response = await removeImage(image._id)
            if(response.status ==="success") {
                setIsOpen(false)
                toast.success('Post deleted successfully')
                setImages(prevState=> prevState.filter(item=>item._id !== response.id))
            }
            setDeleteLoading(false)
        }catch(err){
            setIsOpen(false)
            setDeleteLoading(false)
            toast.error(err.response?.error || 'Post is not deleted!')
        }
    }
   
  return (
    <div className='rounded-sm shadow-default '>
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
        <div className='w-full grid grid-cols-3 rounded-sm bg-gray-50 sm:grid-cols-6 p-4'>
            <h5 className="text-sm center font-medium xsm:text-base">#</h5>
            <h5 className="text-sm font-medium  xsm:text-base">Image</h5>
            <h5 className="text-sm font-medium xsm:text-base">Title</h5>
            <h5 className="text-sm font-medium xsm:text-base">Price</h5>
            <h5 className="text-sm font-medium xsm:text-base">Sales</h5>
            <h5 className="text-sm font-medium xsm:text-base text-center">Action</h5>
        </div>
        {images.map((image,i)=>(
           <div key={i} className="grid grid-cols-3 border-b border-stroke sm:grid-cols-6 p-4">
            <div className="items-center">
                <p className="font-medium text-black">{((paginations.currentPage-1) * paginations.pageSize)+ i+1}</p>
            </div>

            <div className="flex-shrink-0">
                <Link to={`${image._id}`}>
                    <img className="w-12 rounded-full h-12" src={image.imageUrl} alt="Brand"/>
                </Link>
            </div>
     
            <div className="items-center">
                <Link to={`${image._id}`}>
                    <p className="font-medium text-black">{image.title}</p>
                </Link>
            </div>
            <div className="items-center">
                <p className="font-medium text-black font-semibold">
                    {image?.price? image.price : 'Free'}
                    <span className='text-yellow-500 text-semibold font-semibold'> {image?.currency &&  image.currency}</span>
                </p>
            </div>
            <div className="items-center">
                <p className="font-medium text-black">{image.orderCount}</p>
            </div>
            <div className="items-center ">
               <div className='flex justify-center gap-2'>
                    <button 
                        className='bg-red-500 text-white p-2 rounded'
                        onClick={()=> handleDeleteClick(image)}
                        ref={(el) => (deleteRef.current[image._id] = el)}
                        >
                        <RiDeleteBin6Line />
                    </button>
                    <Link to={`/admin/images/${image._id}/edit`} className='bg-green-500 text-white p-2 rounded'><FiEdit /></Link>
               </div>
            </div>
          
         </div>
        ))}
        
    </div>  
  )
}

export default Table