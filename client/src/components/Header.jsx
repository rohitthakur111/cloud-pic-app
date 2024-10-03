import { useEffect } from "react"
import { IoMdAdd } from "react-icons/io"
import { getImagesAsync } from "../feature/imageSlice"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { IoLockOpenOutline } from "react-icons/io5"
import { FaUser } from "react-icons/fa"

const Header =() =>{
  const dispatch = useDispatch()
  useEffect(()=>{
    (async()=>{
      await dispatch(getImagesAsync())
    })()
  },[])
  return (
    <>
     <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700 border-b-2 border-gray-100 sticky top-0 z-50 px-2 md:px-16 bg-white">
        <div className="flex items-center justify-between md:mx-12 p-4">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="/images/logo.png" className="h-12 md:h-20" alt="Flowbite Logo" />
            <span className="self-center text-xl md:text-2xl font-semibold whitespace-nowrap dark:text-white">Pic Nest</span>
          </Link>
          <div className="flex gap-4">
            <Link to="/login" className="flex gap-4 justify-center items-center py-2 px-7  font-medium rounded-md border border-teal-300 bg-teal-500 text-white transition-colors duration-500 ease-in-out hover:bg-white hover:text-teal-500 "> <span><FaUser/></span> <span>Login</span></Link>
            {/* <Link to="upload-image" className="btn py-1 px-5 btn-error text-white text-uppercase"> <IoMdAdd /> Upload Image</Link> */}
          </div>
        </div>
    </nav>

    <Toaster
        position="top-center"
        reverseOrder={false}
    />
    </>
   
    
  )
}

export default Header
