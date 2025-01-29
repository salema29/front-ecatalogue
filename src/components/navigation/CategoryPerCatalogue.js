import { useState, useEffect } from "react";

const CategoryPerCatalogue = (catalogId) => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const [categoryList, setCategoryList] = useState([]);
    const firstCategorieId = categoryList[0]?.categorie_id;

    // Fonction pour vérifier si une catégorie a des produits
    const hasProducts = async (categoryId) => {
        try {
            const response = await fetch(
                `${API_BASE_URL}/api/getProducts/${categoryId}/${catalogId}`
            );
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            return Array.isArray(data) && data.length > 0;
        } catch (error) {
            console.error("Error fetching product data for category:", error);
            return false; // En cas d'erreur, considérer qu'il n'y a pas de produits
        }
    };

    useEffect(() => {
        const fetchCategoriesWithProducts = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/getCategory/${catalogId}`);
                if (!response.ok) {
                    throw new Error('Problème de connexion');
                }
                const categories = await response.json();

                // Vérifier chaque catégorie pour voir si elle a des produits
                const filteredCategories = [];
                for (const category of categories) {
                    const hasProduct = await hasProducts(category.categorie_id);
                    // console.log(`categorie ${category.categorie_name} has product ? ${hasProduct}`);

                    if (hasProduct) {
                        filteredCategories.push(category);
                    }
                }

                setCategoryList(filteredCategories);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategoriesWithProducts();
    }, [catalogId, API_BASE_URL]);

    return { categoryList, firstCategorieId };
};

export default CategoryPerCatalogue;
