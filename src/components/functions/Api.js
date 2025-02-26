const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchViewChoice = async (catalogueId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/get-view-choice/${catalogueId}`);

        if (!response.ok) {
            console.error(`Erreur HTTP : ${response.status}`);
            return null;
        }

        const fetchedData = await response.json();

        if (fetchedData.status === 'success') {
            const result = fetchedData.data;
            return {
                isVueProduit : result.is_vue_produit,
                isVueFeuilletable : result.is_vue_feuilletable
            }
        } else {
            console.error('Erreur API:', fetchedData.message);
            return null;
        }
    } catch (error) {
        console.error('Erreur de récupération des données:', error);
        return null;
    }
};
