import React from 'react'

const ImageCard = ({image}) => {
  return (
    <div className={`p-4 md:p-4 card card-compact bg-base-100 w-96 shadow-xl rounded`}>
      <figure>
        <img
          className="h-96 max-h-96 w-full rounded"
          src={image?.imageUrl} 
          alt="Shoes" />
      </figure>
    </div>
  )
}

export default ImageCard
