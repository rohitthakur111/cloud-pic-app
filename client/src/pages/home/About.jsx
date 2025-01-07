import React from 'react';

const AboutSection = () => {
    return (
        <section className="bg-white py-12">
            <div className="max-w-7xl mx-auto px-6 sm:px-12">
                {/* Heading */}
                <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-600 mb-8">
                    About Us
                </h2>

                {/* Content */}
                <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-12">
                    {/* Image */}
                    <div className="lg:w-1/2">
                        <img
                            src="/images/about.webp"
                            alt="About Us"
                            className="rounded-lg shadow-md w-full h-80 object-cover"
                        />
                    </div>

                    {/* Text */}
                    <div className="lg:w-1/2 text-gray-700 space-y-4">
                        <p className="text-lg leading-relaxed">
                            Welcome to PicNest! We are dedicated to providing a rich collection of stunning free and premium images to fuel your creative projects. From breathtaking landscapes to vibrant portraits, our library is meticulously curated to inspire creativity and elevate your work.
                        </p>
                        <p className="text-lg leading-relaxed">
                            Our mission is to empower creators by making high-quality images accessible to everyone. Whether you are a designer, marketer, or simply a photography enthusiast, PicNest is your go-to destination for exceptional visuals.
                        </p>
                        <p className="text-lg leading-relaxed">
                            Join our growing community and start exploring the world through our lens. Discover, download, and create without limits.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
