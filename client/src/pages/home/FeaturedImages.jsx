import React from 'react';

const FeaturedImages = () => {
    const images = [
        '/images/featured1.jpg',
        '/images/featured2.webp',
        '/images/featured3.webp',
    ];

    return (
        <section className="bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-6 sm:px-12">
                {/* Heading */}
                <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-600 mb-8">
                    Featured Images
                </h2>

                {/* Images Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                            <img
                                src={image}
                                alt={`Featured ${index + 1}`}
                                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-30 hover:bg-opacity-40 transition duration-300"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedImages;
