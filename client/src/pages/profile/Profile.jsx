import React, { useEffect, useState } from 'react'
import { FaArrowRightLong } from 'react-icons/fa6'
import { loginUser, updateAccountAsync } from '../../feature/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { LiaEdit } from 'react-icons/lia'
import { TbEdit } from 'react-icons/tb'
import toast from 'react-hot-toast';


const Profile = () => {
    const dispatch = useDispatch()
  const loggedUser = useSelector(loginUser)
  const [user,setUser] = useState({ userName : '', email : '', bio : '',gender : '', dateOfBirth : '', phone :'', location : { country : '' , city : ''}, role : '', profilePicture : ''})

  const [updateUser, setUpdateUser] = useState({
        userName : '', 
        email : '', 
        bio : '',
        gender : '',
        dateOfBirth : '', 
        phone :'',
        location : { country : '' , city : ''},
        role : '',
        profilePicture : null,

    }) 
  useEffect(()=>{
    if(loggedUser){
        setUser(prevUser=>({ ...prevUser, 
            userName : loggedUser?.userName ?? '', 
            email : loggedUser?.email ?? '', 
            bio : loggedUser?.bio ?? '', 
            gender : loggedUser?.gender ?? '', 
            dateOfBirth : loggedUser?.dateOfBirth ?? '', 
            phone : loggedUser?.phone ?? '',
            location : { country : loggedUser?.location?.country ?? '' , city : loggedUser?.location?.city ?? ''},
            profilePicture : loggedUser?.profilePicture ?? null, 
        }))  
    }
    
  },[loggedUser])
 
  const handleChangeUser = (e)=>{
    if(e.target.name === 'city' || e.target.name === 'country'){
        setUser(prevuser=>({...prevuser, location : {...prevuser.location, [e.target.name] : e.target.value } }))
        setUpdateUser(prevuser=>({...prevuser, location : {...prevuser.location, [e.target.name] : e.target.value } }))
        return 
    }
    setUser(prevuser=>({...prevuser, [e.target.name] : e.target.value }))
    setUpdateUser(prevuser=>({...prevuser, [e.target.name] : e.target.value }))
  }
  const handleImage = (e)=>{
    setUser(prevUser => ({...prevUser, profilePicture : URL.createObjectURL(e.target.files[0]) }))
    setUpdateUser(prevUpdateUser=>({ ...prevUpdateUser, profilePicture : e.target.files[0]}))
  }

    //  handle update user 
    const handleUpadateUser = async(e)=>{
        e.preventDefault()
        console.log(updateUser.profilePicture)
        const formData = new FormData();
        Object.keys(updateUser).forEach(key => {
           if(updateUser[key] && key !== 'location'){
                formData.append(key, updateUser[key])
           }
           if(key === 'location'){
            Object.keys(updateUser.location).forEach(subkey=>{ 
                if(`location[${subkey}]`){
                    formData.append(`location[${subkey}]`, updateUser.location[subkey])
                }
            })
           }
        });
    
        const data = await dispatch(updateAccountAsync(formData))   
        if(data.payload.data)
            toast.success('Account Updated Successfully')  
            else toast.error('Please try latter')
    }
  return (
    <div className='w-full'>
        <form onSubmit={handleUpadateUser}>
            <div className='flex justify-between p-2 border-b border-teal-300 border-opacity-50'>
                <h2 className='text-2xl font-medium'>My Profile {'>>'} Edit Profile</h2>
                <button 
                    className='flex items-center gap-4 px-4 py-2 rounded bg-red-400 text-md text-white font-medium transition-colors duration-500 ease-in-out hover:bg-teal-500'
                    type="submit"
                >
                    Save Changes <FaArrowRightLong />
                </button>
            </div>
            <div className='w-full flex flex-col xl:flex-row'>
                <div className='w-full xl:w:1/2 lg:border-r border-teal-300 border-opacity-50'>
                    <div className='p-8 pb-0 xl:pb-8'>

                        <div className="flex justify-center avatar placeholder">
                            <div className="w-32 xl:w-40 justify-center rounded-full bg-teal-500 text-white">
                                {user?.profilePicture ? (
                                <img src={user?.profilePicture} alt="User Avatar" />
                                ) : (
                                <span className="text-7xl font-medium uppercase" role="button">{user?.userName?.charAt(0)}</span>
                                )}
                                
                            </div>
                            <label className='flex justify-center relative cursor-pointer'>
                                <span className='absolute text-2xl text-teal-700 '><TbEdit /></span>
                                <input type="file" name="profilePicture" className='h-0 w-0'  accept="image/*" onChange={handleImage}/>
                            </label>
                        </div>
                        
                        <div className='w-full flex-col'>
                            <div className='w-full flex flex-col md:flex-row gap-4 my-4'>
                                <label className="w-full input input-bordered flex items-center gap-2">
                                    
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        className="h-4 w-4 opacity-70">
                                        <path
                                        d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                                    </svg>
                                    
                                    <input 
                                        type="text" 
                                        className="grow" 
                                        placeholder="User Name" 
                                        name="userName" 
                                        value={user?.userName}
                                        onChange={handleChangeUser}
                                        required
                                    />
                                </label>
                                <label className="w-full input input-bordered flex items-center gap-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        className="h-4 w-4 opacity-70">
                                        <path
                                        d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                        <path
                                        d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                                    </svg>
                                    <input 
                                        type="email" 
                                        className="grow text-gray-500" 
                                        placeholder="User Email"
                                        name="email" 
                                        value={user?.email}
                                        disabled={true}
                                    />
                                </label>
                            </div>    
                            <div>
                                <label className="w-full text-lg font-medium">Bio</label>
                                <textarea 
                                    className="textarea textarea-bordered w-full" 
                                    placeholder="Bio" 
                                    name="bio"
                                    value={user?.bio}
                                    onChange={handleChangeUser}
                                >
                                </textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full xl:w:1/2'>
                    <div className='p-8 pb-0 xl:pb-8'>
                        <div className='flex flex-col md:flex-row gap-4'>
                            <label className='w-full flex flex-col gap-1 text-lg font-medium'>
                                <span >Gender</span>
                                <select 
                                    className="select select-bordered w-full" name="gender" 
                                    value={user?.gender || ''}
                                    onChange={handleChangeUser}
                                >
                                    <option value="" disabled>Select Your gender?</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>

                            </label>
                            <label className='w-full flex flex-col gap-1 text-lg font-medium'>
                                <span >Date of Birth</span>
                                <input 
                                    type="date"
                                    className="input input-bordered w-full" 
                                    placeholder="User Email"
                                    name="dateOfBirth" 
                                    onChange={handleChangeUser}
                                    value={user?.dateOfBirth?.slice(0,10)}
                                />
                            </label>
                            
                        </div>
                        <div className='flex flex-col lg:flex-row my-2'>
                            <label className='w-full flex flex-col gap-1 text-lg font-medium'>
                                <span >Phone</span>
                                <input 
                                    type="tel"
                                    className="input input-bordered w-full" 
                                    placeholder="Phone"
                                    name="phone" 
                                    value={user?.phone}
                                    onChange={handleChangeUser}
                                />
                            </label>
                        </div>
                        <div className='flex flex-col md:flex-row my-2 gap-4'>
                            <label className='w-full flex flex-col gap-1 text-lg font-medium'>
                                <span >Country</span>
                                <input 
                                    type="text"
                                    className="input input-bordered w-full" 
                                    placeholder="Country"
                                    name="country" 
                                    value={user?.location?.country}
                                    onChange={handleChangeUser}
                                />
                            </label>
                            <label className='w-full flex flex-col gap-1 text-lg font-medium'>
                                <span >City</span>
                                <input 
                                    type="text"
                                    className="input input-bordered w-full" 
                                    placeholder="City"
                                    name="city" 
                                    value={user?.location?.city}
                                    onChange={handleChangeUser}
                                />
                            </label>
                           
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
  )
}

export default Profile