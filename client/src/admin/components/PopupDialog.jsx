import React, { useEffect, useRef } from 'react';
import { RiCloseLine, RiDeleteBin6Line } from 'react-icons/ri';

const PopupDialog = ({ icon=false, message, title, onConfirm, isOpen,setIsOpen,deleteRef,loading=false,setDeleteLoading }) => {
  
  const popUp = useRef(null)
   
  useEffect(() => {
    const handleClickOutside = (e) => {
        if (
          isOpen &&
          !popUp?.current?.contains(e.target) &&
          !Object.values(deleteRef.current).some((ref) => ref && ref.contains(e.target))
        ) {
            setIsOpen(false);
            setDeleteLoading(false);
        }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
        document.removeEventListener('click', handleClickOutside);
    };
}, [isOpen, setIsOpen, deleteRef]);


  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto mt-32 p-3" ref={popUp}>
        {/* Close Button */}
        <div className="flex justify-end text-gray-600">
          <button
            onClick={()=>setIsOpen(false)}
            className="rounded-full hover:bg-gray-200 transition duration-200"
          >
            <RiCloseLine size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-4">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-red-200 p-3 text-red-500 rounded-full text-2xl">
              {icon ? 
              icon :
              <RiDeleteBin6Line />
              } 
              
            </div>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 text-center mb-2">Are you sure?</h2>
          <p className="text-center text-gray-600 mb-6">
            {message} <span className="font-semibold text-gray-800">"{title}"</span>
          </p>

          {/* Buttons */}
          <div className="flex justify-center space-x-4 mb-4">
            <button
              onClick={()=>setIsOpen(false)}
              className="px-4 py-2 bg-blue-100 text-blue-500 rounded-md text-lg font-medium transition duration-300 ease-in-out transform hover:bg-blue-500 hover:text-white hover:scale-105"
            >
              No, Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className={`px-4 py-2 flex items-center gap-2 bg-red-100 text-red-500 rounded-md text-lg font-medium ${!loading ? 'transition duration-300 ease-in-out transform hover:bg-red-500 hover:text-white hover:scale-105' : '' }`}
            >
              Yes, Delete
              {loading && <div className="animate-spin h-5 w-5 border-2 border-t-transparent border-red-500 rounded-full"></div>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupDialog;
