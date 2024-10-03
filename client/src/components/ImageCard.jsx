import React from 'react'

const ImageCard = ({image}) => {
  return (
   <div className="w-full md:p-4">
      <div className={`card card-compact bg-base-100 w-full shadow-xl rounded`}>
        <figure>
          <img
            className="h-96 max-h-96 w-full rounded object-cover"
            src={image?.imageUrl} 
            alt="Shoes" />
        </figure>
      </div>
    </div>
  )
}

export default ImageCard
