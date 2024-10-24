import React from 'react';
import '../assets/styles/Banner.css'

function Banner() {
    const BannerMedia = 'https://preprod-appli-server.vivetic.com/web_si/front-ecatalogue-v2/assets/images/ecata-header.webp';

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