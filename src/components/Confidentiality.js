import React, { useEffect, useState } from 'react';

function Confidentiality() {
    const [confidentialText, setConfidentialText] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost/admin-ecatalogue-v2/api/getTextConfidentiality`);
                const data = await response.json();
                setConfidentialText(data.html)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, []);
    return (
        <iframe width="100%" height="100%" srcDoc={confidentialText} border="none" padding-right="0" padding-left="0" >
        </iframe>
    );
};

export default Confidentiality;