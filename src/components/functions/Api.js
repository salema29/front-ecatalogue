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
                isVueProduit: result.is_vue_produit,
                isVueFeuilletable: result.is_vue_feuilletable
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

export const postShoppingListImage = async (shoppingList) => {
    try {

        const response = await fetch(`${API_BASE_URL}/api/post-shopping-list-html`, {
            method: "POST",
            body: JSON.stringify({ shoppingList })
        });

        if (!response.ok) {
            console.error(`Erreur HTTP : ${response.status}`);
            return null;
        }

        const data = await response.json();

        if (data.status === "success") {
            return data.data; // Contient le HTML de la shopping liste
        } else {
            console.error("Erreur :", data.message);
            return null;
        }
    } catch (error) {
        console.error("Erreur lors de la requête :", error);
        return null;
    }
};
