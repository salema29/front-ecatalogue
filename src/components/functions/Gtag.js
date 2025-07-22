import { useEffect, useContext } from "react";
import { ClientContext } from "../../store-client";

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
                    if (document.querySelector(`script[src="https://www.googletagmanager.com/ggtag/js?id=${gtagId}"]`)) return;

                    const script = document.createElement("script");
                    script.async = true;
                    script.src = `https://www.googletagmanager.com/gtag/js?id=${gtagId}`;
                    document.head.appendChild(script);

                    const inlineScript = document.createElement("script");
                    inlineScript.innerHTML = `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${gtagId}');
                    `;
                    document.head.appendChild(inlineScript);
                }
            } catch (error) {
                console.error("Erreur lors du chargement du gtag :", error);
            }
        };

        injectGtag();
    }, [client_id]);
}