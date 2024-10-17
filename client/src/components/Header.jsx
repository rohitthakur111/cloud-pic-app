import { useEffect, useState } from "react"
import { IoMdAdd } from "react-icons/io"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { IoLockOpenOutline } from "react-icons/io5"
import { FaBars, FaUser, FaUserAlt } from "react-icons/fa"
import { getImagesAsync } from "../feature/images/imageSlice"
import { authToken, getUserAsync, loginUser, logout } from "../feature/auth/authSlice"
import { MdPermMedia } from "react-icons/md"
import { AiOutlineLogin } from "react-icons/ai"
import { getWhishASync } from "../feature/whish/whishSlice"
import { getOrderAsync } from "../feature/order/orderSlice"
import Modal from "./Modal"
import { modalState, setTransition, showHideModal } from "../feature/visual/visualSlice"

const Header =() =>{
  const { pathname } = useLocation()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const loginToken = useSelector(authToken)
  const user = useSelector(loginUser)

  const isModalOpen = useSelector(modalState)

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
    })()
  },[])

  // get logged user 
  useEffect(()=>{
    if(loginToken){
      (async()=>{
        const user = await dispatch(getUserAsync());
        if(!user?.payload?.data)
        dispatch(logout())
      })()
    }
  },[loginToken])
  
  // get whish item if user logged in 
  useEffect(()=>{
    if(loginToken){
      (async()=>{
        await dispatch(getOrderAsync())
         await dispatch(getWhishASync())
      })()
    }
  },[loginToken])

  // handle Login moadal on login btn
  const handleLoginModal = ()=>{
    if(pathname === '/login') 
      return
    if(pathname === '/register') { 
      dispatch(setTransition(true))
      navigate('/login')
        setTimeout(()=>{
            dispatch(setTransition(false))
        },800)
      return 
    }
    dispatch(showHideModal(true))
  }

  useEffect(()=> {dispatch(showHideModal(false))},[pathname, loginToken])
  // hide context meu ** imp
  window.addEventListener("contextmenu", e => e.preventDefault());
  document.onkeydown = (e) => {
    if (e.key == 123) {
        e.preventDefault();
    }
    if (e.ctrlKey && e.shiftKey && e.key == 'I') {
        e.preventDefault();
    }
    if (e.ctrlKey && e.shiftKey && e.key == 'C') {
        e.preventDefault();
    }
    if (e.ctrlKey && e.shiftKey && e.key == 'J') {
        e.preventDefault();
    }
    if (e.ctrlKey && e.key == 'U') {
        e.preventDefault();
    }
  };  


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
            <button 
              className="flex gap-4 justify-center items-center py-2 px-7  font-medium rounded-md border border-teal-300 bg-teal-500 text-white transition-colors duration-500 ease-in-out hover:bg-white hover:text-teal-500"
              onClick={()=>handleLoginModal()} 
              > 
              <span><FaUser/></span> <span>Login</span>
            </button>
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
                  <div className="absolute bg-teal-400 left-0 mt-2 shadow-lg rounded-md z-10 w-full text-white font-medium w-auto">
                    <ul className="py-2">
                      <Link to="/profile" onClick={()=>setIsOpen(false)}>
                        <li className="flex  items-center gap-2 pr-12 pl-4 py-2 hover:bg-red-400  cursor-pointer">
                          <span className="text-lg"><FaUserAlt /></span><span>Profile</span> 
                          </li>
                        </Link>
                      <Link to="/whish"
                        className="flex  items-center gap-2 pr-12 pl-4 py-2 hover:bg-red-400 cursor-pointer"
                        onClick={()=>setIsOpen(false)}
                      >
                        <span className="text-lg"><MdPermMedia /></span><span>Favourites</span>
                      </Link>
                      <li 
                        className="flex  items-center gap-2 pr-12 pl-4 py-2 hover:bg-red-400 cursor-pointer"
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

    {isModalOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300">
          <div 
              className="absolute inset-0 bg-black opacity-70 transition-opacity duration-300"
              onClick={()=> dispatch(showHideModal(false))}
          ></div>
          <div className="flex bg-slate-100 items-center flex-col rounded-lg shadow-lg p-6 z-10 transition-transform duration-300 scale-100">
              <Modal/>
          </div>
      </div>
    )}


    <Toaster
        position="top-center"
        reverseOrder={false}
    />
    </>
   
    
  )
}

export default Header
