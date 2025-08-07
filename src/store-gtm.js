import React, { createContext, useState, useEffect } from 'react';

const GtmContext = createContext({
    storedGtmStatus: true,
    setStoredGtmStatus: () => {}
});

const GtmStore = (props) => {
    const [storedGtmStatus, setStoredGtmStatus] = useState(() => {
        const storedValue = localStorage.getItem('stored-gtm-status');
        if (storedValue !== null) {
            try {
                return JSON.parse(storedValue);
            } catch (e) {
                console.error('Erreur de parsing localStorage:', e);
                return true;
            }
        } else {
            const defaultValue = true;
            localStorage.setItem('stored-gtm-status', JSON.stringify(defaultValue));
            return defaultValue;
        }
    });

    useEffect(() => {
        localStorage.setItem('stored-gtm-status', JSON.stringify(storedGtmStatus));
    }, [storedGtmStatus]);

    return (
        <GtmContext.Provider value={{ storedGtmStatus, setStoredGtmStatus }}>
            {props.children}
        </GtmContext.Provider>
    );
};

export { GtmContext, GtmStore };
