const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchPrevNextVueDetail = async (productDetailId) => {
    try {
        const response = await fetch(`${API_BASE_URL}api/get-prev-next-vue-detail/${productDetailId}`);

        if (!response.ok) {
            console.error(`Erreur HTTP : ${response.status}`);
            return null;
        }

        const fetchedData = await response.json();

        if (fetchedData.status === 'success') {
            const result = fetchedData.data;
            return {
                previous: result.previous ? {
                    viewOrder: result.previous.view_order,
                    categoryId: result.previous.product_categorie_id,
                    productResumeId: result.previous.product_resume_id
                } : null,
                next: result.next ? {
                    viewOrder: result.next.view_order,
                    categoryId: result.next.product_categorie_id,
                    productResumeId: result.next.product_resume_id
                } : null
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

export const postTotalPriceEconomyByCatalogue = async (shoppingList, catalogId) => {
    const filteredList = shoppingList.filter(item => item.catalogId === catalogId);
    if (filteredList.length === 0) {
        console.warn("Aucun produit trouvé pour ce catalogue.");
        return null;
    }
    try {
        const response = await fetch(`${API_BASE_URL}/api/post-total-price-economy`, {
            method: 'POST',
            body: JSON.stringify({ shoppingList: filteredList }),
        });
        const result = await response.json();
        if (result.status === 'success') {
            return result.data;
        } else {
            console.error('Erreur API:', result.message);
            return null;
        }
    } catch (error) {
        console.error('Erreur réseau:', error);
        return null;
    }
};

export const fetchDefinitionMagasinChoice = async (clientId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/get-shop-choice/${clientId}`);

        if (!response.ok) {
            console.error(`Erreur HTTP : ${response.status}`);
            return null;
        }

        const fetchedData = await response.json();

        if (fetchedData.status === 'success') {
            const result = parseInt(fetchedData.data);
            return result;
        } else {
            console.error('Erreur API:', fetchedData.message);
            return null;
        }
    } catch (error) {
        console.error('Erreur de récupération des données:', error);
        return null;
    }
}

export const fetchShopListByClient = async (clientId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/get-shops-by-client/${clientId}`);

        if (!response.ok) {
            console.error(`Erreur HTTP : ${response.status}`);
            return null;
        }

        const fetchedData = await response.json();

        if (fetchedData.status === 'success') {
            const result = fetchedData.data;
            return result;
        } else {
            console.error('Erreur API:', fetchedData.message);
            return null;
        }
    } catch (error) {
        console.error('Erreur de récupération des données:', error);
        return null;
    }
}

export const fetchShopById = async (shopId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/get-shop-by-id/${shopId}`);

        if (!response.ok) {
            console.error(`Erreur HTTP : ${response.status}`);
            return null;
        }

        const fetchedData = await response.json();

        if (fetchedData.status === 'success') {
            const result = fetchedData.data;
            return result;
        } else {
            console.error('Erreur API:', fetchedData.message);
            return null;
        }
    } catch (error) {
        console.error('Erreur de récupération des données:', error);
        return null;
    }
}

export const fetchShopsByGeolocation = async (clientId, position) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/post-search-geolocalisation/${clientId}`, {
            method: 'POST',
            body: JSON.stringify({ position }),
        });

        if (!response.ok) {
            console.error(`Erreur HTTP : ${response.status}`);
            return null;
        }

        const fetchedData = await response.json();

        if (fetchedData.status === 'success') {
            return fetchedData.data;
        } else {
            console.error('Erreur API:', fetchedData.message);
            return null;
        }
    } catch (error) {
        console.error('Erreur de récupération des données:', error);
        return null;
    }
};

export const fetchShopsByKeyword = async (clientId, position) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/search-city-code/${clientId}`, {
            method: 'POST',
            body: JSON.stringify({ position }),
        });

        if (!response.ok) {
            console.error(`Erreur HTTP : ${response.status}`);
            return null;
        }

        const fetchedData = await response.json();

        if (fetchedData.status === 'success') {
            return fetchedData.data;
        } else {
            console.error('Erreur API:', fetchedData.message);
            return null;
        }
    } catch (error) {
        console.error('Erreur de récupération des données:', error);
        return null;
    }
};