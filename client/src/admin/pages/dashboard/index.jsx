import React from 'react'
import CardBox from './CardBox'
import { FaImages } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { users } from '../../../feature/users/userSlice'
import { PiUsersThreeFill } from 'react-icons/pi'
import { TbReportMoney } from 'react-icons/tb'
import { IoIosMail } from 'react-icons/io'

const index = () => {
  const usersList = useSelector(users)
  return (
    <div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5" bis_skin_checked="1">
            <CardBox title="Total Images" link="images" icon={<FaImages />} length="21"/>
            <CardBox title="Total Users" link="users" icon={<PiUsersThreeFill />} length={usersList?.length || 0}/>
            <CardBox title="Total Earnings" link="images" icon={<TbReportMoney />} length="21"/>
            <CardBox title="Contact Queries" link="images" icon={<IoIosMail />} length="21"/>
        </div>
    </div>
  )
}

export default index