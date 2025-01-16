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
        fetch(`${API_BASE_URL}/api/getDataClientV2/${client_id}`)
            .then((response) => response.json())
            .then((fetchedData) => {
                setAbsCatData(fetchedData);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    return (
        <>
            {abs_cat_data ? (<div className="card-info-container">
                <div className="card-info-desc" style={{ fontFamily: `SanaSansAlt-Bold,BlinkMacSystemFont` }}>
                    <h3 style={{ fontFamily: `${abs_cat_data.title_abs_cat_typos_name},SanaSansAlt-Bold,BlinkMacSystemFont` }}>{ abs_cat_data.cat_abs_title }</h3>
                    <p style={{ fontFamily: `${abs_cat_data.desc_abs_cat_typos_name},OpenSans-Regular,BlinkMacSystemFont` }}>{ abs_cat_data.cat_abs_descri }</p>
                </div>
                <div className="card-info-btn">
                    <a href={abs_cat_data.cat_abs_btn_link}
                        style={{ 
                            fontFamily: `${abs_cat_data.btn_abs_cat_typos_name},OpenSans-Regular,BlinkMacSystemFont`,
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