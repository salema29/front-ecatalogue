import { useEffect, useContext } from "react";
import { ClientContext } from "../../store-client";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const GtmLoader = () => {
    const clientContext = useContext(ClientContext);
    const client_id = clientContext.storedClient;

    useEffect(() => {
        if (document.cookie.includes("disableGTM=true")) return;

        let script = null;
        let noscript = null;

        const loadGTM = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}api/get-gtm-client/${client_id}`);
                const result = await response.json();

                if (result.status === 200) {
                    const gtmId = result.data;
                    const scriptId = 'gtm-script';
                    const noscriptId = 'gtm-noscript';

                    if (!document.getElementById(scriptId)) {
                        script = document.createElement('script');
                        script.id = scriptId;
                        script.src = `https://www.googletagmanager.com/gtm.js?id=GTM-${gtmId}`;
                        script.async = true;
                        document.head.appendChild(script);

                        window.dataLayer = window.dataLayer || [];
                        window.dataLayer.push({
                            'gtm.start': new Date().getTime(),
                            event: 'gtm.js',
                        });
                    }

                    if (!document.getElementById(noscriptId)) {
                        noscript = document.createElement('noscript');
                        noscript.id = noscriptId;
                        noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-${gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
                        document.body.insertBefore(noscript, document.body.firstChild);
                    }
                }
            } catch (error) {
                console.error("Erreur lors du chargement de GTM :", error);
            }
        };

        loadGTM();

        return () => {
            if (script && document.head.contains(script)) {
                document.head.removeChild(script);
            }
            if (noscript && document.body.contains(noscript)) {
                document.body.removeChild(noscript);
            }
        };
    }, [client_id]);

    return null;
};

export default GtmLoader;
