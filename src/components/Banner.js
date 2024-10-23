import React from 'react';
import '../assets/styles/Banner.css'
import BannerMedia from '../assets/images/ecata-header.webp'

function Banner() {
    return (
        <>
            <div className='section-banner'>
                <img
                    alt='ecatalogue header media'
                    className='banner-media'
                    src={BannerMedia}
                />
                <h1 className='banner-text'>Nos catalogues</h1>
            </div>
        </>
    );
};

export default Banner;