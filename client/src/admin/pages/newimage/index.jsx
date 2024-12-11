
import React, { useEffect, useState } from 'react'
import { FaCloudUploadAlt, FaRegEdit } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import {  addImageAsync, imageLoading  } from '../../../feature/images/imageSlice';
import SingleImage from '../../../components/SingleImage';
import Breadcrumbs from '../../../components/Breadcrumbs';

const AddImage = () => {
    const dispatch = useDispatch()
    const loading = useSelector(imageLoading)
    const [post, setPost] = useState({ title : '', description : '', image : null, imageType :'free', price:'', currency : "", imageUrl :''});
    const [error, setError] = useState({ title : '', description : '', image : '',price : '', currency : "", imageUrl :'' });

    // handle post change 
    const handleChangePostData = (e)=> 
        setPost(prevPost=> ({...prevPost, [e.target?.name] : e.target.value}))


    const handleError = ()=>{
        let isError = false;
        let error = {};
        const { title, description, image, imageType, price, currency} = post;
        if(!title) error.title = "image title is required!"
        if(!description) error.description = "image description is required!"
        if(!image) error.image = "Please select image to upload!"
        if(imageType ==='paid'){
        if(!price) error.price = "Enter image price!"
        if(!currency) error.currency = "Please select currency!"

        }
        setError(error);
        if(!title || !description || !image) isError = true
        return isError;
    }
    
    // remove error if exist on change of post
    useEffect(()=>{
        const { title, description, image } = error;
        if(title || description || image) handleError();
    },[post])

    // handle image change 
    const handleImageChange = (e)=>{
      if(e.target.files[0]){
        let imageUrl = URL.createObjectURL(e.target.files[0]);
        setPost(prevPost=> ({...prevPost, image : e.target.files[0], imageUrl}))
      }
    }

    // handle for submit
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const isError = handleError();
        if(isError) return
        const formData = new FormData();
        Object.keys(post)?.forEach(key=>{
            formData.append(key, post[key])
        })
        const response = await dispatch(addImageAsync(formData))
        if(response?.payload?.status === "success"){
            setPost({ title : '', description : '', image : null, imageUrl : ''})
            toast.success('Image Upload Successfully')
        }else toast.error('Image is not uploaded!')
    }

    // Change Image Type of 
    const changeImageType = (type)=>setPost(prevPost=>({...prevPost, imageType : type || 'free'}))
    const breadcrumbs = [
        {
            title : "Admin",
            link : "/Admin",
        },
        {
            title : "Add New Image",
            link : "",
        }
    ]

  return (
    <form onSubmit={handleSubmit}>
        <div className='flex justify-between items-center position-sticky top-0 border-b bg-sky-50 rounded p-2 text-gray-600'>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        </div>
        <div className='w-full flex justify-center mt-4'>
            <div className='flex flex-col w-full lg:flex-row gap-4 md:gap-20 xl:w-3/4 justify-center items-center md:items-start'>
                <div className={`w-full xl:w-1/2 ${!post?.imageUrl && 'border border-dashed'}`}>
                    <label htmlFor='add-new-image' className='flex justify-center flex-col items-center hover:cursor-pointer relative'>
                        {post?.imageUrl? <p className='absolute right-1 z-10 top-1 text-gray text-xl text-blue-700'> <FaRegEdit /></p> 
                        :<>
                        <p className='flex justify-center text-5xl md:text-9xl'><FaCloudUploadAlt /></p>
                        <p className='flex justify-center text-sm md:text-xl text-red'> 
                            Drag & drop or click to choose files
                        </p>
                        </>
                        }
                        {error?.image && <p className='text-base font-medium f-style-i italic error'>{error?.image}</p>}
                    </label>
                    {post?.imageUrl &&<SingleImage image={post} />}
                    <input type='file' name="image" className='h-0 w-0 m-0 p-0' id="add-new-image" key={post?.imageUrl} onChange={handleImageChange}/>
                </div>

                <div className='w-full xl:w-1/2'>
                    <div className='flex flex-col text-xl gap-1'>
                        <label>Title</label>
                        <input type="text"
                            placeholder="Title..." 
                            className="input input-bordered w-full" 
                            name="title"
                            value={post?.title}
                            onChange={handleChangePostData}
                        />
                        {error?.title && <p className='text-base font-medium f-style-i italic error'>{error?.title}</p>}
                    </div>

                    <div className='flex flex-col text-xl gap-1 mt-4'>
                        <label>Description</label>
                        <textarea 
                            className="textarea textarea-bordered" 
                            placeholder="Description.." 
                            name="description"
                            value={post?.description}
                            onChange={handleChangePostData}
                            rows={3}
                        >
                        </textarea>
                        {error?.description && <p className='text-base font-medium f-style-i italic error'>{error?.description}</p> }
                    </div>
                    <div className='flex flex-col gap-1 mt-4'>
                        <label className='text-xl'>Select Image Type:</label>
                        <div className='flex gap-4'>
                        <button 
                            type="button"
                            className={`flex gap-4 justify-center items-center py-2 px-7  font-medium rounded-md border   text-white ${post?.imageType === 'free'? 'bg-teal-500' : 'bg-gray-400'}`}
                            onClick={()=>changeImageType('free')}
                        >
                        Free Image
                        </button>
                        <button 
                            type="button"
                            className={`flex gap-4 justify-center items-center py-2 px-7  font-medium rounded-md border   text-white ${post?.imageType === 'paid'? 'bg-teal-500' : 'bg-gray-400'}`}
                            onClick={()=>changeImageType('paid')}

                        >
                            Premium Image
                        </button>
                        </div>
                        
                    </div>
                    {post?.imageType === 'paid' && 
                    <div className='flex flex-col text-xl gap-1 mt-4'>
                        <label>Image Price:</label>
                        <input 
                            type="number" 
                            placeholder='Price' 
                            className='input input-bordered w-full'
                            min={0}
                            name="price"
                            value={post?.price}
                            onChange={handleChangePostData}
                        />
                        <label className='mt-4'>Currency Type:</label>
                        <select 
                            className="select select-bordered w-full"
                            name="currency"
                            value={post?.currency || ''}
                            onChange={handleChangePostData}
                        >
                            <option value="" disabled>Choose Currency Type</option>
                            <option value="INR">INR</option>
                            <option value="USD">USD</option>
                        </select>
                    </div>
                    }
                    <div className='flex flex-col text-xl gap-1 mt-4'>
                        <button type="submit" className="btn btn-error uppercase text-white" disabled={loading}>
                            Upload Image
                            {loading && <span className="loading loading-spinner text-xs text-error"></span>}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </form>
  )
}

export default AddImage