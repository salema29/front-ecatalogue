import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import '../assets/styles/ProductList.css';
import { ShoppingListContext } from '../store-shopping-list';
import { useSearch } from '../components/search_bar/SearchContext';
import useIsMobile from './functions/useIsMobile';

function ProductItem({ product, index, categoryId, catalogId, showListCourse, clientColor }) {
    const [isLoading, setIsLoading] = useState(true);
    const isMobileView = useIsMobile();
    const { shoppingList, addProduct, removeProduct } = useContext(ShoppingListContext);

    const isAddedInList = shoppingList.some(
        (catalog) =>
            catalog.catalogId === catalogId &&
            catalog.products.some(
                (item) => item.productId === product.view_order && item.categoryId === categoryId
            )
    );

    const navigate = useNavigate();
    const id_produit_resume = product.id_produit;
    const { clearSearch } = useSearch();

    const handleDetailedView = (productId) => {
        clearSearch();
        navigate(`/product/${catalogId}/${productId}/${categoryId}/${id_produit_resume}`);
    };

    const gridStyle = {
        gridColumn: `span ${isMobileView ? product.mobile_width : product.desktop_width}`,
        gridRow: `span ${isMobileView ? product.mobile_height : product.desktop_height}`,
        order: product.view_order,
    };

    const styles = {
        addButton: {
            height: "32px",
            width: "32px",
            right: isMobileView ? "30px" : "20px",
            bottom: isMobileView ? "30px" : "20px"
        }
    }

    return (
        <div
            className={`grid-item ${isLoading ? "placeholder-content" : ""} ${isMobileView ? "mobile-items" : "desktop-items"}`}
            style={gridStyle}
        >
            <div className="item-wrapper">
                {product.type === "0" ? (
                    <div
                        onClick={() => handleDetailedView(product.view_order)}
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
                        {!isLoading && showListCourse === "t" && (
                            <div className="add-bouton" style={styles.addButton}>
                                {isAddedInList ? (
                                    <svg width={isMobileView ? "40" : "32"} height={isMobileView ? "40" : "32"} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            removeProduct(product.view_order, categoryId, catalogId);
                                        }}>
                                        <path d="M12.33 24.66C19.14 24.66 24.66 19.14 24.66 12.33C24.66 5.52 19.14 0 12.33 0C5.52 0 0 5.52 0 12.33C0 19.14 5.52 24.66 12.33 24.66Z" fill={clientColor ? clientColor : "#164194"} fillOpacity="0.1" />
                                        <path d="M17.68 14.27C16.68 15.37 15.55 16.36 14.46 17.33C13.86 17.86 13.29 18.36 12.74 18.88C12.63 18.99 12.48 19.04 12.33 19.04C12.18 19.04 12.04 18.99 11.92 18.88C11.37 18.36 10.8 17.86 10.2 17.33C9.10997 16.37 7.97997 15.37 6.97997 14.27C6.20997 13.52 5.71997 12.42 5.71997 11.46C5.71997 10.5 6.09997 9.52001 6.79997 8.82001C7.49997 8.11001 8.71997 7.55001 9.96997 8.01001C11.3 8.51001 11.88 9.72001 12.33 10.77C12.82 9.61001 13.82 8.24001 15.2 8.01001C16.27 7.84001 17.15 8.11001 17.85 8.82001C18.55 9.52001 18.93 10.46 18.93 11.46C18.93 12.46 18.43 13.52 17.67 14.27" fill={clientColor ? clientColor : "#164194"} />
                                        <path d="M17.68 14.27C16.68 15.37 15.55 16.36 14.46 17.33C13.86 17.86 13.29 18.36 12.74 18.88C12.63 18.99 12.48 19.04 12.33 19.04C12.18 19.04 12.04 18.99 11.92 18.88C11.37 18.36 10.8 17.86 10.2 17.33C9.10997 16.37 7.97997 15.37 6.97997 14.27C6.20997 13.52 5.71997 12.42 5.71997 11.46C5.71997 10.5 6.09997 9.52001 6.79997 8.82001C7.49997 8.11001 8.71997 7.55001 9.96997 8.01001C11.3 8.51001 11.88 9.72001 12.33 10.77C12.82 9.61001 13.82 8.24001 15.2 8.01001C16.27 7.84001 17.15 8.11001 17.85 8.82001C18.55 9.52001 18.93 10.46 18.93 11.46C18.93 12.46 18.43 13.52 17.67 14.27H17.68Z" stroke={clientColor ? clientColor : "#164194"} strokeWidth="0.5" strokeLinejoin="round" />
                                    </svg>

                                ) : (
                                    <svg width={isMobileView ? "40" : "32"} height={isMobileView ? "40" : "32"} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            addProduct(product.view_order, categoryId, catalogId, id_produit_resume);
                                        }}>
                                        <g clipPath="url(#clip0_5309_206)">
                                            <path d="M12.33 24.66C19.14 24.66 24.66 19.14 24.66 12.33C24.66 5.52 19.14 0 12.33 0C5.52 0 0 5.52 0 12.33C0 19.14 5.52 24.66 12.33 24.66Z" fill={clientColor ? clientColor : "#164194"} fillOpacity="0.1" />
                                            <path d="M17.68 14.27C16.68 15.37 15.55 16.36 14.46 17.33C13.86 17.86 13.29 18.36 12.74 18.88C12.63 18.99 12.48 19.04 12.33 19.04C12.18 19.04 12.04 18.99 11.92 18.88C11.37 18.36 10.8 17.86 10.2 17.33C9.10997 16.37 7.97997 15.37 6.97997 14.27C6.20997 13.52 5.71997 12.42 5.71997 11.46C5.71997 10.5 6.09997 9.52001 6.79997 8.82001C7.49997 8.11001 8.71997 7.55001 9.96997 8.01001C11.3 8.51001 11.88 9.72001 12.33 10.77C12.82 9.61001 13.82 8.24001 15.2 8.01001C16.27 7.84001 17.15 8.11001 17.85 8.82001C18.55 9.52001 18.93 10.46 18.93 11.46C18.93 12.46 18.43 13.52 17.67 14.27H17.68Z" stroke={clientColor ? clientColor : "#164194"} strokeLinejoin="round" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_5309_206">
                                                <rect width="24.66" height="24.66" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                )}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="item-link">
                        <iframe
                            src={product.html_name}
                            className="product-item-encart"
                            title={`Product ${index}`}
                            scrolling="no"
                            onLoad={() => setIsLoading(false)}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductItem;
