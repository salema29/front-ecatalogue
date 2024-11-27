import React from 'react';
import { useParams, useNavigate } from "react-router-dom";
import CategoryPerCatalogue from "./CategoryPerCatalogue"
import '../../assets/styles/CategoryMenu.css';

const CategoryMenu = ({categoryIdSelected}) => {
    const { catalogId } = useParams();
    const navigate = useNavigate();

    const handleProductsPerCategory = (catalogId, categoryId) => {
        navigate(`/products-resume/${catalogId}/${categoryId}`);
    };
    const { categoryList } = CategoryPerCatalogue(catalogId);

    return (
        <div>
            {categoryList.length > 0 ? (
                <div className="circular-icons-row">
                    {categoryList.map((category, index) => (
                            <div className="icon-container" key={category.categorie_id} height="186px"  onClick={() => handleProductsPerCategory(catalogId, category.categorie_id)} >
                                <img src={category.categorie_image} alt={category.categorie_name} className="icon" />
                                <p 
                                    style={
                                        category.categorie_id === categoryIdSelected
                                            ? { fontWeight: "bolder" }
                                            : {}
                                    }
                                    className="icon-label" 
                                >
                                    {category.categorie_name}
                                </p>
                        </div>
                    ))}
                </div>
            ) : (
                <>
                    {/* <p> Il n'y a pas de catégorie disponible </p> */}
                    <p> Il n'y a pas de produits disponible </p>
                </>
            )}
        </div>
    );
};
export default CategoryMenu;
