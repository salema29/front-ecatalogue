import { useEffect } from "react";

const loadGtmScript = () => {
    if (document.getElementById("gtm-script")) return; // Empêcher d'ajouter plusieurs fois GTM

    const script = document.createElement("script");
    script.id = "gtm-script";
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtm.js?id=GTM-KSBNZC3L";
    
    document.head.appendChild(script);
};

const GtmLoader = () => {
    useEffect(() => {
        if (document.cookie.includes("disableGTM=true")) return; // Vérifie si GTM est désactivé
        loadGtmScript();
    }, []);

    return null; // Ce composant ne rend rien, il sert juste à charger GTM
};

export default GtmLoader;
