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

export const postShoppingListImage = async (shoppingList, catalogId, options = {}) => {
    try {
        // Filtrer la liste des achats par catalogId
        const filteredShoppingList = shoppingList.filter(item => item.catalogId === catalogId);

        if (filteredShoppingList.length === 0) {
            console.warn("Aucun élément correspondant au catalogId fourni.");
            return null;
        }

        const response = await fetch(`${API_BASE_URL}/api/post-shopping-list-html`, {
            method: "POST",
            body: JSON.stringify({ shoppingList: filteredShoppingList }),
            signal: options.signal, // Ajout du signal pour annuler le fetch si nécessaire 
        });

        if (!response.ok) {
            console.error(`Erreur HTTP : ${response.status}`);
            return null;
        }

        const data = await response.json();

        if (data.status === "success") {
            return data.data; // Contient le HTML de la shopping list
        } else {
            console.error("Erreur :", data.message);
            return null;
        }
    } catch (error) {
        if (error.name === "AbortError") {
            console.warn("Requête annulée par l'utilisateur.");
            return null; 
        }
        console.error("Erreur lors de la requête :", error);
        return null;
    }
};
