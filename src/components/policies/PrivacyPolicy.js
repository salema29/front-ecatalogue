import React, { useEffect, useState } from 'react';
import '../../assets/styles/PrivacyPolicy.css';
import LoadingSpinner from '../../components/spinner/LoadingSpinner'

function PrivacyPolicy() {
    const [privacyPolicyContent, setPrivacyPolicyContent] = useState(null);

    useEffect(() => {
        fetch(`http://localhost/admin-ecatalogue-v2/api/getTextConfidentiality`)
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
    }, []);

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
