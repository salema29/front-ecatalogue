import React from 'react';
import { useParams, useNavigate } from "react-router-dom";
import '../../assets/styles/CategoryMenu.css';

const CategoryMenu = ({ categoryIdSelected, categoryList }) => {
    const { catalogId } = useParams();
    const navigate = useNavigate();

    const handleProductsPerCategory = (catalogId, categoryId) => {
        navigate(`/product-list/${catalogId}/${categoryId}`);
    };

    return (
        <div className="category-container">
            {categoryList.length > 0 ? (
                <div className="circular-icons-row">
                    {categoryList.map((category, index) => (
                        <div className="icon-container" key={category.categorie_id} height="186px" onClick={() => handleProductsPerCategory(catalogId, category.categorie_id)} >
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
                    <p> Chargement en cours ... </p>
                </>
            )}
        </div>
    );
};
export default CategoryMenu;
