
import React, { useEffect, useState } from 'react'
import { FaCloudUploadAlt, FaRegEdit } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import {  addImageAsync, editImageAsync, imageLoading  } from '../../../feature/images/imageSlice';
import Breadcrumbs from '../../../components/Breadcrumbs';
import  Form from '../newimage/Form';
import { useNavigate, useParams } from 'react-router-dom';
import { getImage } from '../../../feature/images/service';
import ErrorMessage from '../../../components/Error';

const EditImage = () => {
    const dispatch = useDispatch()
    const [loading, setloading] = useState(false)
    const [disable, setDisable] = useState(false)

    const [post, setPost] = useState({ title : '', description : '', image : null, imageType :'free', price:'', currency : "", imageUrl :''});
    const [error, setError] = useState({ title : '', description : '', image : '',price : '', currency : "", imageUrl :'' });

    let [updatePost, setUpdatedPost] = useState({});
    const [errorMessage, setErrorMessegae] = useState('')
    const navigate = useNavigate();
    const { id } = useParams()
    useEffect(()=>{
        setErrorMessegae("")
        if(!id) return
        (async()=>{
            try{
                const response = await getImage(id)
                if(response.status ==="success") {
                    setUpdatedPost({...response.image})
                    setPost(prevPost=> ({...prevPost, ...response.image}))
                }
            }catch(err){
                setErrorMessegae("Image not found!") 
            }
        })()
    },[id])

    // set loading of image 
    useEffect(()=>{
        var size = Object.keys(updatePost)?.length;
        if(!size) return
        let data = {};
        Object.keys(post)?.forEach(key=>{
            if(updatePost[key] !== post[key] && post[key]) {
                data[key] = post[key]
            }
        })
        setDisable(Boolean(!Object.keys(data)?.length));
      
    },[post])
    // handle post change 
    const handleChangePostData = (e)=> 
        setPost(prevPost=> ({...prevPost, [e.target?.name] : e.target.value}))
    const handleError = ()=>{
        let isError = false;
        let error = {};
        const { title, description, image, imageType, price, currency} = post;
        if(!title) error.title = "image title is required!"
        if(!description) error.description = "image description is required!"
        // if(!image) error.image = "Please select image to upload!"
        if(imageType ==='paid'){
        if(!price) error.price = "Enter image price!"
        if(!currency) error.currency = "Please select currency!"
        }
        setError(error);
        if(!title || !description) isError = true
        return isError;
    }
    
    // remove error if exist on change of post
    useEffect(()=>{
        const { title, description } = error;
        if(title || description ) handleError();
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
        setloading(true)
        const isError = handleError();
        if(isError) return
        const formData = new FormData();
        Object.keys(post)?.forEach(key=>{
            if(updatePost[key] !== post[key] && post[key] && key !== "imageUrl") {
                formData.append(key, post[key])
            }
        })
        let length = 0;
        for (let [key, value] of formData.entries()) length++;
        
        if(length === 0) return toast.success('No changes updated')
        const response = await dispatch(editImageAsync({id,formData}))
        if(response?.payload?.status === "success"){
            toast.success('Image Updated Successfully')
            setloading(false)
            setUpdatedPost(response?.payload?.image)
            navigate(`/admin/images/${id}`)
        }else toast.error('Image is not uploaded!')
        setloading(false)
    }

    // Change Image Type of 
    const changeImageType = (type)=>setPost(prevPost=>({...prevPost, imageType : type || 'free'}))
    const breadcrumbs = [
        {
            title : "Admin",
            link : "/Admin",
        },
        {
            title : "Edit Image",
            link : "",
        }
    ]

  return (
    <> 
    <div className='flex justify-between items-center position-sticky top-0 border-b bg-sky-50 rounded p-2 text-gray-600'>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
    </div>
    {errorMessage ? <ErrorMessage error={errorMessage}/> :
    <Form 
        handleSubmit={handleSubmit} 
        loading={loading} 
        post={post} 
        handleImageChange={handleImageChange} 
        handleChangePostData={handleChangePostData}
        error={error}
        changeImageType={changeImageType}
        buttonText = "Update Image"
        disable={disable}
        cancel={true}
        id={id}
    />
    } 
    </>
  )
}

export default EditImage