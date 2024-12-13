import React, { useEffect, useState } from "react";
import '../assets/styles/Home.css'
import Banner from '../components/Banner'
import Carousel from '../components/Carousel';

function Home() {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const [clientBannerMedia, setClientBannerMedia] = useState(null);
    let environment_shop_id = 0;

    if (window.dataLayer && window.dataLayer[0]?.cdl_environment_shop) {
        environment_shop_id = window.dataLayer[0].cdl_environment_shop;
    }
    const client = document.getElementById('catalogue-client');

    useEffect(() => {
        fetchSlideData();
    }, [client, environment_shop_id, API_BASE_URL]);

    const fetchSlideData = () => {
        // fetch(`${API_BASE_URL}/api/getSlides/190/0`) //Static data for testing
        fetch(`${API_BASE_URL}/api/getSlides/${inputValue}/${shopId}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((fetchedData) => {
            setClientBannerMedia(fetchedData[0])
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
    }

    return (
        <>
            <Banner clientBannerMedia={clientBannerMedia}/>
            <Carousel/>
        </>
    );
};

export default Home;