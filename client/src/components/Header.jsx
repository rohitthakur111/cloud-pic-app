import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { FaBars, FaUser } from "react-icons/fa";
import { authToken, getUserAsync, loginUser, logout } from "../feature/auth/authSlice";
import { getImagesAsync } from "../feature/images/imageSlice";
import { getWhishASync } from "../feature/whish/whishSlice";
import { getOrderAsync } from "../feature/order/orderSlice";
import Modal from "./Modal"; // Assuming the Modal component is imported correctly
import { modalState, setTransition, showHideModal } from "../feature/visual/visualSlice";
import { PROD_ENV } from "../api";
import { IoCloseOutline } from "react-icons/io5";

const Header = ({ keyword, setKeyword }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const dropDownRef = useRef(null);
  const dropDownRefBtn = useRef(null);
  const sidebarRef = useRef(null);
  const menuRef = useRef(null)

  const loginToken = useSelector(authToken);
  const user = useSelector(loginUser);
  const isModalOpen = useSelector(modalState);

  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 
  const [isBackgroundBlurred, setIsBackgroundBlurred] = useState(false); 

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setIsBackgroundBlurred(!isSidebarOpen);
  };

  useEffect(() => {
    if (loginToken) localStorage.setItem("token", loginToken);
    else localStorage.removeItem("token");
  }, [loginToken]);

  useEffect(() => {
    (async () => {
      await dispatch(getImagesAsync());
    })();
  }, []);

  useEffect(() => {
    if (loginToken) {
      (async () => {
        const user = await dispatch(getUserAsync());
        if (!user?.payload?.data) dispatch(logout());
      })();
    }
  }, [loginToken]);

  useEffect(() => {
    (async () => {
      await dispatch(getOrderAsync());
      await dispatch(getWhishASync());
    })();
  }, [loginToken]);

  const handleLoginModal = () => {
    if (pathname === "/login") return;
    if (pathname === "/register") {
      dispatch(setTransition(true));
      navigate("/login");
      setTimeout(() => {
        dispatch(setTransition(false));
      }, 800);
      return;
    }
    // Dispatch to open the modal
    dispatch(showHideModal(true));
  };

  useEffect(() => {
    // Close the modal when pathname or loginToken changes
    dispatch(showHideModal(false));
  }, [pathname, loginToken]);

  // const handleClickOutside = (event) => {
  //   if (
  //     isSidebarOpen &&
  //     sidebarRef.current &&
  //     !sidebarRef.current.contains(event.target) &&
  //     dropDownRefBtn.current &&
  //     !dropDownRefBtn.current.contains(event.target)&& 
  //     menuRef.current && 
  //     menuRef.current.contains(event.terget)
  //   ) {
  //     setIsSidebarOpen(false);
  //     setIsBackgroundBlurred(false);
  //     console.log("outside")
  //   }
  // };

  useEffect(()=>{
    const handleClickOutside = (e)=>{
      if(!isOpen) return
      if(menuRef.current && !menuRef.current.contains(e.target)){
        setIsOpen(false)
      }
    }
    document.addEventListener("click", handleClickOutside);
    return ()=> document.removeEventListener("click", handleClickOutside)
  },[isOpen])
 

  if (PROD_ENV) window.addEventListener("contextmenu", (e) => e.preventDefault());
  document.onkeydown = (e) => {
    if (e.key === "123") e.preventDefault();
    if (e.ctrlKey && e.shiftKey && ["I", "C", "J"].includes(e.key)) e.preventDefault();
    if (e.ctrlKey && e.key === "U") e.preventDefault();
    if (e.key === "F12") e.preventDefault();
  
  };

  const [isSearch, setIsSearch] = useState(false);
  useEffect(() => {
    setIsSearch(pathname.toLocaleLowerCase() === "/" || /^\/image\/[^/]+$/.test(pathname));
  },[]);
  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700 border-b-2 sticky top-0 z-50 px-4 md:px-8 lg:px-16">
        <div className="flex items-center justify-between p-4">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="/images/logo.png" className="h-12 md:h-16" alt="Logo" />
            <span className="self-center text-xl md:text-2xl font-semibold whitespace-nowrap dark:text-white">
              <span className="text-gray-500">Pic</span><span className="text-teal-400">Nest</span> 
            </span>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" 
              className={`${pathname ==="/" ? 'text-teal-500 font-semibold' : 'text-lg text-gray-700'}  dark:text-white hover:text-teal-500`}
            >
              Home
            </Link>
            <Link to="/images"
              className={`${pathname ==="/images" ? 'text-teal-500 font-semibold' : 'text-lg text-gray-700'}  dark:text-white hover:text-teal-500`}
            >
              Images
            </Link>
            <Link to="/free" 
              className={`${pathname ==="/free" ? 'text-teal-500 font-semibold' : 'text-lg text-gray-700'}  dark:text-white hover:text-teal-500`}
            >
              Free
            </Link>
            <Link to="/paid" 
              className={`${pathname ==="/paid" ? 'text-teal-500 font-semibold' : 'text-lg text-gray-700'}  dark:text-white hover:text-teal-500`}
            >
              Paid
            </Link>
           
              <input
                type="text"
                placeholder="Search"
                className="input input-bordered w-full max-w-xs"
                name="keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            
            {!loginToken ? (
              <button
                className="flex items-center px-4 py-2 rounded-md text-white bg-teal-500 hover:bg-teal-600"
                onClick={handleLoginModal}
              >
                <FaUser className="mr-2" /> Login
              </button>
            ) : (
              <div className="relative">
                <div
                  className="avatar cursor-pointer"
                  onClick={toggleDropdown}
                  ref={dropDownRefBtn}
                >
                  <div 
                    className="w-12 h-12 rounded-full bg-teal-500 text-white flex items-center justify-center"
                    ref={menuRef}
                  >
                    {user?.profilePicture ? (
                      <img src={user?.profilePicture} alt="User Avatar" className="rounded-full" />
                    ) : (
                      <span>{user?.userName?.charAt(0)}</span>
                    )}
                  </div>
                </div>
                {isOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2"
                    ref={dropDownRef}
                  >
                    <Link
                      to="/profile"
                      onClick={()=>setIsOpen(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                    >
                      Profile
                    </Link>
                    <Link
                      onClick={()=>setIsOpen(false)}
                      to="/whish"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                    >
                      Favourites
                    </Link>
                    <Link
                      to="/premium"
                      onClick={()=>setIsOpen(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                    >
                      Premium
                    </Link>
                    {user?.role && user?.role?.toLocaleLowerCase() === "admin" &&
                    <a
                      href="/admin"
                      target="_blank"
                      onClick={()=>setIsOpen(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                    >
                      Admin
                    </a>
                    }
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        dispatch(logout());
                      }}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="flex items-center space-x-4  md:hidden">
            {/* Only visible on small screens */}
            <button
              className="text-gray-500 focus:outline-none"
              onClick={toggleSidebar}
            >
              <FaBars size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div
            className="absolute inset-0"
            onClick={() => dispatch(showHideModal(false))}
          ></div>
          <div className="relative bg-white rounded-lg shadow-lg p-6">
            <Modal flex={false} />
          </div>
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 bg-gray-800 text-white h-full z-40 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300`}
        ref={sidebarRef}
      >
        <div className="flex justify-between p-4">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="/images/logo.png" className="h-12" alt="Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap">Pic Nest</span>
          </div>
          <button
            onClick={toggleSidebar}
            className="text-white"
          >
            <IoCloseOutline size={24} />
          </button>
        </div>
        <div className="flex flex-col space-y-6 p-4">
          <Link to="/" 
            className="text-lg text-white hover:text-teal-500"
            onClick={toggleSidebar}
          >
            Home
          </Link>
          <Link to="/images" 
            className="text-lg text-white hover:text-teal-500"
            onClick={toggleSidebar}
          >
            Home
          </Link>
          <Link to="/free" 
            className="text-lg text-white hover:text-teal-500"
            onClick={toggleSidebar}
          >
            Free
          </Link>
          <Link to="/paid" 
            className="text-lg text-white hover:text-teal-500"
            onClick={toggleSidebar}
          >
            Paid
          </Link>
          {!loginToken ? (
            <div className="flex flex-row">
              <button
                className="flex items-center text-lg text-white bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded-md"
                onClick={()=>{ 
                  toggleSidebar()
                  handleLoginModal()
                }}
              >
                  <FaUser className="mr-2" /> Login
              </button>
            </div>
          ) : (
            <>
              <div className="mt-4 flex items-center space-x-4">
                <div className="avatar">
                  <div className="w-12 h-12 rounded-full bg-teal-500 text-white flex items-center justify-center">
                    {user?.profilePicture ? (
                      <img src={user.profilePicture} alt="User Avatar" className="rounded-full" />
                    ) : (
                      <span>{user?.userName?.charAt(0)}</span>
                    )}
                  </div>
                </div>
                <div className="text-white">{user?.userName}</div>
              </div>
              <Link
                to="/profile"
                onClick={toggleSidebar}
                className="text-lg text-white hover:text-teal-500"
              >
                Profile
              </Link>
              <Link
                to="/whish"
                onClick={toggleSidebar}
                className="text-lg text-white hover:text-teal-500"
              >
                Favourites
              </Link>
              <Link
                to="/premium"
                onClick={toggleSidebar}
                className="text-lg text-white hover:text-teal-500"
              >
                Premium
              </Link>
              <button
                onClick={() =>{ 
                  dispatch(logout())
                  toggleSidebar()
                } }
                className="mt-4 text-white bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded-md"
              >
                Logout
              </button>
            </>
          )
          }
        </div>
      </div>

      {/* Background Blur when sidebar is open */}
      {isBackgroundBlurred && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-30"
          onClick={toggleSidebar}
        />
      )}
      <Toaster />
    </>
  );
};

export default Header;
