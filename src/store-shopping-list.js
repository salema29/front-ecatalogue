import React, { createContext, useState, useEffect, useCallback } from 'react';

const ShoppingListContext = createContext({
    shoppingList: [],
    setShoppingList: () => {},
    addProduct: () => {},
    removeProduct: () => {},
    removeProductByResumeId: () => {},
    changeProductCount: () => {}
});

const readStoredShoppingList = () => {
    try {
        return JSON.parse(localStorage.getItem('shopping-list')) || [];
    } catch (e) {
        console.error('Erreur de lecture de la liste de courses:', e);
        return [];
    }
};

// Retire du catalogue ciblé le(s) produit(s) satisfaisant `match`, et l'entrée
// catalogue si elle devient vide. Renvoie `list` inchangée si rien ne bouge
// (évite un re-render inutile). Mise à jour immuable.
const removeMatchingProduct = (list, catalogId, match) => {
    const catalogIndex = list.findIndex((c) => c.catalogId === catalogId);
    if (catalogIndex === -1) return list;
    const products = list[catalogIndex].products.filter((p) => !match(p));
    if (products.length === list[catalogIndex].products.length) return list;
    if (products.length === 0) return list.filter((_, i) => i !== catalogIndex);
    return list.map((c, i) => (i === catalogIndex ? { ...c, products } : c));
};

const ShoppingListStore = (props) => {
    const [shoppingList, setShoppingList] = useState(readStoredShoppingList);

    // Persistance centralisée : toute mise à jour du contexte est sauvegardée ici,
    // les composants n'ont plus à appeler localStorage.setItem eux-mêmes.
    useEffect(() => {
        try {
            localStorage.setItem('shopping-list', JSON.stringify(shoppingList));
        } catch (e) {
            console.error('Erreur de sauvegarde de la liste de courses:', e);
        }
    }, [shoppingList]);

    // Ajoute un produit à la liste du catalogue (le crée si besoin), quantité 1.
    const addProduct = useCallback((productId, categoryId, catalogId, id_produit_resume) => {
        setShoppingList((prevList) => {
            const catalogIndex = prevList.findIndex((item) => item.catalogId === catalogId);
            const newProduct = { productId, categoryId, count: 1, id_produit_resume };
            if (catalogIndex !== -1) {
                const updatedCatalog = {
                    ...prevList[catalogIndex],
                    products: [...prevList[catalogIndex].products, newProduct],
                };
                return [
                    ...prevList.slice(0, catalogIndex),
                    updatedCatalog,
                    ...prevList.slice(catalogIndex + 1),
                ];
            }
            return [...prevList, { catalogId, products: [newProduct] }];
        });
    }, []);

    // Retire un produit identifié par (productId, categoryId) — vues mosaïque / détail.
    const removeProduct = useCallback((productId, categoryId, catalogId) => {
        setShoppingList((prevList) =>
            removeMatchingProduct(
                prevList,
                catalogId,
                (p) => p.productId === productId && p.categoryId === categoryId
            )
        );
    }, []);

    // Retire un produit identifié par id_produit_resume — modale liste de courses.
    const removeProductByResumeId = useCallback((catalogId, resumeId) => {
        setShoppingList((prevList) =>
            removeMatchingProduct(prevList, catalogId, (p) => p.id_produit_resume === resumeId)
        );
    }, []);

    // Incrémente / décrémente la quantité (delta = +1 ou -1) ; retire le produit
    // si la quantité tombe à 0.
    const changeProductCount = useCallback((catalogId, resumeId, delta) => {
        setShoppingList((prevList) => {
            const catalogIndex = prevList.findIndex((c) => c.catalogId === catalogId);
            if (catalogIndex === -1) return prevList;
            const product = prevList[catalogIndex].products.find(
                (p) => p.id_produit_resume === resumeId
            );
            if (!product) return prevList;
            const newCount = Math.max(0, (product.count || 0) + delta);
            if (newCount === 0) {
                return removeMatchingProduct(
                    prevList,
                    catalogId,
                    (p) => p.id_produit_resume === resumeId
                );
            }
            return prevList.map((c, i) =>
                i === catalogIndex
                    ? {
                        ...c,
                        products: c.products.map((p) =>
                            p.id_produit_resume === resumeId ? { ...p, count: newCount } : p
                        ),
                    }
                    : c
            );
        });
    }, []);

    return (
        <ShoppingListContext.Provider
            value={{
                shoppingList,
                setShoppingList,
                addProduct,
                removeProduct,
                removeProductByResumeId,
                changeProductCount,
            }}
        >
            {props.children}
        </ShoppingListContext.Provider>
    );
};

export { ShoppingListContext, ShoppingListStore };
