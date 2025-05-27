import React, { createContext, useState, useEffect } from 'react';

const ClientContext = createContext({
    storedClient: null,
    setStoredClient: () => {}
});

const ClientStore = (props) => {
    const [storedClient, setStoredClient] = useState(null);

    useEffect(() => {
        const storedClient = JSON.parse(localStorage.getItem('stored-client')) || null;
        setStoredClient(storedClient);
    }, []);

    return (
        <ClientContext.Provider value={{ storedClient, setStoredClient }}>
            {props.children}
        </ClientContext.Provider>
    );
};

export { ClientContext, ClientStore };