import React from 'react';
import Banner from './Banner';
import FeaturedImages from './FeaturedImages';
import AboutSection from './About';
import ContactUs from './Contact';

const HomePage = () => {
    return (
        <div>
            <Banner />
            <FeaturedImages />
             <AboutSection />
             <ContactUs />
        </div>
    );
};

export default HomePage;
