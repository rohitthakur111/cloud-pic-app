import React, { useEffect, useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import Loading from "../../admin/components/Loading"
import { Link, useSearchParams } from 'react-router-dom';
import NotFound from '../NotFound'
import { resetPassword } from '../../feature/auth/service';
import toast from 'react-hot-toast';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
const SetNewPassword = () => {

  // formdata
  const [payload, setPayload] = useState({ resetToken : "", newPassword : "", confirmPassword : ""})
  const [isSubmit,setSubmit] = useState(false)

  const [error, setError] = useState('');
  const [linkExpired, setLinkExpired] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false)
  const [loadingRequest, setLoadingRequest] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(true)
  // params 
  const [searchParams] = useSearchParams()

  // validate expire date params on page load
  useEffect(()=>{
    const expiration = searchParams.get('expiration')
    const resetToken = searchParams.get('resetToken')
    if(!expiration || !resetToken) return setLoading(null)
    if(Date.now() < expiration){
      setLoading(false)
    }else{
      setLoading(false)
      setLinkExpired(true)
    }
    setPayload(prev=>({...prev, resetToken}))
  },[])

  // handle error of password
  useEffect(()=>{
    if(!isSubmit) return
    validateForm()
  },[payload])

  const validateForm = ()=>{
    let error = ''
    let valid = true
    const { newPassword, confirmPassword } = payload;
    if(!newPassword || !confirmPassword) {
      error = "Password and confirm password are required."
      valid = false
    }else if(newPassword !== confirmPassword){
      error = "Oops! The passwords don't match."
      valid = false
    } 
    setError(error)
    return valid;
  }
  // handle chnage form 
  const handleChange = (e)=> setPayload(prev=>({...prev, [e.target.name] : e.target.value}))

  
  // handel submit form
  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoadingRequest(true)
    setSubmit(true)
    if(!validateForm()) return
    try{
      const response = await resetPassword(payload)
      if(response.status === "success"){
        toast.success('Password reset successfully')
        setIsSuccess(true)
      }
    }catch(err){
      setError(err.error)
      toast.error(err.error)
    }
    finally{
      setLoadingRequest(false)
    }
  };
  if(loading === true) return <Loading />
  if(loading === null) return <NotFound />
  if(isSuccess === true) return <>
  <div className="flex items-center justify-center min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
        Password Reset Successful!
      </h2>
      <p className="text-sm text-gray-600 text-center mb-6">
        Your password has been successfully reset. You can now log in to your account using your new password.
      </p>

      <div className="flex justify-center">
        <Link
          to="/login"
          className="text-sky-500"
        >
          Log In to Your Account
        </Link>
      </div>
    </div>
  </div>
  </>

  return (
    <>
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        {linkExpired ? (
          <>
            <h2 className="text-2xl font-semibold text-gray-800">Link Expired</h2>
            <p className="text-sm text-gray-600">
              The link you used to reset your password has expired. Please request a new password reset link.
            </p>
            <Link
              to="/forgot-password"
              className="w-full justify-center font-medium flex items-center px-4 py-2 rounded-md text-white bg-teal-500 hover:bg-teal-600"
            >
              Request New Link
            </Link>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-gray-800">Set New Password</h2>
            <p className="text-sm text-gray-600">
              Please enter a new password and confirm it to reset your password.
            </p>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="newPassword"
                    type={showPassword ? "text" : "password"}
                    value={payload.newPassword}
                    onChange={handleChange}
                    placeholder="Enter your new password"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none"
                  >
                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={payload.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your new password"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none"
                  >
                    {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </button>
                </div>
              </div>
              {error && <p className="text-red-500 italic">{error}</p>}
              <button
                type="submit"
                className={`w-full py-2 px-4 rounded-md flex gap-2 justify-center items-center text-medium ${!loadingRequest ? "bg-teal-500 text-white hover:bg-teal-600 transition duration-300" : "bg-gray-200 text-gray-600"}`}
                disabled={loadingRequest}
              >
                Set Password
                {loadingRequest && 
                <span className='font-medium font-semibold'>
                    <AiOutlineLoading3Quarters className="animate-spin" />
                </span>
              }
              </button>
            </form>
          </>
        )}
      </div>
    </div>
    </>
  );
};

export default SetNewPassword;
