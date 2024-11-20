import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CategoryNavigation from "../components/CategoryNavigation";
import "../assets/styles/Product.css";

function Product() {
    const { idCatalog } = useParams();
    const [headerData, setHeaderData] = useState(null);
    const [productData, setProductData] = useState([]);
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 767);
    const navigate = useNavigate();

    const handleClose = () => {
        navigate(`/`);
    };

    const handleCatalogView = () => {
        navigate(`/catalog/${idCatalog}`);
    };

    const handleDetailedView = () => {
        navigate(`/product/${idCatalog}`);
    };
    // Gerer le media query pour la mise en page responsive du grille desktop/moble
    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth <= 767);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const fetchHeaderData = async () => {
            try {
                const response = await fetch(
                    `http://localhost/admin-ecatalogue-v2/api/getOneSlide/${idCatalog}`
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                if (data && Object.keys(data).length > 0) {
                    setHeaderData(data);
                } else {
                    console.warn("Empty or invalid slide data received");
                }
            } catch (error) {
                console.error("Error fetching slide data: ", error);
            }
        };

        fetchHeaderData();
    }, [idCatalog]);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await fetch(
                    `http://localhost/admin-ecatalogue-v2/api/getProducts/104`
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                if (Array.isArray(data) && data.length > 0) {
                    setProductData(data);
                } else {
                    console.warn("Empty or invalid product data received");
                    setProductData([]);
                }
            } catch (error) {
                console.error("Error fetching product data: ", error);
            }
        };

        fetchProductData();
    }, []);

    return (
        <>
            {headerData ? (
                <>
                    <div className="sticky">
                        <header className="view-format-dialog-header">
                            <div className="view-format-dialog-left-part">
                                <img
                                    className="view-format-dialog-header-logo"
                                    src={headerData.client_logo}
                                    alt=""
                                />
                                <div className="view-format-dialog-header-text">
                                    <p>
                                        {headerData.catalogue_name_ln_un}{" "}
                                        {headerData.catalogue_name_ln_deux}
                                    </p>
                                    <p>
                                        du {headerData.catalogue_date_validite_debut} au{" "}
                                        {headerData.catalogue_date_validite_fin}
                                    </p>
                                </div>
                            </div>
                            <div className="view-format-dialog-right-part">
                                <button
                                    className="view-format-switcher btn"
                                    onClick={handleCatalogView}
                                >
                                    <span style={{
                                        height: "25",
                                        width: "auto"
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="51" height="30" fill="none"><g stroke={headerData ? headerData.client_color : "#fff"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.401" clipPath="url(#a)">
                                            <path d="M5.356 21.495h12.382c5.8 0 7.09 5.796 7.09 5.796V6.496S23.538.701 17.738.701H5.356v20.794ZM44.724 21.495H31.956c-5.8 0-7.09 5.796-7.09 5.796V6.496s1.29-5.795 7.09-5.795h12.768v20.794Z" />
                                            <path d="M24.866 28.096h-.038s-1.29-4.569-7.09-4.569H2.94V2.694" />
                                            <path d="M24.866 29.3h-.038s-1.29-3.548-7.09-3.548H.701V4.854M24.942 28.096h.038s1.289-4.569 7.09-4.569h15.013V2.694" />
                                            <path d="M24.942 29.3h.038s1.289-3.548 7.09-3.548h17.25V4.854" /></g><defs><clipPath id="a">
                                                <path fill="#fff" d="M0 0h50.021v30H0z" /></clipPath></defs>
                                        </svg>
                                    </span>
                                </button>
                                <button
                                    className="view-format-dialog-close btn"
                                    onClick={handleClose}
                                >
                                    <img
                                        src="https://preprod-appli-server.vivetic.com/web_si/front-ecatalogue-v2/assets/icons/cross-icon.svg"
                                        width="25"
                                        alt="Fermer"
                                    />
                                </button>
                            </div>
                        </header>
                        <CategoryNavigation />
                    </div>

                    <div className="container">
                        <div className="grid-container">
                            {productData.length > 0 ? (
                                productData.map((product, index) => {
                                    // Retourne uniquement les produit de type vue resumé
                                    if (product.view_type === '1') {
                                        return (
                                            <div
                                                key={index}
                                                className={`grid-item ${isMobileView ? 'mobile-items' : 'desktop-items'}`}
                                                style={{
                                                    gridColumn: `span ${isMobileView ? product.mobile_width : product.desktop_width}`,
                                                    gridRow: `span ${isMobileView ? product.mobile_height : product.desktop_height}`,
                                                    order: product.view_order,
                                                }}
                                            >
                                                <div className="item-wrapper">
                                                    <div
                                                        onClick={handleDetailedView}
                                                        className="item-link"
                                                    >
                                                        <iframe
                                                            src={`https://intranet.vivetic.com/labo/15556/sftp_simulation/catalogue_sftp/HTML/${product.html_name}`}
                                                            className="product-item"
                                                            title={`Product ${index}`}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }

                                    return null;
                                })
                            ) : (
                                <p>No products available</p>
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
}

export default Product;
