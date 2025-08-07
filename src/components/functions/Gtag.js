import { useEffect, useContext } from "react";
import { ClientContext } from "../../store-client";
import ReactGA from "react-ga4";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function useGtagPerClient() {
    const clientContext = useContext(ClientContext);
    const client_id = clientContext?.storedClient;

    useEffect(() => {
        if (!client_id) return;

        const injectGtag = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}api/get-gtag-client/${client_id}`);
                const result = await response.json();
                if (result.status === 200 && result.data) {
                    const gtagId = result.data;
                    ReactGA.initialize(gtagId);
                }
            } catch (error) {
                console.error("Erreur lors du chargement du gtag :", error);
            }
        };

        injectGtag();
    }, [client_id]);
}