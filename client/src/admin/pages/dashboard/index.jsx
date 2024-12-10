import React from 'react'
import CardBox from './CardBox'
import { FaImages } from 'react-icons/fa'

const index = () => {
  return (
    <div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5" bis_skin_checked="1">
            <CardBox title="Total Images" link="images" icon={<FaImages />} length="21"/>
            <CardBox title="Total Users" link="images" icon={<FaImages />} length="21"/>
            <CardBox title="Total Earnings" link="images" icon={<FaImages />} length="21"/>
            <CardBox title="Active Subscribers" link="images" icon={<FaImages />} length="21"/>
        </div>
    </div>
  )
}

export default index