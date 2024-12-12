import React, { useEffect, useState } from 'react';
import '../assets/styles/Banner.css'

function Banner() {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const [client_id, setClientId] = useState(null);
    const client = document.getElementById('catalogue-client');
    // const [slidesData, setSlidesData] = useState([]);
    // useEffect(() => {
    //     const fetchedValue = client ? client.value : null;
    //     setClientId(fetchedValue);

    //     // fetch(`${API_BASE_URL}/api/getDataClient/${client}`)
    //     fetch(`${API_BASE_URL}/api/getDataClient/186`) //Static data for testing
    //         .then((response) => response.json())
    //         .then((fetchedData) => setSlidesData(fetchedData))
    //         .catch((error) => console.error("Error fetching data:", error));
    // }, client_id);

    const BannerMedia = 'https://preprod-appli-server.vivetic.com/web_si/front-ecatalogue-v2/assets/images/ecata-header.webp';

    return (
        <div className='section-banner'>
            <img
                alt='ecatalogue header media'
                className='banner-media'
                src={BannerMedia}
            />
            <h1 className='banner-text'>Nos catalogues</h1>
        </div>
    );
};

export default Banner;