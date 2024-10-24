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
                    // src={BannerMedia}
                    src='https://f2a4-51-83-2-114.ngrok-free.app/ecata-header.webp'
                />
                <h1 className='banner-text'>Nos catalogues</h1>
            </div>
        </>
    );
};

export default Banner;