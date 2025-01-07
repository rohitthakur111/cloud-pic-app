import React from 'react';
import { FaFacebook, FaInstagramSquare, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-6 sm:px-12">
                {/* Top Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* About Section */}
                    <div>
                        <h4 className="text-xl font-semibold mb-4">About Us</h4>
                        <p className="text-gray-400">
                            Discover a world of breathtaking images, where creativity meets inspiration. We bring you the best visuals for every project.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link to="/" className="hover:text-teal-400">Home</Link></li>
                            <li><Link to="/images" className="hover:text-teal-400">Images</Link></li>
                            <li><Link to="/free" className="hover:text-teal-400">Free</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-xl font-semibold mb-4">Contact Info</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li>123 Creativity Lane, Imaginary City</li>
                            <li>Email: contact@picnest.com</li>
                            <li>Phone: +1 234 567 890</li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h4 className="text-xl font-semibold mb-4">Follow Us</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-blue-400">
                              <FaFacebook />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-teal-400">
                              <FaTwitter />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-red-300">
                              <FaInstagramSquare />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-blue-400">
                              <FaLinkedin />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-gray-700 pt-6 text-center text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Pic Nest. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
