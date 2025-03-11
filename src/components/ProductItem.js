import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import '../assets/styles/ProductList.css';
import addListICon from '../assets/icons/add-list.svg';
import addListIConOk from '../assets/icons/add-list-ok.svg';
import { ShoppingListContext } from '../store-shopping-list';

function ProductItem({ product, index, categoryId, catalogId, API_BASE_URL }) {
    const [isLoading, setIsLoading] = useState(true);
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 767);
    const {shoppingList, setShoppingList} = useContext(ShoppingListContext);
    const isAddedInList = shoppingList.some(item => item.productId === product.view_order && item.categoryId === categoryId);

    const navigate = useNavigate();

    const handleDetailedView = (productId) => {
        navigate(`/product/${catalogId}/${productId}/${categoryId}`);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth <= 767);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [API_BASE_URL]);

    useEffect(() => {
        localStorage.setItem('shopping-list', JSON.stringify(shoppingList));
    }, [shoppingList]);

    const addInList = (productId, categoryId) => {
        // console.log('Add button clicked');
        setShoppingList(prevList => [...prevList, { productId: productId, categoryId: categoryId, count: 1 }]);
    }

    const removeInList = (productId, categoryId) => {
        // console.log('remove button clicked');
        setShoppingList(prevList => prevList.filter(item => !(item.productId === productId && item.categoryId === categoryId)));
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
            {product.type === "0" ? (
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
                                    event.stopPropagation(); // Evite d'entrer en vue detail pendant clic
                                    removeInList(product.view_order, categoryId);
                                }}></img>
                            ) : (
                                <img src={addListICon} alt="add-to-basket" onClick={(event) => {
                                    event.stopPropagation(); // Evite d'entrer en vue detail pendant clic
                                    addInList(product.view_order, categoryId);
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
