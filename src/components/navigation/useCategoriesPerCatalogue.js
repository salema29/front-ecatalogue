import { useState, useEffect } from "react";
import { fetchCategories } from "../functions/Api";

// Charge la liste des catégories d'un catalogue et expose la 1re catégorie.
const useCategoriesPerCatalogue = (catalogId) => {
    const [categoryList, setCategoryList] = useState([]);
    const firstCategorieId = categoryList[0]?.categorie_id;

    useEffect(() => {
        if (!catalogId) return undefined;

        let cancelled = false;
        fetchCategories(catalogId).then((categories) => {
            if (!cancelled) setCategoryList(categories);
        });

        return () => {
            cancelled = true;
        };
    }, [catalogId]);

    return { categoryList, firstCategorieId };
};

export default useCategoriesPerCatalogue;
