import React, { createContext, useState, useEffect } from 'react';

const ClientContext = createContext({
    storedClient: null,
    setStoredClient: () => {}
});

const readStoredClient = () => {
    try {
        return JSON.parse(localStorage.getItem('stored-client')) || null;
    } catch (e) {
        console.error('Erreur de lecture du client:', e);
        return null;
    }
};

const ClientStore = (props) => {
    const [storedClient, setStoredClient] = useState(readStoredClient);

    // Persistance centralisée : les composants n'ont plus qu'à appeler
    // setStoredClient, la sauvegarde localStorage est faite ici.
    useEffect(() => {
        if (storedClient == null) return;
        try {
            localStorage.setItem('stored-client', JSON.stringify(storedClient));
        } catch (e) {
            console.error('Erreur de sauvegarde du client:', e);
        }
    }, [storedClient]);

    return (
        <ClientContext.Provider value={{ storedClient, setStoredClient }}>
            {props.children}
        </ClientContext.Provider>
    );
};

export { ClientContext, ClientStore };
