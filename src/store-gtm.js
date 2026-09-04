import React, { createContext, useState, useEffect } from 'react';

const GtmContext = createContext({
    storedGtmStatus: true,
    setStoredGtmStatus: () => {}
});

// GTM actif par defaut ; lecture sans effet de bord (l'ecriture est faite
// par le useEffect ci-dessous).
const readStoredGtmStatus = () => {
    const storedValue = localStorage.getItem('stored-gtm-status');
    if (storedValue === null) return true;
    try {
        return JSON.parse(storedValue);
    } catch (e) {
        console.error('Erreur de parsing localStorage:', e);
        return true;
    }
};

const GtmStore = (props) => {
    const [storedGtmStatus, setStoredGtmStatus] = useState(readStoredGtmStatus);

    useEffect(() => {
        try {
            localStorage.setItem('stored-gtm-status', JSON.stringify(storedGtmStatus));
        } catch (e) {
            console.error('Erreur de sauvegarde du statut GTM:', e);
        }
    }, [storedGtmStatus]);

    return (
        <GtmContext.Provider value={{ storedGtmStatus, setStoredGtmStatus }}>
            {props.children}
        </GtmContext.Provider>
    );
};

export { GtmContext, GtmStore };
