import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoadingSpinner from '../components/spinner/LoadingSpinner'
import '../assets/styles/ProductDetail.css';
import disableEcatalogueAutoScroll from "../components/functions/DisableScroll";
import showOnlyEcatalogue from "../components/functions/ShowOnlyEcatalogue";
import addListICon from '../assets/icons/add-list.svg';
import addListIConOk from '../assets/icons/add-list-ok.svg';

function MainProduct() {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const ASSET_BASE_URL = process.env.REACT_APP_API_ASSET_URL;
    const { catalogId, product_id, categoryId } = useParams();
    const [headerData, setHeaderData] = useState(null);
    const [productData, setProductData] = useState(null);
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 767);
    const navigate = useNavigate();
    const heightToMinus = 0;
    const headerHeight = 20; // class "header" height
    const [wrapperHeight, setWrapperHeight] = useState(window.innerHeight - headerHeight); 
    const [isLoading, setIsLoading] = useState(true);

    const handleCatalogView = () => {
        navigate(`/catalog/${catalogId}`);
    };

    const handleClose = () => {
        navigate(`/product-list/${catalogId}/${categoryId}`);
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
        fetch(`${API_BASE_URL}/api/getProductDetailV2/${categoryId}/${product_id}`)
            .then((response) => response.json())
            .then((fetchedData) => setProductData(fetchedData))
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [product_id, API_BASE_URL]);

    useEffect(() => {
        if (headerData) {
            const updateHeight = () => {
                const stickyElement = document.querySelector('.header');
                const stickyHeight = stickyElement ? stickyElement.getBoundingClientRect().height : 0;
                const height = window.innerHeight - stickyHeight - heightToMinus;
                setWrapperHeight(height);
            };
    
            setTimeout(updateHeight, 500); // Assurez-vous que le DOM est à jour.
            window.addEventListener('resize', updateHeight);
    
            return () => {
                window.removeEventListener('resize', updateHeight);
            };
        }
    }, [headerData]);

    useEffect(() => {
        disableEcatalogueAutoScroll();
    }, []);

    showOnlyEcatalogue();

    return (
        <>
            {headerData ? (
                <>
                    <header className="header">
                        <div className="view-format-dialog-left-part">
                            <img
                                className="header-logo"
                                src={isMobileView ? headerData.client_logo_mobile : headerData.client_logo_desktop }
                                alt=""
                            />
                            <div className="header-text">
                                <p style={{ color: headerData.client_color }}>
                                    {headerData.catalogue_name_ln_un}{" "}
                                    {headerData.catalogue_name_ln_deux}{" "}
                                </p>
                                <p style={{ color: "black" }}>
                                    du {headerData.catalogue_date_validite_debut} au{" "}
                                    {headerData.catalogue_date_validite_fin}
                                </p>
                            </div>
                        </div>
                        <div className="view-format-dialog-right-part">
                            <button
                                className="view-format-dialog-close btn"
                                onClick={handleClose}
                            >
                                <img
                                    src={`${ASSET_BASE_URL}/icons/cross-icon-dark.svg`}
                                    alt="Fermer"
                                    width="25"
                                />
                            </button>
                        </div>
                    </header>
                    <div className="product-detail-container">
                        <div className="single-item-wrapper"
                            style={{
                                height: `${wrapperHeight}px`
                            }}
                        >
                            {productData ? (
                                <>
                                <iframe
                                    src={productData.html.html_name}
                                    className="product-item-detail placeholder-content"
                                    title={productData.html.html_name}
                                    width="auto"
                                    onLoad={() => setIsLoading(false)}
                                    // height="590px"
                                />
                                {isLoading === false && (
                                    <button
                                        className="add-bouton-detail btn"
                                        style={{ backgroundColor: headerData.client_color }}
                                    >
                                        <span className="add-bouton-detail-text">
                                            Ajouter à ma liste
                                        </span>
                                        <span className="add-bouton-detail-icon">
                                            <img
                                                src={addListICon}
                                                alt="add-to-basket"
                                            />
                                        </span>
                                    </button>
                                )}
                                </>
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