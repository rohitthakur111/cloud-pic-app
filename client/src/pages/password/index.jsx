import React, { useEffect, useState } from 'react';
import GoogleLoginBtn from '../../components/GoogleLoginBtn';
import { forgotPassword } from '../../feature/auth/service';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const PasswordReset = () => {
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState('')
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const validateEmail =  ()=>{
        let valid = true;
        let error = ""
        if(!email) {
            error = "Enter a email to reset your password!"
            valid = false
        }else if (!email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
            error = "Enter a valid email address!"
            valid = false
        }
        setError(error)
        return valid
    }

    // validate email on chamge of email
    useEffect(()=>{
        if(!error) return 
        validateEmail()
    },[email])

    const handldeSubmit = async (e) => {
        e.preventDefault()
        if(!validateEmail()) return
        setLoading(true)
        try{
            const response = await forgotPassword(email)
           if(response.status === "success"){
            setEmail("")
            setError("")
            setEmailSent(true)
           }
        }catch(err){
            setError(err?.error || 'Please try again to reset your password')
        }
        finally{
            setLoading(false)
        }
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                {!emailSent ? <>
                    <h2 className="text-2xl font-semibold text-gray-800">Password Reset</h2>
                    <p className="text-gray-600">
                        Provide the email address associated with your account to recover your password.
                    </p>
                    <form className="space-y-4" onSubmit={handldeSubmit}>
                        <div>
                            <label htmlFor="email" className="block font-medium text-gray-700">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <label className="w-full input input-bordered flex items-center gap-2 mt-2">
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
                                    className="grow"
                                    placeholder="User Email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoComplete="username"
                                    required
                                />
                            </label>
                            {error && 
                                <p className='mt-1 font-medium text-red-500 italic'>{error}</p>
                            }   
                        </div>
                        <button
                            type="submit"
                            className={`w-full py-2 px-4 rounded-md flex gap-2 justify-center items-center text-medium ${!loading ? "bg-teal-500 text-white hover:bg-teal-600 transition duration-300" : "bg-gray-200 text-gray-600"}`}
                            disabled={loading}
                        >
                            <span>Reset Password</span>
                            {loading && 
                            <span className='font-medium font-semibold'>
                                <AiOutlineLoading3Quarters className="animate-spin" />
                            </span>
                            }
                        </button>
                    </form>
                    <div className="flex items-center justify-between">
                        <a href="/login" className="text-sky-500">
                            Login
                        </a>
                        <a href="/register" className="text-sky-500">
                            Register
                        </a>
                    </div>
                    <div className="text-center text-sm text-gray-500">Or sign in with</div>
                    <div className="flex justify-center space-x-4">
                        <GoogleLoginBtn />
                    </div>
                </>
                    :
                    <>
                        <h2 className="text-2xl font-semibold text-gray-800">Check Your Email</h2>
                        <p className="text-base text-gray-600">
                            We have sent a password reset link to your email address. Please check your inbox to reset your password.
                        </p>
                        <div className="flex items-center justify-center">
                            <a href='https://mail.google.com/'>
                                <img
                                    src="/images/email.avif"
                                    alt="Email Sent"
                                    className="w-20 h-20"
                                />
                            </a>

                        </div>
                        <button
                            onClick={() => setEmailSent(false)}
                            className="w-full justify-center font-medium flex items-center px-4 py-2 rounded-md text-white bg-teal-500 hover:bg-teal-600"
                        >
                            Back to Reset
                        </button>
                    </>
                }
            </div>
        </div>

    );
};

export default PasswordReset;
