import React, { useEffect, useState } from 'react';
import "../assets/styles/AbsCatalogue.css";
import LoadingSpinner from './spinner/LoadingSpinner';
import { fetchClientInfo } from './functions/Api';
import { getClientId } from './functions/clientId';

function AbsCatalogue() {
    const [abs_cat_data, setAbsCatData] = useState(null);

    useEffect(() => {
        const clientId = getClientId();
        if (!clientId) return;

        fetchClientInfo(clientId).then((data) => {
            if (data) setAbsCatData(data);
        });
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