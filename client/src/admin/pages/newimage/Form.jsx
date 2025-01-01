import React from 'react'
import { FaCloudUploadAlt, FaRegEdit } from 'react-icons/fa'
import SingleImage from '../../../components/SingleImage'
import { Link } from 'react-router-dom'

const Form = ({handleSubmit, disable, loading, post, handleImageChange,handleChangePostData, error,changeImageType, buttonText="Upload Image", id}) => {
  return (
    <form onSubmit={handleSubmit}>
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
                    <input type='file' 
                        name="image" 
                        className='h-0 w-0 m-0 p-0' 
                        id="add-new-image" 
                        key={post?.imageUrl} 
                        onChange={handleImageChange}
                        accept='image/*'
                    />
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
                            rows={5}

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
                        <button type="submit" className="btn btn-error uppercase text-white" disabled={disable || loading}>
                            {buttonText}
                            {loading && <span className="loading loading-spinner text-xs text-error"></span>}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </form>
  )
}

export default Form