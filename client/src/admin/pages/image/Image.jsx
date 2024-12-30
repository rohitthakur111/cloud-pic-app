import React from 'react'
import SingleImage from '../../../components/SingleImage';
import { Link } from 'react-router-dom';
const Image = ({image}) => {
    return (
        <div className="flex flex-col items-start lg:flex-row gap-8  my-4 pb-8 border-b">
            <SingleImage image={image}/>
            <div className="lg:w-1/2 md:p-4">
                <h2 className="text-xl font-semibold mb-4">{image?.title}</h2>
                <p className="mb-4">{image?.description}</p>
                {image?.imageType === 'paid' && 
                    <p className="mb-4">
                        Image Price : <span className="font-semibold text-yellow-500">{image.price} {image?.currency} </span> 
                    </p>
                }
                <div className='flex gap-2'>
                    <button 
                            type="button"
                            className="btn bg-red-500 text-white transition-colors duration-500 ease-in-out  hover:bg-red-400"
                            onClick={ async ()=> await handleDownloadPremium()}
                        >
                            Delete
                    </button>
                    <Link 
                            type="button"
                            className="btn bg-green-500 text-white transition-colors duration-600 ease-in-out  hover:bg-green-500"
                            to='edit'
                        >
                            Edit
                    </Link>
                </div>
             </div>
        </div>
    )
}

export default Image