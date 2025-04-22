import { useState, useEffect } from "react";

const CategoryPerCatalogue = (catalogId) => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const [categoryList, setCategoryList] = useState([]);
    const firstCategorieId = categoryList[0]?.categorie_id;


    useEffect(() => {
        const fetchCategoriesWithProducts = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/getCategory/${catalogId}`);
                const categories = await response.json();
                setCategoryList(categories);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategoriesWithProducts();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [catalogId, API_BASE_URL]);

    return { categoryList, firstCategorieId };
};

export default CategoryPerCatalogue;
