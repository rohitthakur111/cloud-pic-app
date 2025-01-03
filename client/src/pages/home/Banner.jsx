import React from 'react';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <div 
            className="relative w-full h-[80vh] bg-cover bg-center text-white" 
            style={{ 
                backgroundImage: 'url(/images/banner.jpg)', 
                backgroundSize: 'cover', 
                backgroundPosition: 'center' 
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-6 px-6 sm:px-12">
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-center">
                    Welcome to <span className="text-teal-400">PicNest</span>
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-center max-w-2xl">
                    Discover a world of breathtaking free and premium images to elevate your projects and creativity.
                </p>
                <Link 
                    to="/images" 
                    className="px-6 py-3 text-lg font-medium text-white bg-teal-500 rounded shadow-lg transition-colors duration-300 transform hover:bg-white hover:text-teal-500 focus:ring-4 focus:ring-teal-300 focus:outline-none flex items-center gap-2"
                >
                    <span> Explore Images</span>
                   
                    <span className='text-teal-500 text-xl'><IoIosArrowRoundForward size={24}/>
                    </span>
                </Link>
            </div>
        </div>
    );
};

export default Banner;
