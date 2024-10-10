import { useEffect, useState } from "react"
import { IoMdAdd } from "react-icons/io"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { IoLockOpenOutline } from "react-icons/io5"
import { FaBars, FaUser, FaUserAlt } from "react-icons/fa"
import { getImagesAsync } from "../feature/images/imageSlice"
import { authToken, getUserAsync, loginUser, logout } from "../feature/auth/authSlice"
import { MdPermMedia } from "react-icons/md"
import { AiOutlineLogin } from "react-icons/ai"

const Header =() =>{
  const dispatch = useDispatch()
  const loginToken = useSelector(authToken)
  const user = useSelector(loginUser)

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };

  useEffect(()=>{
    if(loginToken) localStorage.setItem('token', loginToken)
    else localStorage.removeItem('token')
  }, [loginToken])
  
  useEffect(()=>{
    (async()=>{
      await dispatch(getImagesAsync())
      const user = await dispatch(getUserAsync());
      if(!user?.payload?.data)
      dispatch(logout())
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
          <div className="flex justify-end gap-4 items-center w-1/2">
            {!loginToken ?
            <Link to="/login" className="flex gap-4 justify-center items-center py-2 px-7  font-medium rounded-md border border-teal-300 bg-teal-500 text-white transition-colors duration-500 ease-in-out hover:bg-white hover:text-teal-500 "> <span><FaUser/></span> <span>Login</span></Link>
            :
            <div className="flex items-center gap-2">

              <div className="relative w-28 md:w-32">
                <div className="avatar placeholder" role="button" onClick={toggleDropdown}>
                  <div className="w-12 rounded-full bg-teal-500 text-white">
                    {user?.profilePicture ? (
                      <img src={user.profilePicture} alt="User Avatar" />
                    ) : (
                      <span className="text-xl font-medium uppercase">{user?.userName?.charAt(0)}</span>
                    )}
                  </div>
                </div>

                {isOpen && (
                  <div className="absolute bg-teal-400 left-0 mt-2 bg-white shadow-lg rounded-md z-10 w-full text-white font-medium">
                    <ul className="py-2">
                      <Link to="/profile" onClick={()=>setIsOpen(false)}>
                        <li className="flex justify-center items-center gap-2 pr-12 pl-4 py-2 hover:bg-red-400  cursor-pointer">
                          <span className="text-lg"><FaUserAlt /></span><span>Profile</span> 
                          </li>
                        </Link>
                      <li 
                        className="flex justify-center items-center gap-2 pr-12 pl-4 py-2 hover:bg-red-400 cursor-pointer"
                        onClick={()=>setIsOpen(false)}
                      >
                        <span className="text-lg"><MdPermMedia /></span><span>Media</span>
                      </li>
                      <li 
                        className="flex justify-center items-center gap-2 pr-12 pl-4 py-2 hover:bg-red-400 cursor-pointer"
                        onClick={()=>{ 
                          setIsOpen(false)
                          dispatch(logout())
                        }}
                        
                      >
                        <span className="text-lg"><AiOutlineLogin /></span><span>Logout</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
            }

            
            
            
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
