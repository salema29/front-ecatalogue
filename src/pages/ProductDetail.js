import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoadingSpinner from '../components/spinner/LoadingSpinner'
import '../assets/styles/ProductDetail.css';

function MainProduct() {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const { catalogId, product_id } = useParams();
    const [headerData, setHeaderData] = useState(null);
    const [productData, setProductData] = useState(null);
    const navigate = useNavigate();


    const handleCatalogView = () => {
        navigate(`/catalog/${catalogId}`);
    };

    const handleClose = () => {
        navigate(`/`);
    };

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/getOneSlide/${catalogId}`)
            .then((response) => response.json())
            .then((fetchedData) => setHeaderData(fetchedData))
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [catalogId, API_BASE_URL]);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/getProductDetail/${product_id}`)
            .then((response) => response.json())
            .then((fetchedData) => setProductData(fetchedData))
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [product_id, API_BASE_URL]);

    return (
        <>
            {headerData ? (
                <>
                    <header className="header">
                        <div className="view-format-dialog-left-part">
                            <img
                                className="header-logo"
                                src={headerData.client_logo}
                                alt=""
                            />
                            <div className="header-text">
                                <p style={{ color: headerData.client_color }}>
                                    {headerData.catalogue_name_ln_un}{" "}
                                    {headerData.catalogue_name_ln_deux}{" "}
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
                                    alt="Fermer"
                                    width="25"
                                />
                            </button>
                        </div>
                    </header>
                    <div className="product-detail-container">
                        <div className="single-item-wrapper">
                            {productData ? (
                                <iframe
                                    src={productData.html.html_name}
                                    className="product-item"
                                    title={productData.html.html_name}
                                    width="auto"
                                    height="590px"
                                />
                            ) : (
                                <LoadingSpinner />
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <LoadingSpinner />
            )}
        </>
    );
};

export default MainProduct;