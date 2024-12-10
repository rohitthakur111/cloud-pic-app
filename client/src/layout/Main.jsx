import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, useOutletContext } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'

const Main = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);
  const [keyword, setKeyword] = useState('')
  return (
    <>
      <div className='flex flex-col min-h-screen justify-between'>
        <div>
          <Header keyword={keyword} setKeyword={setKeyword}/>
          <div className="flex justify-center w-full px-4 md:px-24 2xl:px-32 py-8">
            <div className="outlet-container w-full max-w-full h-full">
              <Outlet key={location?.pathname} context={keyword}/>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Main

