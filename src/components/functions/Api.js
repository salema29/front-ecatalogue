const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

/**
 * Effectue une requête vers l'API et renvoie `data.data` lorsque la réponse a la
 * forme `{ status: 'success', data: ... }`. Dans tous les autres cas (erreur
 * réseau, HTTP non-2xx, statut != 'success', requête annulée) l'erreur est
 * loguée et la fonction renvoie `null`.
 *
 * @param {string} path   chemin ajouté à API_BASE_URL (avec ou sans "/" initial
 *                         selon l'endpoint historique).
 * @param {{ method?: string, body?: any, signal?: AbortSignal }} [opts]
 */
const requestData = async (path, { method = 'GET', body, signal } = {}) => {
    try {
        const options = { method };
        if (body !== undefined) options.body = JSON.stringify(body);
        if (signal) options.signal = signal;

        const response = await fetch(`${API_BASE_URL}${path}`, options);

        if (!response.ok) {
            console.error(`Erreur HTTP : ${response.status}`);
            return null;
        }

        const data = await response.json();

        if (data.status === 'success') {
            return data.data;
        }

        console.error('Erreur API:', data.message);
        return null;
    } catch (error) {
        if (error.name === 'AbortError') {
            console.warn('Requête annulée.');
            return null;
        }
        console.error('Erreur de récupération des données:', error);
        return null;
    }
};

const mapPrevNextEntry = (entry) =>
    entry
        ? {
            viewOrder: entry.view_order,
            categoryId: entry.product_categorie_id,
            productResumeId: entry.product_resume_id
        }
        : null;

export const fetchPrevNextVueDetail = async (productDetailId) => {
    // NB : cet endpoint historique n'a pas de "/" après API_BASE_URL.
    const result = await requestData(`api/get-prev-next-vue-detail/${productDetailId}`);
    if (!result) return null;
    return {
        previous: mapPrevNextEntry(result.previous),
        next: mapPrevNextEntry(result.next)
    };
};

// Renvoie la liste des catégories d'un catalogue (tableau, vide en cas d'erreur).
// Version « fonction » du hook useCategoriesPerCatalogue, utilisable hors rendu
// (ex. dans un gestionnaire d'événement).
export const fetchCategories = async (catalogueId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/getCategory/${catalogueId}`);

        if (!response.ok) {
            console.error(`Erreur HTTP : ${response.status}`);
            return [];
        }

        const categories = await response.json();
        return Array.isArray(categories) ? categories : [];
    } catch (error) {
        console.error('Erreur de récupération des catégories:', error);
        return [];
    }
};

// Infos client de la page « catalogue abstrait » (get-data-client-info-v2).
export const fetchClientInfo = (clientId) =>
    requestData(`/api/get-data-client-info-v2/${clientId}`);

// Recupere l'identifiant analytics d'un client. `kind` = "gtag" | "gtm".
// Ces endpoints renvoient { status: 200, data } (et non l'enveloppe "success").
export const fetchAnalyticsId = async (kind, clientId) => {
    try {
        const response = await fetch(`${API_BASE_URL}api/get-${kind}-client/${clientId}`);
        const result = await response.json();
        return result.status === 200 ? (result.data || null) : null;
    } catch (error) {
        console.error(`Erreur lors du chargement de ${kind} :`, error);
        return null;
    }
};

export const fetchViewChoice = async (catalogueId) => {
    const result = await requestData(`/api/get-view-choice/${catalogueId}`);
    if (!result) return null;
    return {
        isVueProduit: result.is_vue_produit,
        isVueFeuilletable: result.is_vue_feuilletable
    };
};

export const postShoppingListImage = async (shoppingList, catalogId, options = {}) => {
    const filteredShoppingList = shoppingList.filter(item => item.catalogId === catalogId);

    if (filteredShoppingList.length === 0) {
        console.warn('Aucun élément correspondant au catalogId fourni.');
        return null;
    }

    // Renvoie le HTML de la shopping list.
    return requestData('/api/post-shopping-list-html', {
        method: 'POST',
        body: { shoppingList: filteredShoppingList },
        signal: options.signal
    });
};

export const postTotalPriceEconomyByCatalogue = async (shoppingList, catalogId) => {
    const filteredList = shoppingList.filter(item => item.catalogId === catalogId);

    if (filteredList.length === 0) {
        console.warn('Aucun produit trouvé pour ce catalogue.');
        return null;
    }

    return requestData('/api/post-total-price-economy', {
        method: 'POST',
        body: { shoppingList: filteredList }
    });
};

export const fetchDefinitionMagasinChoice = async (clientId) => {
    const result = await requestData(`/api/get-shop-choice/${clientId}`);
    return result === null ? null : parseInt(result);
};

export const fetchShopListByClient = (clientId) =>
    requestData(`/api/get-shops-by-client/${clientId}`);

export const fetchShopById = (shopId) =>
    requestData(`/api/get-shop-by-id/${shopId}`);

export const fetchShopsByGeolocation = (clientId, position) =>
    requestData(`/api/post-search-geolocalisation/${clientId}`, {
        method: 'POST',
        body: { position }
    });

export const fetchShopsByKeyword = (clientId, position) =>
    requestData(`/api/search-city-code/${clientId}`, {
        method: 'POST',
        body: { position }
    });
