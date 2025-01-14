import React, { useEffect, useState } from 'react';
import '../assets/styles/Banner.css'

function Banner() {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const [client_id, setClientId] = useState(null);
    const [bannerMedia, setBannerMedia] = useState('');
    const [titleFont, setTitleFont] = useState('');
    const client = document.getElementById('catalogue-client');

    useEffect(() => {
        const fetchedValue = client ? client.value : null;
        setClientId(fetchedValue);
    }, []);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/getDataClient/${client_id}`)
        // fetch(`${API_BASE_URL}/api/getDataClient/194`) // Static data for testing
            .then((response) => response.json())
            .then((fetchedData) => {
                setBannerMedia(fetchedData.client_global_image);
                setTitleFont(fetchedData.font_title);
            })
            .catch((error) => console.error("Error fetching data:", error));

    }, client_id);

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