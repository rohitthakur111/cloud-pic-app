import React, { useEffect, useState } from 'react';
import { addConatctQuery } from '../../feature/contact/service';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import toast from 'react-hot-toast';

const ContactUs = () => {
    const [payload, setPayload] = useState({ name: "", email: "", message: "" });
    const [error, setError] = useState({ name: "", email: "", message: "" });
    const [loading, stLoading] = useState(false)
    // Handle input changes
    const handleChange = (e) => {
        setPayload(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // Email validation
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Validate form on change
    useEffect(()=>{
        if(error.name || error.email || error.message)
            validateForm()
    },[payload])

    // Validate function for all fields
    const validateForm = () => {
        let valid = true;
        let newError = { name: "", email: "", message: "" };
        if (!payload.name) {
            newError.name = "Name is required.";
            valid =  false
        }

        // Validate email
        if (!payload.email) {
            newError.email = "Email is required.";
            valid =  false
        } else if (!validateEmail(payload.email)) {
            newError.email = "Please enter a valid email address.";
            valid =  false
        }

        // Validate message (minimum length of 5 characters)
        if (!payload.message) {
            newError.message = "Message is required.";
            valid =  false
        } else if (payload.message.length < 5) {
            newError.message = "Message must be at least 5 characters long.";
            valid =  false
        }
        setError(newError)
        return valid;
    };

    // Handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();

       if(!validateForm()) return
       stLoading(true)
        try {
            const response  = await addConatctQuery(payload); 
            if(response?.status == "success"){
                toast.success(response?.message || 'Your message sent successfully');
            }
            setPayload({ name: "", email: "", message: "" }); 
            setError({ name: "", email: "", message: "" });
            
        } catch (err) {
            toast.error(err.message);
        }
        finally{
            stLoading(false)
        }

    };

    return (
        <section className="bg-gray-50 py-12" id="contact-us">
            <div className="max-w-7xl mx-auto px-6 sm:px-12">
                {/* Heading */}
                <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-600 mb-8">
                    Contact Us
                </h2>

                {/* Contact Form and Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Form */}
                    <form className="bg-white shadow-md rounded-lg p-6" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                                Name
                            </label>
                            <input
                                name="name"
                                type="text"
                                id="name"
                                placeholder="Your Name"
                                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
                                value={payload.name}
                                onChange={handleChange}
                            />
                            {error.name && <p className="text-red-500 text-sm">{error.name}</p>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                                Email
                            </label>
                            <input
                                name="email"
                                type="email"
                                id="email"
                                placeholder="Your Email"
                                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
                                value={payload.email}
                                onChange={handleChange}
                            />
                            {error.email && <p className="text-red-500 text-sm">{error.email}</p>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                                Message
                            </label>
                            <textarea
                                name="message"
                                id="message"
                                rows="4"
                                placeholder="Your Message"
                                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
                                value={payload.message}
                                onChange={handleChange}
                            ></textarea>
                            {error.message && <p className="text-red-500 text-sm">{error.message}</p>}
                        </div>
                        <button
                            type="submit"
                            className={`w-full py-2 px-4 rounded-md flex gap-2 justify-center items-center text-medium ${!loading ? "bg-teal-500 text-white hover:bg-teal-600 transition duration-300" : "bg-gray-200 text-gray-600"}`}
                            disabled={loading}
                        >
                            <span>Send Message</span>
                            {loading && 
                            <span className='font-medium font-semibold'>
                                <AiOutlineLoading3Quarters className="animate-spin" />
                            </span>
}
                        </button>
                    </form>

                    {/* Contact Info */}
                    <div className="flex flex-col justify-center">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Get in Touch</h3>
                        <p className="text-gray-700 mb-4">
                            We would love to hear from you! Reach out to us for any queries or support.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <span className="text-teal-500">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="2"
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3.75 9h16.5m-16.5 6.75h16.5M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                        />
                                    </svg>
                                </span>
                                <p className="text-gray-700">123, Main Street, Dalhousie</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className="text-teal-500">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="2"
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3.75 6h16.5m-16.5 6h16.5m-16.5 6h16.5"
                                        />
                                    </svg>
                                </span>
                                <p className="text-gray-700">contact@picnest.com</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className="text-teal-500">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="2"
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M7.5 4.75h9m-9 14.5h9m-9-7.25h9"
                                        />
                                    </svg>
                                </span>
                                <p className="text-gray-700">+123 456 7890</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;
