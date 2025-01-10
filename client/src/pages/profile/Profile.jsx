import React, { useEffect, useState, useRef } from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { TbEdit } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import Breadcrumbs from '../../components/Breadcrumbs';
import { loginLoading, loginUser, updateAccountAsync } from '../../feature/auth/authSlice';
import LoginProtect from '../../components/LoginProtect';
import Modal from './Modal'
const Profile = () => {
    const[modal,setModal] = useState(false)
    const btnRef = useRef(null)
    const dispatch = useDispatch();
    const loggedUser = useSelector(loginUser);
    const updateLoading = useSelector(loginLoading);

    const [user, setUser] = useState({
        userName: '', email: '', bio: '', gender: '', dateOfBirth: '',
        phone: '', location: { country: '', city: '' }, profilePicture: ''
    });
    const [updateUser, setUpdateUser] = useState({ ...user });
    const [isChanged, setIsChanged] = useState(false);

    useEffect(() => {
        if (loggedUser) {
            setUser({
                userName: loggedUser?.userName || '',
                email: loggedUser?.email || '',
                bio: loggedUser?.bio || '',
                gender: loggedUser?.gender || '',
                dateOfBirth: loggedUser?.dateOfBirth || '',
                phone: loggedUser?.phone || '',
                location: {
                    country: loggedUser?.location?.country || '',
                    city: loggedUser?.location?.city || ''
                },
                profilePicture: loggedUser?.profilePicture || null,
            });
        }
    }, [loggedUser]);

    const handleChange = (e) => {
        setIsChanged(true);
        const { name, value } = e.target;

        if (['city', 'country'].includes(name)) {
            setUser(prev => ({
                ...prev,
                location: { ...prev.location, [name]: value }
            }));
            setUpdateUser(prev => ({
                ...prev,
                location: { ...prev.location, [name]: value }
            }));
        } else {
            setUser(prev => ({ ...prev, [name]: value }));
            setUpdateUser(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUser(prev => ({ ...prev, profilePicture: URL.createObjectURL(file) }));
            setUpdateUser(prev => ({ ...prev, profilePicture: file }));
            setIsChanged(true);
        }
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.entries(updateUser).forEach(([key, value]) => {
            if (value && key !== 'location') formData.append(key, value);
            if (key === 'location') {
                Object.entries(value).forEach(([subKey, subValue]) => {
                    formData.append(`location[${subKey}]`, subValue);
                });
            }
        });

        const result = await dispatch(updateAccountAsync(formData));
        if (result.payload?.data) toast.success('Profile updated successfully');
        else toast.error('An error occurred. Please try again.');
        setIsChanged(false);
    };

    const breadcrumbs = [
        { title: "Home", link: "/" },
        { title: "Profile" },
        { title: "Edit" }
    ];

    return (
        <div className="section-container">
            {modal && 
                <Modal modal={modal} setModal={setModal} btnRef={btnRef}/>
            }
            <div className="outlet-container container">
                <div className="w-full">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row justify-between items-center bg-sky-50 p-4 border-b">
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                        <button
                            ref={btnRef} 
                            className='flex items-center px-4 py-2 rounded-md text-white bg-red-400 hover:bg-red-500 transition-colors duration-300 font-medium'
                            onClick={()=>setModal(!modal)}
                        >
                            Change Password
                        </button>
                    </div>

                    {/* Form Section */}
                    <form onSubmit={handleUpdateUser} className="bg-white rounded shadow p-6 space-y-6">
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={!isChanged || updateLoading}
                                className={`px-6 py-2 rounded text-white font-medium flex items-center gap-2 transition ${isChanged && !updateLoading ? 'bg-teal-500 hover:bg-teal-600' : 'bg-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                {updateLoading ? (
                                    <AiOutlineLoading3Quarters className="animate-spin" />
                                ) : (
                                    <>
                                        Save Changes
                                        <FaArrowRightLong />
                                    </>
                                )}
                            </button>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Left Column */}
                            <div className="space-y-6">
                                {/* Profile Picture */}
                                <div className="flex flex-col items-center">
                                    <div className="relative">
                                        {user?.profilePicture ? 
                                        <img
                                            src={user?.profilePicture}
                                            alt="Profile"
                                            className="w-32 h-32 rounded-full object-cover"
                                        /> :
                                        <span className="w-32 h-32 text-7xl rounded-full bg-teal-500 text-white flex items-center justify-center">{user?.userName?.charAt(0)}</span>
                                        }
                                        <label className="absolute bottom-2 right-2 bg-teal-500 p-2 rounded-full text-white cursor-pointer">
                                            <TbEdit />
                                            <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                                        </label>
                                    </div>
                                </div>

                                {/* Name and Email */}
                                <div className="flex flex-col gap-4">
                                    <input
                                        type="text"
                                        name="userName"
                                        value={user.userName}
                                        onChange={handleChange}
                                        placeholder="User Name"
                                        className="input input-bordered w-full"
                                        required
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        value={user.email}
                                        disabled
                                        className="input input-bordered w-full bg-gray-100"
                                    />
                                </div>

                                {/* Bio */}
                                <textarea
                                    name="bio"
                                    value={user.bio}
                                    onChange={handleChange}
                                    placeholder="Bio"
                                    className="textarea textarea-bordered w-full"
                                />
                            </div>

                            {/* Right Column */}
                            <div className="space-y-6">
                                {/* Gender and Date of Birth */}
                                <div className="flex flex-col lg:flex-row gap-4">
                                    <select
                                        name="gender"
                                        value={user.gender}
                                        onChange={handleChange}
                                        className="select select-bordered w-full"
                                    >
                                        <option value="" disabled>Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    <input
                                        type="date"
                                        name="dateOfBirth"
                                        value={user.dateOfBirth?.slice(0, 10)}
                                        onChange={handleChange}
                                        className="input input-bordered w-full"
                                    />
                                </div>

                                {/* Phone and Location */}
                                <div className="flex flex-col lg:flex-row gap-4">
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={user.phone}
                                        onChange={handleChange}
                                        placeholder="Phone"
                                        className="input input-bordered w-full"
                                    />
                                </div>
                                <div className="flex flex-col lg:flex-row gap-4">
                                    <input
                                        type="text"
                                        name="country"
                                        value={user.location.country}
                                        onChange={handleChange}
                                        placeholder="Country"
                                        className="input input-bordered w-full"
                                    />
                                    <input
                                        type="text"
                                        name="city"
                                        value={user.location.city}
                                        onChange={handleChange}
                                        placeholder="City"
                                        className="input input-bordered w-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginProtect(Profile);
