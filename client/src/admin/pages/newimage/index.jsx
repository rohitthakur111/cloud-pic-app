
import React, { useEffect, useState } from 'react'
import { FaCloudUploadAlt, FaRegEdit } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import {  addImageAsync, imageLoading  } from '../../../feature/images/imageSlice';
import Breadcrumbs from '../../../components/Breadcrumbs';
import  Form from './Form.jsx';

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
            title : "Images",
            link : "/Admin/Images",
        },
        {
            title : "Add New",
            link : "",
        }
    ]

  return (
    <> 
    <div className='flex justify-between items-center position-sticky top-0 border-b bg-sky-50 rounded p-2 text-gray-600'>
    <Breadcrumbs breadcrumbs={breadcrumbs} />
    </div>
    <Form 
        handleSubmit={handleSubmit} 
        loading={loading} 
        post={post} 
        handleImageChange={handleImageChange} 
        handleChangePostData={handleChangePostData}
        error={error}
        changeImageType={changeImageType}
    />
    </>
  )
}

export default AddImage