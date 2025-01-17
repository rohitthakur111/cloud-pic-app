import React, { useRef, useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { FaUserLargeSlash } from 'react-icons/fa6';
import { MdDelete } from 'react-icons/md';
import PopupDialog from '../../components/PopupDialog';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { deleteuserAsync } from '../../../feature/users/userSlice';

const Table = ({ users }) => {

  // state 
  const [isOpen, setIsOpen] = useState(false)
  const deleteRef = useRef({})
  const [user, setUser] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const diapatch = useDispatch()

  const handleDeleteClick = (user)=> {
    setUser(user)
    setIsOpen(true)
  }

  // Delete user when confirm
  const deleteUser = async ()=>{
    try{
        setDeleteLoading(true)
        const response = await diapatch(deleteuserAsync(user._id))
        if(response?.payload?.status ==="success") {
            toast.success('User deleted successfully')
        }else{
          toast.error('User is not deleted')
        }
        setDeleteLoading(false)
    }catch(err){
        setIsOpen(false)
        setDeleteLoading(false)
        console.log(err)
        toast.error(err?.error || 'Post is not deleted!')
    }finally{
      setIsOpen(false)
    }

  }
  return (
    <div className="overflow-x-auto">
      <PopupDialog 
            message="Are you sure want to delete user" 
            title={user?.userName}
            onConfirm={deleteUser} 
            isOpen={isOpen} 
            setIsOpen={setIsOpen}
            deleteRef={deleteRef}
            loading={deleteLoading}
            setDeleteLoading={setDeleteLoading}
        />
      <table className="table w-full min-w-[600px]">
        {/* head */}
        <thead>
          <tr>
            <th>User Name</th>
            <th>User Email</th>
            <th>Register Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, i) => (
            <tr key={i}>
              <td>
                <div className="flex items-center gap-3">
                  {!user?.profilePicture ? (
                    <div className='p-4 py-2 border flex rounded-2xl bg-slate-400 items-center justify-center text-2xl text-white font-medium'>
                      {user.userName.charAt(0)?.toUpperCase()}
                    </div>
                  ) : (
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={user.profilePicture} alt="Avatar" />
                      </div>
                    </div>
                  )}

                  <div>
                    <div className="font-bold">{user.userName}</div>
                    <div className="text-sm opacity-50">{user?.location?.country} {user?.location?.city}</div>
                  </div>
                </div>
              </td>
              <td>{user.email}</td>
              <td>{new Date(user?.createdAt)?.toDateString()}</td>
              <td className="flex gap-2">
                <button 
                  type="button" 
                  className="bg-red-500 text-white transition-colors duration-500 ease-in-out hover:bg-red-400 p-1 rounded"
                  ref={(el) => (deleteRef.current[user._id] = el)}
                  onClick={() => handleDeleteClick(user)}
                >
                  <MdDelete size={20} />
                </button>
                <button type="button" className={`${!user?.role || user.role.toString() !== "admin" ? "bg-blue-500 hover:bg-blue-400" : "bg-teal-500 hover:bg-teal-400"} transition-colors duration-500 ease-in-out p-1 text-white rounded`}>
                  {!user?.role || user.role.toString() !== "admin" ? <FaUserLargeSlash size={20} /> : <FaUserAlt size={20} />}
                </button>
              </td>
            </tr>
          ))}
        </tbody>

        {/* foot */}
        <tfoot>
          <tr>
            <th>User Name</th>
            <th>User Email</th>
            <th>Register Date</th>
            <th>Action</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Table;
