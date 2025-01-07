import React from 'react';

const ContactUs = () => {
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
                    <form className="bg-white shadow-md rounded-lg p-6">
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Your Name"
                                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Your Email"
                                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                                Message
                            </label>
                            <textarea
                                id="message"
                                rows="4"
                                placeholder="Your Message"
                                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 transition duration-300"
                        >
                            Send Message
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
