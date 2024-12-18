import React, { useEffect, useState } from 'react';
import '../../assets/styles/PrivacyPolicy.css';
import LoadingSpinner from '../../components/spinner/LoadingSpinner'

function PrivacyPolicy() {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const [privacyPolicyContent, setPrivacyPolicyContent] = useState(null);

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

    return (
        <>
            {privacyPolicyContent ? (
                <iframe
                    title="Privacy policy text"
                    className='privacy-policy-content'
                    srcDoc={privacyPolicyContent}
                />
            ) : (
                <LoadingSpinner />
            )}
        </>
    );
}

export default PrivacyPolicy;
