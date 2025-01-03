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
              <Outlet key={location?.pathname} context={keyword}/>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Main

