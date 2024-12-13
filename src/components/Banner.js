import React, { useEffect, useState } from 'react';
import '../assets/styles/Banner.css'

function Banner({ clientBannerMedia }) {
    const [clientBannerImage, setClientBannerImage] = useState(null);
    useEffect(() => {
        if (clientBannerMedia) {
            setClientBannerImage(clientBannerMedia.client_global_image);
        }
    }, [clientBannerMedia]);

    return (
        <div className='section-banner'>
            <div className="banner-overlay"></div> {/* Overlay sombre */}
            <img
                alt='ecatalogue header media'
                className='banner-media'
                src={clientBannerImage}
            />
            <h1 className='banner-text'>Nos catalogues</h1>
        </div>
    );
};

export default Banner;