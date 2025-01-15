import React, { useEffect, useState } from 'react';
import "../assets/styles/AbsCatalogue.css";
import LoadingSpinner from './spinner/LoadingSpinner';

function AbsCatalogue() {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const [client_id, setClientId] = useState(null);
    const [abs_cat_data, setAbsCatData] = useState(null);
    const client = document.getElementById('catalogue-client');

    useEffect(() => {
        const fetchedValue = client ? client.value : null;
        setClientId(fetchedValue);
    }, []);

    useEffect(() => {
        // fetch(`${API_BASE_URL}/api/getDataClient/${client_id}`)
        fetch(`${API_BASE_URL}/api/getDataClientV2/202`) // Static data for testing
            .then((response) => response.json())
            .then((fetchedData) => {
                setAbsCatData(fetchedData);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    return (
        <>
            {abs_cat_data ? (<div className="card-info-container">
                {/* <div className="card-info-desc" style="font-family:'desc typo',-apple-system,BlinkMacSystemFont;" > */}
                <div className="card-info-desc" style={{ fontFamily: 'SanaSansAlt-Bold,BlinkMacSystemFont' }}>
                    {/* <h3 style="font-family:'titre typo',-apple-system,BlinkMacSystemFont;">NOS NOUVEAUX CATALOGUES ARRIVENT BIENTÔT !</h3> */}
                    <h3 style={{ fontFamily: 'SanaSansAlt-Bold,BlinkMacSystemFont' }}>{ abs_cat_data.cat_abs_title }</h3>
                    {/* <p style="font-family:'desc typo',-apple-system,BlinkMacSystemFont;">En attendant, découvrez nos offres exclusives sur notre boutique en ligne.</p> */}
                    <p style={{ fontFamily: 'OpenSans-Regular,BlinkMacSystemFont' }}>{ abs_cat_data.cat_abs_descri }</p>
                </div>
                <div className="card-info-btn">
                    {/* <a href="{{ client.client_cat_link_info }}" style="font-family:'{{client.btn_abs_cat_typos_name}}',-apple-system,BlinkMacSystemFont;">Retrouvez nos bons plans</a> */}
                    <a href={abs_cat_data.cat_abs_btn_link}
                        style={{ 
                            fontFamily: 'OpenSans-Regular,BlinkMacSystemFont',
                            backgroundColor: `${abs_cat_data.cat_abs_btn_bg}`,
                            color: `${abs_cat_data.cat_abs_btn_info_color}`
                        }} 
                        target='_top'>{ abs_cat_data.cat_abs_btn_info }</a>
                </div>
            </div>) : <LoadingSpinner />}
        </>
    );
};

export default AbsCatalogue;