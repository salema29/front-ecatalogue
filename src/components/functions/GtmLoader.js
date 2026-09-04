import { useEffect, useContext } from "react";
import { ClientContext } from "../../store-client";
import TagManager from 'react-gtm-module';
import { GtmContext } from  '../../store-gtm';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const GtmLoader = () => {
    const clientContext = useContext(ClientContext);
    const client_id = clientContext?.storedClient;
    const { storedGtmStatus } = useContext(GtmContext);

    useEffect(() => {
            if (!storedGtmStatus || !client_id) return;

            const loadGTM = async () => {
                try {
                    const response = await fetch(`${API_BASE_URL}api/get-gtm-client/${client_id}`);
                    const result = await response.json();

                    if (result.status === 200 ) {
                        const gtmId = result.data
                        TagManager.initialize({ gtmId: gtmId });
                    }
                } catch (error) {
                    console.error("Erreur lors du chargement de GTM :", error);
                }
            };

            loadGTM();
        }, [storedGtmStatus, client_id]);

    return null;
};

export default GtmLoader;
