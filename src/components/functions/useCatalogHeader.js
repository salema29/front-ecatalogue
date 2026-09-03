import { useEffect, useState } from "react";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

/**
 * Charge les données d'en-tête d'un catalogue via l'endpoint `getOneSlide`
 * (logo mobile/desktop, couleur client, nom, dates de validité,
 * show_list_course, catalogue_link, etc.).
 *
 * Renvoie `null` tant que la donnée n'est pas chargée (ou en cas d'erreur).
 */
const useCatalogHeader = (catalogId) => {
    const [headerData, setHeaderData] = useState(null);

    useEffect(() => {
        if (!catalogId) return undefined;

        let cancelled = false;
        fetch(`${API_BASE_URL}/api/getOneSlide/${catalogId}`)
            .then((response) => response.json())
            .then((data) => {
                if (!cancelled) setHeaderData(data);
            })
            .catch((error) => console.error("Error fetching data:", error));

        return () => {
            cancelled = true;
        };
    }, [catalogId]);

    return headerData;
};

export default useCatalogHeader;
