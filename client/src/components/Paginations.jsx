import React from 'react'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md'

const Paginations = ({paginations, setPage}) => {
    const { totalPage, pageSize, currentPage } = paginations
  return (
    <div className="flex justify-center mt-6">
      <div className="flex items-center space-x-2 bg-white shadow-lg rounded-lg p-3">
        {/* Double Left Arrow */}
        <button 
            className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-all duration-300 ease-in-out transform hover:scale-110"
            onClick={()=>setPage(1)}
            >
          <MdOutlineKeyboardDoubleArrowLeft />
        </button>

        {/* Left Arrow */}
        <button 
            className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-all duration-300 ease-in-out transform hover:scale-110"
            onClick={()=>setPage(currentPage-1)}

        >
          <MdKeyboardArrowLeft />
        </button>

        {/* Page Numbers */}
        {Array.from(Array(totalPage ?? 1).keys())?.filter((_,i)=>( i+1<4 || i+3 >= totalPage || i+1 === currentPage-1 || i+1 === currentPage || i+1 === currentPage+1)).map((val,i,arr)=>(
          <div key={i} className='flex gap-2'>
          {((currentPage > 5 && i === 3) || (currentPage < totalPage-4 && i === arr.length-3)) && <span className='flex items-end' ><BiDotsHorizontalRounded /></span>}
          <button 
              key={i} 
              className={`p-2 rounded-full ${currentPage=== val+1 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-green-300' } transition-all duration-300 ease-in-out transform hover:scale-105`}
              onClick={()=>setPage(val+1)}
              >
              {val+1}
          </button>
          {/* { && <span className='pt-2' ><BiDotsHorizontalRounded /></span>} */}
        
          </div>
        )
            
        )}

        {/* Right Arrow */}
        <button 
            className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-all duration-300 ease-in-out transform hover:scale-110"
            onClick={()=>setPage(currentPage+1)}

        >
          <MdKeyboardArrowRight />
        </button>

        {/* Double Right Arrow */}
        <button 
            className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-all duration-300 ease-in-out transform hover:scale-110"
            onClick={()=>setPage(totalPage)}
        >
          <MdOutlineKeyboardDoubleArrowRight />
        </button>
      </div>
    </div>
  )
}

export default Paginations