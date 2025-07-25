import React, { useEffect, useState, useContext } from 'react';
import '../../assets/styles/PrivacyPolicy.css';
import '../../assets/styles/ConfidentialTracking.css';
import LoadingSpinner from '../../components/spinner/LoadingSpinner';
import showOnlyEcatalogue from '../functions/ShowOnlyEcatalogue';
import { useNavigate } from "react-router-dom";
import { GtmContext } from '../../store-gtm.js';

function PrivacyPolicy() {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const [privacyPolicyContent, setPrivacyPolicyContent] = useState(null);
    const { storedGtmStatus, setStoredGtmStatus } = useContext(GtmContext);
    const [isChecked, setIsChecked] = useState(!storedGtmStatus);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/getTextConfidentiality`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Problème de connexion');
                }
                return response.json();
            })
            .then(data => setPrivacyPolicyContent(data.html))
            .catch(error => {
                console.error('Error fetching PrivacyPolicy text:', error);
            });
    }, [API_BASE_URL]);

    useEffect(() => {
        setIsChecked(!storedGtmStatus);
    }, [storedGtmStatus]);

    const handleCheckboxChange = (event) => {
        const btn_status = event.target.checked;
        setIsChecked(btn_status);
        console.log("storedGtmStatus = "+!btn_status)
        console.log("btn_status = "+btn_status)
        setStoredGtmStatus(!btn_status);
    };

    const handleBackClick = () => {
        navigate('/');
    };

    showOnlyEcatalogue();

    return (
        <div className="privacy-container">
            <div className="rgpd-head">
                <div className="rgpd-back-btn" onClick={handleBackClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="icon-back">
                        <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
                    </svg>
                    <span className="" style={{ fontFamily: "'Segoe Ui',-apple-system,BlinkMacSystemFont" }}>
                        <span className="truncate-text">Revenir vers les catalogues</span>
                    </span>
                </div>
                <div className="checkbox-container">
                    <input 
                        type="checkbox" 
                        id="opt-out-checkbox"
                        checked={isChecked}
                        onChange={handleCheckboxChange} 
                    />
                    <label htmlFor="opt-out-checkbox" className="truncate-text">Révocation du consentement</label>
                </div>
            </div>
            {privacyPolicyContent ? (
                <iframe
                    title="Privacy policy text"
                    className='privacy-policy-content'
                    srcDoc={privacyPolicyContent}
                />
            ) : (
                <LoadingSpinner />
            )}
        </div>
    );
}

export default PrivacyPolicy;
