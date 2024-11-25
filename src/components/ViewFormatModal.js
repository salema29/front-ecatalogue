import React, { useEffect, useState } from "react";
import "../assets/styles/ViewFormatDialog.css";
import { useParams, useNavigate } from "react-router-dom";
import LoadingSpinner from '../components/spinner/LoadingSpinner'

function ViewFormatDialog() {
    const { catalogId } = useParams();
    const [slideData, setSlideData] = useState(null);
    const navigate = useNavigate();

    const handleClose = () => {
        navigate(`/`);
    };

    useEffect(() => {
        fetch(`http://localhost/admin-ecatalogue-v2/api/getOneSlide/${catalogId}`)
            .then((response) => response.json())
            .then((fetchedData) => setSlideData(fetchedData))
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [catalogId]);

    const handleProductView = () => {
        navigate(`/products/${catalogId}`);
    };

    const handleCatalogView = () => {
        navigate(`/catalog/${catalogId}`);
    };

    return (
        <>
            {slideData ? (
                <>
                    <header className="header view-format-dialog-header">
                        <div className="view-format-dialog-left-part">
                            <img
                                className="header-logo"
                                src={slideData.client_logo}
                                alt=""
                            />
                            <div className="header-text">
                                <p style={{ color: slideData.client_color }}>
                                    {" "}
                                    {slideData.catalogue_name_ln_un}{" "}
                                    {slideData.catalogue_name_ln_deux}{" "}
                                </p>
                                <p>
                                    du {slideData.catalogue_date_validite_debut} au{" "}
                                    {slideData.catalogue_date_validite_fin}
                                </p>
                            </div>
                        </div>
                        <div className="view-format-dialog-right-part">
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
                    <div className="view-format-dialog-content">
                        <div className="view-format-dialog-desktop-content container">
                            <div className="view-format-dialog-desktop-left-part">
                                <span className="view-format-dialog-side-image">
                                    <img
                                        src={slideData.slide_image}
                                        alt=" {slideData.catalogue_name_ln_un} {slideData.catalogue_name_ln_deux} "
                                    />
                                </span>
                            </div>
                            <div className="view-format-dialog-desktop-right-part">
                                <div className="view-format-icon-container">
                                    <img
                                        className="view-format-icon"
                                        src="https://preprod-appli-server.vivetic.com/web_si/front-ecatalogue-v2/assets/icons/desktop-view-format-icon.svg"
                                        alt=""
                                    />
                                    <h2
                                        style={{ color: slideData.client_color }}
                                        className="view-format-text"
                                    >
                                        Nouveau ! choisissez votre mode de lecture... Version
                                        simplifiée par produit et créez ainsi directement vos listes
                                        de courses, ou continuer en version feuilletable.
                                    </h2>
                                </div>
                                <div className="view-format-dialog-button-container">
                                    <button
                                        className="view-format-dialog-button btn"
                                        style={{ backgroundColor: slideData.client_color }}
                                        onClick={handleProductView}
                                    >
                                        <span className="view-format-dialog-button-text">
                                            Vue produit
                                        </span>
                                        <span className="view-format-dialog-button-icon">
                                            <img
                                                src="https://preprod-appli-server.vivetic.com/web_si/front-ecatalogue-v2/assets/icons/by-product-icon.svg"
                                                alt=""
                                            />
                                        </span>
                                    </button>
                                    <button
                                        className="view-format-dialog-button btn"
                                        style={{ backgroundColor: slideData.client_color }}
                                        onClick={handleCatalogView}
                                    >
                                        <span className="view-format-dialog-button-text">
                                            Vue feuilletable
                                        </span>
                                        <span className="view-format-dialog-button-icon">
                                            <img
                                                src="https://preprod-appli-server.vivetic.com/web_si/front-ecatalogue-v2/assets/icons/by-catalog-icon.svg"
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
                                    src="https://preprod-appli-server.vivetic.com/web_si/front-ecatalogue-v2/assets/icons/view-format-icon.svg"
                                    alt=""
                                />
                                <h2 className="view-format-text">
                                    Choisissez votre mode de lecture
                                </h2>
                            </div>
                            <div className="view-format-dialog-button-container">
                                <button
                                    style={{ backgroundColor: slideData.client_color }}
                                    className="view-format-dialog-button"
                                    onClick={handleProductView}
                                >
                                    <span
                                        className="view-format-dialog-button-text"
                                        style={{ cursor: "pointer" }}
                                    >
                                        Vue produit
                                    </span>
                                    <span className="view-format-dialog-button-icon">
                                        <img
                                            src="https://preprod-appli-server.vivetic.com/web_si/front-ecatalogue-v2/assets/icons/by-product-icon.svg"
                                            alt=""
                                        />
                                    </span>
                                </button>
                                <button
                                    style={{ backgroundColor: slideData.client_color }}
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
                                            src="https://preprod-appli-server.vivetic.com/web_si/front-ecatalogue-v2/assets/icons/by-catalog-icon.svg"
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
