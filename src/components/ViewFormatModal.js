import React, { useEffect, useState } from "react";
import "../assets/styles/ViewFormatDialog.css";
import { useParams, useNavigate } from "react-router-dom";
import CategoryPerCatalogue from "../components/navigation/CategoryPerCatalogue";
import LoadingSpinner from '../components/spinner/LoadingSpinner';
import handleOrientationChange from "./functions/Orientation";
import MiniSpinner from "./spinner/MiniSpinner";

function ViewFormatDialog() {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const ASSET_BASE_URL = process.env.REACT_APP_API_ASSET_URL;
    const { catalogId } = useParams();
    const [headerData, setHeaderData] = useState(null);
    const navigate = useNavigate();

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
        handleOrientationChange();

        window.addEventListener("resize", handleOrientationChange);
        window.addEventListener("orientationchange", handleOrientationChange);

        return () => {
            window.removeEventListener("resize", handleOrientationChange);
            window.removeEventListener("orientationchange", handleOrientationChange);
        };
    }, []);

    const { firstCategorieId } = CategoryPerCatalogue(catalogId);

    const handleProductView = () => {
        navigate(`/product-list/${catalogId}/${firstCategorieId}`);
    };

    const handleCatalogView = () => {
        navigate(`/catalog/${catalogId}`);
    };

    return (
        <>
            {headerData ? (
                <>
                    <header className="header view-format-dialog-header">
                        <div className="view-format-dialog-left-part">
                            <img
                                className="header-logo"
                                src={headerData.client_logo}
                                // src='https://v2.ecatalogues.fr/clients/Gutenberg/Client_logo/logo_gut_noir.png'
                                alt=""
                            />
                            <div className="header-text">
                                <p style={{ color: headerData.client_color }}>
                                    {" "}
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
                    <div className="view-format-dialog-content">
                        <div className="view-format-dialog-desktop-content container">
                            <div className="view-format-dialog-desktop-left-part">
                                <span className="view-format-dialog-side-image">
                                    <img
                                        src={headerData.slide_image}
                                        alt=" {headerData.catalogue_name_ln_un} {headerData.catalogue_name_ln_deux} "
                                    />
                                </span>
                            </div>
                            <div className="view-format-dialog-desktop-right-part">
                                <div className="view-format-icon-container">
                                    <img
                                        className="view-format-icon"
                                        src={`${ASSET_BASE_URL}/icons/desktop-view-format-icon-dark.svg`}
                                        alt=""
                                    />
                                    <h2
                                        style={{ color: headerData.client_color, marginBottom: 0 }}
                                        className="view-format-text"
                                    >
                                        <span style={{ fontWeight: 700 }}>Nouveau !</span> choisissez votre mode de lecture...
                                    </h2 >
                                    <p style={{ color: "black" }}>    Version <span className="text-gras" >simplifiée par produit</span> et créez ainsi directement vos listes
                                        de courses, ou continuer en <span className="text-gras" >version feuilletable.</span>
                                    </p>
                                </div>
                                <div className="view-format-dialog-button-container">
                                    <button
                                        className="view-format-dialog-button btn"
                                        style={{ backgroundColor: headerData.client_color }}
                                        onClick={firstCategorieId ? handleProductView : () => { }}
                                    >
                                        {firstCategorieId ? (
                                            <>
                                                <span className="view-format-dialog-button-text">
                                                    Vue produit
                                                </span>
                                                <span className="view-format-dialog-button-icon">
                                                    <img
                                                        src={`${ASSET_BASE_URL}/icons/by-product-icon.svg`}
                                                        alt=""
                                                    />
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <span className="view-format-dialog-button-text">
                                                    Vue produit
                                                </span>
                                                <span className="view-format-dialog-button-icon">
                                                    <MiniSpinner />
                                                </span>
                                            </>
                                        )}
                                    </button>
                                    <button
                                        className="view-format-dialog-button btn"
                                        style={{ backgroundColor: headerData.client_color }}
                                        onClick={handleCatalogView}
                                    >
                                        <span className="view-format-dialog-button-text">
                                            Vue feuilletable
                                        </span>
                                        <span className="view-format-dialog-button-icon">
                                            <img
                                                src={`${ASSET_BASE_URL}/icons/by-catalog-icon.svg`}
                                                alt=""
                                            />
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="view-format-dialog-mobile-content container">
                            <div className="view-format-icon-container">
                                <img
                                    className="view-format-icon"
                                    src={`${ASSET_BASE_URL}/icons/desktop-view-format-icon-dark.svg`}
                                    alt=""
                                />
                                <h2 className="view-format-text" style={{ color: headerData.client_color, fontWeight: 900 }}>
                                    Choisissez votre mode de lecture
                                </h2>
                            </div>
                            <div className="view-format-dialog-button-container">
                            <button
                                        className="view-format-dialog-button btn"
                                        style={{ backgroundColor: headerData.client_color }}
                                        onClick={firstCategorieId ? handleProductView : () => { }}
                                    >
                                        {firstCategorieId ? (
                                            <>
                                                <span className="view-format-dialog-button-text">
                                                    Vue produit
                                                </span>
                                                <span className="view-format-dialog-button-icon">
                                                    <img
                                                        src={`${ASSET_BASE_URL}/icons/by-product-icon.svg`}
                                                        alt=""
                                                    />
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <span className="view-format-dialog-button-text">
                                                    Vue produit
                                                </span>
                                                <span className="view-format-dialog-button-icon">
                                                    <MiniSpinner />
                                                </span>
                                            </>
                                        )}
                                    </button>
                                <button
                                    style={{ backgroundColor: headerData.client_color }}
                                    className="view-format-dialog-button"
                                    onClick={handleCatalogView}
                                >
                                    <span
                                        className="view-format-dialog-button-text"
                                        style={{ cursor: "pointer" }}
                                    >
                                        Vue feuilletable
                                    </span>
                                    <span className="view-format-dialog-button-icon">
                                        <img
                                            src={`${ASSET_BASE_URL}/icons/by-catalog-icon.svg`}
                                            alt=""
                                        />
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <LoadingSpinner />
            )}
        </>
    );
}

export default ViewFormatDialog;
