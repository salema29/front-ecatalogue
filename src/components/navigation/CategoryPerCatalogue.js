import { useState, useEffect } from "react";

const CategoryPerCatalogue = (catalogId) => {
    const [categoryList, setCategoryList] = useState([]);
    const firstCategorieId = categoryList[0]?.categorie_id;

    useEffect(() => {
        fetch(`http://localhost/admin-ecatalogue-v2/api/getCategory/${catalogId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Problème de connexion');
                }
                return response.json();
            })
            .then(data => setCategoryList(data))
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, [catalogId]);

    return { categoryList, firstCategorieId };
};

export default CategoryPerCatalogue;
