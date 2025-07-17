import { useEffect, useContext } from "react";
import { ClientContext } from "../../store-client";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const GtmLoader = () => {

    const clientContext = useContext(ClientContext);
    const client_id = clientContext.storedClient

    useEffect(() => {
        if (!document.cookie.includes("disableGTM=true")){
            try {
                const response =  fetch(`${API_BASE_URL}api/get-gtm-client/${client_id}`);
                const result =  response.json();
                if (result.status === 200) {
                    const gtmId = result.data;
                    const scriptId = 'gtm-script';
                    const noscriptId = 'gtm-noscript';
                    if (!document.getElementById(scriptId)) {
                        // Inject script (head)
                        const script = document.createElement('script');
                        script.src = `https://www.googletagmanager.com/gtm.js?id=GTM-${gtmId}`;
                        script.async = true;
                        document.head.appendChild(script);
                        window.dataLayer = window.dataLayer || [];
                        window.dataLayer.push({
                            'gtm.start': new Date().getTime(),
                            event: 'gtm.js',
                        });
                        return () => {document.head.removeChild(script);};
                    }
                    if (!document.getElementById(noscriptId)) {
                        // Inject <noscript> (body)
                        const noscript = document.createElement('noscript');
                        noscript.innerHTML = ` <iframe id="${noscriptId}" src="https://www.googletagmanager.com/ns.html?id=GTM-${gtmId}"></iframe>`;
                        document.body.insertBefore(noscript, document.body.firstChild);
                        return () => {document.body.removeChild(noscript);};
                    }
                }
            } catch (error) {
                console.error("Erreur lors du chargement du gtag :", error);
            }
        }
    });

    return null;
};

export default GtmLoader;
