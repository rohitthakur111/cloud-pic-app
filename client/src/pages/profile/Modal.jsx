import React, { useEffect, useRef, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { changePasswordAsync } from '../../feature/auth/authSlice';
import toast from 'react-hot-toast';

const Modal = ({ modal, setModal, btnRef }) => {
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [error, setError] = useState(null);

    const [showPassword, setShowPassword] = useState({ newPassword: false, confirmPassword: false, })
    const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));


    useEffect(() => {
        if (error === null) return
        handleError()
    }, [formData])

    const handleError = () => {
        if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
            setError("All field are required!.");
            return false
        }

        if (formData.newPassword !== formData.confirmPassword) {
            setError("New password and confirm password must match.");
            return false
        }
        setError("");
        return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!handleError()) return
        try{
            const response = await dispatch(changePasswordAsync(formData))
            if(response?.payload?.error) 
                return toast.error(response?.payload?.error);

            if (response.payload?.token) return  toast.success('Password changed successfully');
        }catch(err){
            console.log(err)
        }
        finally { setModal(false) }
    };
    const modalRef = useRef(null)

    useEffect(()=>{ 
        const handleClickOutside = (e)=>{
            if(!modal) return
            if(modalRef.current && !modalRef.current.contains(e.target) && btnRef.current && !btnRef.current.contains(e.target)) setModal(false)
        }
        document.addEventListener('click', handleClickOutside)
        return ()=> document.removeEventListener('click', handleClickOutside)

    },[modal])

    return (
        <>
            <div
                className='fixed left-0 top-0 min-h-screen bg-customBlack w-full opacity-50 z-40'
                onClick={()=>setModal(false)}
            >
            </div>
            <div className="fixed left-0 flex justify-center justify-center items-center z-50 w-full">
                <div className="modal-box" ref={modalRef}>
                    <button 
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        onClick={()=>setModal(false)}
                    >
                        ✕
                    </button>
                    <h3 className="text-xl font-semibold text-center mb-6">Update Password</h3>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Current Password */}

                        <label
                            htmlFor="currentPassword"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Current Password
                        </label>
                        <div className='flex items-center'>
                            <input
                                type="password"
                                name="currentPassword"
                                id="currentPassword"
                                value={formData.currentPassword}
                                onChange={handleChange}
                                placeholder="Enter your current password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
                            />

                        </div>

                        {/* New Password */}
                        <div>
                            <label
                                htmlFor="newPassword"
                                className="block text-gray-700 font-medium mb-2"
                            >
                                New Password
                            </label>
                            <div className='flex items-center'>
                                <input
                                    type={`${showPassword.newPassword ? "text" : "password"}`}
                                    name="newPassword"
                                    id="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    placeholder="Enter a new password"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
                                />
                                <span
                                    role="button"
                                    className='p-2 ms-[-30px]'
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setShowPassword(prev => ({ ...prev, newPassword: !prev.newPassword }))
                                    } }
                                >
                                    {showPassword.newPassword ?
                                        <FaEye />
                                        :
                                        <FaEyeSlash />
                                    }
                                </span>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="block text-gray-700 font-medium mb-2"
                            >
                                Confirm New Password
                            </label>
                            <div className='flex items-center'>
                                <input
                                    type={`${showPassword.confirmPassword ? "text" : "password"}`}
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Re-enter your new password"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
                                />
                                <span
                                    role="button"
                                    className='p-2 ms-[-30px]'
                                    onClick={(e) =>  { 
                                        e.stopPropagation()
                                        setShowPassword(prev => ({ ...prev, confirmPassword: !prev.confirmPassword }))}
                                    }
                                >
                                    {showPassword.confirmPassword ?
                                        <FaEye /> :
                                        <FaEyeSlash />
                                    }
                                </span>
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="text-red-500 text-sm mt-2">{error}</div>
                        )}

                        {/* Submit Button */}
                        <div className="mt-4 text-center">
                            <button
                                type="submit"
                                className="w-full bg-teal-500 font-semibold text-white py-2 px-4 rounded-md hover:bg-teal-600 transition duration-300"
                            >
                                Update Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Modal;
