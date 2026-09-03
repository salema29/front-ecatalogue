import React, { useEffect, useState } from 'react';
import '../assets/styles/Banner.css';
import { getClientId } from './functions/clientId';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function Banner() {
    const [bannerMedia, setBannerMedia] = useState('');
    const [titleFont, setTitleFont] = useState('');

    useEffect(() => {
        const clientId = getClientId();
        if (!clientId) return;

        fetch(`${API_BASE_URL}/api/getDataClient/${clientId}`)
            .then((response) => response.json())
            .then((fetchedData) => {
                setBannerMedia(fetchedData.client_global_image);
                setTitleFont(fetchedData.font_title);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    return (
        <div className='section-banner'>
            <div className="banner-overlay"></div> {/* Overlay sombre */}
            <img
                alt='ecatalogue header media'
                className='banner-media'
                src={bannerMedia}
            />
            <h1 className='banner-text'  style={{ fontFamily: titleFont }}>Nos catalogues</h1>
        </div>
    );
};

export default Banner;
