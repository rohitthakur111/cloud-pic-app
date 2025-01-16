import React from 'react'
import { FaUserAlt } from 'react-icons/fa'
import { FaUserLargeSlash } from 'react-icons/fa6'
import { MdDelete } from 'react-icons/md'

const Table = ({ users }) => {
  return (
  <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <th>User Name</th>
        <th>User Email</th>
        <th>Register Date</th>
        <th>Action</th>
      </tr>
    </thead>
    
    <tbody>
      {/* row 1 */}
      {users.map((user,i)=>(
        <tr key={i}>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <td>
          <div className="flex items-center gap-3">
          
          {!user?.profilePicture ?
            <div className='px-3 py-2 border flex rounded-xl bg-gray-200 items-center justify-center text-lg'>
                R
              </div>
            :
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={user.profilePicture}
                  alt="Avatar Tailwind CSS Component" />
                 
              </div>
            </div> 
          }
         
            <div>
         
              <div className="font-bold">{user.userName}</div>
              <div className="text-sm opacity-50">{user?.location?.country} {user?.location?.city}</div>
            </div>
          </div>
        </td>
        <td>
          {user.email}
        </td>
        <td>{new Date(user?.createdAt)?.toDateString()}</td>
        <th className='flex gap-2'>
          <button type="button"
            className="bg-red-500 text-white transition-colors duration-500 ease-in-out  hover:bg-red-400 p-1 rounded"
            > 
              <MdDelete size={20}/>
          </button>
          <button type="button"
            className={`${!user?.role || user.role.toString() !== "admin" ? "bg-blue-500  hover:bg-blue-400" : "bg-teal-500 hover:bg-teal-400"}  transition-colors duration-500 ease-in-out p-1 text-white rounded
            `}> 
              {!user?.role || user.role.toString() !== "admin" ?
                <FaUserLargeSlash size={20}/>
                :
                <FaUserAlt size={20}/>
              }
          </button>
        </th>
      </tr>
      ))}
      
    </tbody>
    {/* foot */}
    <tfoot>
      <tr>
        <th>#</th>
        <th>User Name</th>
        <th>User Email</th>
        <th>Register Date</th>
        <th>Action</th>
      </tr>
    </tfoot>
  </table>
</div>
  )
}

export default Table