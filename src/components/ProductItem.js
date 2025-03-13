import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import '../assets/styles/ProductList.css';
import addListICon from '../assets/icons/add-list.svg';
import addListIConOk from '../assets/icons/add-list-ok.svg';
import { ShoppingListContext } from '../store-shopping-list';

function ProductItem({ product, index, categoryId, catalogId, showListCourse, API_BASE_URL }) {
    const [isLoading, setIsLoading] = useState(true);
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 767);
    const { shoppingList, setShoppingList } = useContext(ShoppingListContext);

    const isAddedInList = shoppingList.some(
        (catalog) =>
            catalog.catalogId === catalogId &&
            catalog.products.some(
                (item) => item.productId === product.view_order && item.categoryId === categoryId
            )
    );

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
        localStorage.setItem("shopping-list", JSON.stringify(shoppingList));
    }, [shoppingList]);

    const addInList = (productId, categoryId, catalogId) => {
        setShoppingList((prevList) => {
            const catalogIndex = prevList.findIndex((item) => item.catalogId === catalogId);
            if (catalogIndex !== -1) {
                const updatedCatalog = {
                    ...prevList[catalogIndex],
                    products: [
                        ...prevList[catalogIndex].products,
                        { productId, categoryId, count: 1 },
                    ],
                };
                return [
                    ...prevList.slice(0, catalogIndex),
                    updatedCatalog,
                    ...prevList.slice(catalogIndex + 1),
                ];
            } else {
                return [
                    ...prevList,
                    {
                        catalogId,
                        products: [{ productId, categoryId, count: 1 }],
                    },
                ];
            }
        });
    };

    const removeInList = (productId, categoryId, catalogId) => {
        setShoppingList((prevList) => {
            const catalogIndex = prevList.findIndex((item) => item.catalogId === catalogId);
            if (catalogIndex !== -1) {
                const updatedProducts = prevList[catalogIndex].products.filter(
                    (item) => !(item.productId === productId && item.categoryId === categoryId)
                );
                if (updatedProducts.length > 0) {
                    const updatedCatalog = {
                        ...prevList[catalogIndex],
                        products: updatedProducts,
                    };
                    return [
                        ...prevList.slice(0, catalogIndex),
                        updatedCatalog,
                        ...prevList.slice(catalogIndex + 1),
                    ];
                } else {
                    return [
                        ...prevList.slice(0, catalogIndex),
                        ...prevList.slice(catalogIndex + 1),
                    ];
                }
            }
            return prevList;
        });
    };

    return (
        <div
            key={index}
            className={`grid-item ${isLoading ? "placeholder-content" : ""} ${isMobileView ? "mobile-items" : "desktop-items"
                }`}
            style={{
                gridColumn: `span ${isMobileView ? product.mobile_width : product.desktop_width}`,
                gridRow: `span ${isMobileView ? product.mobile_height : product.desktop_height}`,
                order: product.view_order,
            }}
        >
            {product.type === "0" ? (
                <div className="item-wrapper">
                    <div
                        onClick={() => handleDetailedView(product.view_order, product.categoryId)}
                        className="item-link"
                        style={{ cursor: "pointer" }}
                    >
                        <iframe
                            src={product.html_name}
                            className="product-item"
                            title={`Product ${index}`}
                            scrolling="no"
                            onLoad={() => setIsLoading(false)}
                        />
                        {(isLoading === false && showListCourse === "t") && (
                            <div className="add-bouton">
                                {isAddedInList ? (
                                    <img
                                        src={addListIConOk}
                                        alt="added-to-basket"
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            removeInList(product.view_order, categoryId, catalogId);
                                        }}
                                    />
                                ) : (
                                    <img
                                        src={addListICon}
                                        alt="add-to-basket"
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            addInList(product.view_order, categoryId, catalogId);
                                        }}
                                    />
                                )}
                            </div>
                        )}
                    </div>
                </div>
            ) : (
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