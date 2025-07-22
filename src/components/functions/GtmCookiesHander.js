import { useEffect, useContext } from "react";
import { ClientContext } from "../../store-client";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const GtmLoader = () => {
    const clientContext = useContext(ClientContext);
    const client_id = clientContext?.storedClient;

    useEffect(() => {
        if (!client_id || document.cookie.includes("disableGTM=true")) return;

        const loadGTM = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}api/get-gtm-client/${client_id}`);
                const result = await response.json();

                if (result.status === 200) {
                    const gtmId = result.data;
                    const scriptId = "gtm-script";
                    const noscriptId = "gtm-noscript";

                    if (!document.getElementById(scriptId)) {
                        const script = document.createElement("script");
                        script.id = scriptId;
                        script.innerHTML = `
                        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','${gtmId}');
                        `;
                        document.head.prepend(script);
                    }

                    if (!document.getElementById(noscriptId)) {
                        const noscript = document.createElement("noscript");
                        noscript.id = noscriptId;
                        noscript.innerHTML = `
                        <iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
                        document.body.insertBefore(noscript, document.body.firstChild);
                    }
                } else {
                    console.warn("Échec récupération ID GTM :", result);
                }
            } catch (error) {
                console.error("Erreur lors du chargement de GTM :", error);
            }
        };

        loadGTM();
    }, [client_id]);

    return null;
};

export default GtmLoader;
