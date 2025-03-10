import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import '../assets/styles/ProductList.css';
import addListICon from '../assets/icons/add-list.svg';
import addListIConOk from '../assets/icons/add-list-ok.svg';

function ProductItem({ product, index, categoryId, catalogId, API_BASE_URL }) {
    const [isLoading, setIsLoading] = useState(true);
    const [isNotFound, setIsNotFound] = useState(false);
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 767);
    const [isAddedInList, setIsAddedInList] = useState(false);

    const navigate = useNavigate();

    const handleDetailedView = (product_id) => {
        navigate(`/product/${catalogId}/${product_id}/${categoryId}`);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth <= 767);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [API_BASE_URL]);

    if (isNotFound) {
        return (
            <div className="product-item not-found">
                <p>Produit non trouvé</p>
            </div>
        );
    }

    const addInList = () => {
        console.log('Add button clicked');
        setIsAddedInList(true);
    }

    const removeInList = () => {
        console.log('remove button clicked');
        setIsAddedInList(false);
    }

    return (
        <div
            key={index}
            className={`grid-item ${isLoading ? 'placeholder-content' : ''} ${isMobileView ? 'mobile-items' : 'desktop-items'}`}
            style={{
                gridColumn: `span ${isMobileView ? product.mobile_width : product.desktop_width}`,
                gridRow: `span ${isMobileView ? product.mobile_height : product.desktop_height}`,
                order: product.view_order,
            }}
        >
            {product.type == 0 ? (
                // Type 0: Produit avec clic pour détail
                <div className="item-wrapper">
                    <div
                        onClick={() => handleDetailedView(product.view_order, product.categoryId)}
                        className="item-link"
                        style={{
                            cursor: 'pointer',
                        }}
                    >
                        <iframe
                            src={product.html_name}
                            className="product-item"
                            title={`Product ${index}`}
                            scrolling="no"
                            onLoad={() => setIsLoading(false)}
                        />
                        {isLoading === false && (
                            <div className="add-bouton">
                            {isAddedInList ? (
                                <img src={addListIConOk} alt="added-to-basket" onClick={(event) => {
                                    event.stopPropagation(); // Empêche handleDetailedView de s'exécuter
                                    removeInList();
                                }}></img>
                            ) : (
                                <img src={addListICon} alt="add-to-basket" onClick={(event) => {
                                    event.stopPropagation(); // Empêche handleDetailedView de s'exécuter
                                    addInList();
                                }}></img>
                            )}
                        </div>
                        )}
                    </div>
                </div>
            ) : (
                // Autre type de produit : sans clic
                <div className="item-wrapper">
                    <div className="item-link">
                        <iframe
                            src={product.html_name}
                            className="product-item"
                            title={`Product ${index}`}
                            scrolling="no"
                            onLoad={() => setIsLoading(false)}
                        />
                    </div>
                </div>
            )}
        </div>
    );

}

export default ProductItem;
