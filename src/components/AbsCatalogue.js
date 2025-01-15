import React, { useEffect, useState } from 'react';
import "../assets/styles/AbsCatalogue.css";

function AbsCatalogue() {
    // const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    // const [client_id, setClientId] = useState(null);
    // const [bannerMedia, setBannerMedia] = useState('');
    // const [titleFont, setTitleFont] = useState('');
    // const client = document.getElementById('catalogue-client');

    // useEffect(() => {
    //     const fetchedValue = client ? client.value : null;
    //     setClientId(fetchedValue);
    // }, []);

    // useEffect(() => {
    //     // fetch(`${API_BASE_URL}/api/getDataClient/${client_id}`)
    //     fetch(`${API_BASE_URL}/api/getDataClient/202`) // Static data for testing
    //         .then((response) => response.json())
    //         .then((fetchedData) => {
    //             setBannerMedia(fetchedData.client_global_image);
    //             setTitleFont(fetchedData.font_title);
    //         })
    //         .catch((error) => console.error("Error fetching data:", error));

    // }, client_id);

    return (
        <div className="card-info-container">
            {/* <div className="card-info-desc" style="font-family:'desc typo',-apple-system,BlinkMacSystemFont;" > */}
            <div className="card-info-desc" style={{ fontFamily: 'SanaSansAlt-Bold,BlinkMacSystemFont' }}>
                {/* <h3 style="font-family:'titre typo',-apple-system,BlinkMacSystemFont;">NOS NOUVEAUX CATALOGUES ARRIVENT BIENTÔT !</h3> */}
                <h3 style={{ fontFamily: 'SanaSansAlt-Bold,BlinkMacSystemFont' }}>NOS NOUVEAUX CATALOGUES ARRIVENT BIENTÔT !</h3>
                {/* <p style="font-family:'desc typo',-apple-system,BlinkMacSystemFont;">En attendant, découvrez nos offres exclusives sur notre boutique en ligne.</p> */}
                <p style={{ fontFamily: 'OpenSans-Regular,BlinkMacSystemFont' }}>En attendant, découvrez nos offres exclusives sur notre boutique en ligne.</p>
            </div>
            <div className="card-info-btn">
                {/* <a href="{{ client.client_cat_link_info }}" style="font-family:'{{client.btn_abs_cat_typos_name}}',-apple-system,BlinkMacSystemFont;">Retrouvez nos bons plans</a> */}
                <a href="#" style={{ fontFamily: 'OpenSans-Regular,BlinkMacSystemFont' }} target='_top'>Retrouvez nos bons plans</a>
            </div>
        </div>
    );
};

export default AbsCatalogue;