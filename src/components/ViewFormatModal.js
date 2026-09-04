import React, { useEffect, useState, useContext } from "react";
import "../assets/styles/ViewFormatDialog.css";
import { useParams, useNavigate } from "react-router-dom";
import useCategoriesPerCatalogue from "../components/navigation/useCategoriesPerCatalogue";
import LoadingSpinner from '../components/spinner/LoadingSpinner';
import handleOrientationChange from "./functions/Orientation";
import showOnlyEcatalogue from "./functions/ShowOnlyEcatalogue";
import MiniSpinner from "./spinner/MiniSpinner";
import crossIconDark from "../assets/icons/cross-icon-dark.svg";
import desktopFormatIconDark from "../assets/icons/desktop-view-format-icon-dark.svg";
import byProductIcon from "../assets/icons/by-product-icon.svg";
import byCatalogIcon from "../assets/icons/by-catalog-icon.svg";
import viewFormatIconDark from "../assets/icons/view-format-icon-dark.svg";
import ShopModal from "./shop/shopModal";
import { fetchDefinitionMagasinChoice, fetchShopListByClient } from "./functions/Api";
import useCatalogHeader from "./functions/useCatalogHeader";
import useIsMobile from "./functions/useIsMobile";
import { ShoppingListContext } from "../store-shopping-list";
import { getShopByCatalogId } from "./functions/Shop";

// Les deux boutons "Vue mosaique / Vue feuilletable" (identiques entre le
// bloc desktop et le bloc mobile de la modale).
const ViewModeButtons = ({ clientColor, firstCategorieId, onProductView, onCatalogView }) => (
    <div className="view-format-dialog-button-container">
        <button
            className="view-format-dialog-button btn"
            style={{ backgroundColor: clientColor }}
            onClick={firstCategorieId ? onProductView : () => { }}
        >
            <span className="view-format-dialog-button-text">Vue mosaïque</span>
            {firstCategorieId ? (
                <span className="view-format-dialog-button-icon choice">
                    <img style={{ width: "100%", height: "100%" }} src={byProductIcon} alt="" />
                </span>
            ) : (
                <span className="view-format-dialog-button-icon">
                    <MiniSpinner />
                </span>
            )}
        </button>
        <button
            className="view-format-dialog-button btn"
            style={{ backgroundColor: clientColor }}
            onClick={onCatalogView}
        >
            <span className="view-format-dialog-button-text">Vue feuilletable</span>
            <span className="view-format-dialog-button-icon choice">
                <img style={{ width: "100%", height: "100%" }} src={byCatalogIcon} alt="" />
            </span>
        </button>
    </div>
);

function ViewFormatDialog() {
    const isMobileView = useIsMobile();
    const { catalogId, clientId } = useParams();
    const headerData = useCatalogHeader(catalogId);
    const [shopModalOpen, setShopModalOpen] = useState(false);
    const [definitionMagasinChoice, setDefinitionMagasinChoice] = useState(null);
    const [shopList, setShopList] = useState(null);
    const [currentShop, setCurrentShop] = useState(null);
    const shoppingListContext = useContext(ShoppingListContext);

    const navigate = useNavigate();

    useEffect(() => {
        setShopModalOpen(true);
    }, []);

    const handleClose = () => {
        navigate(`/`);
        window.location.reload();
    };

    useEffect(() => {
        handleOrientationChange();

        window.addEventListener("resize", handleOrientationChange);
        window.addEventListener("orientationchange", handleOrientationChange);

        return () => {
            window.removeEventListener("resize", handleOrientationChange);
            window.removeEventListener("orientationchange", handleOrientationChange);
        };
    }, []);

    useEffect(() => {
        async function fetchDefChoiceMagasin() {
            const defChoiceMagasin = await fetchDefinitionMagasinChoice(clientId);
            setDefinitionMagasinChoice(defChoiceMagasin);
        }
        fetchDefChoiceMagasin();
    }, [catalogId, clientId]);

    useEffect(() => {
        if (definitionMagasinChoice === 1) {
            async function fetchShopList() {
                const shops = await fetchShopListByClient(clientId);
                setShopList(shops);
            }
            fetchShopList();
        }
    }, [catalogId, clientId, definitionMagasinChoice]);

    useEffect(() => {
        if (shoppingListContext.shoppingList) {
            setCurrentShop(getShopByCatalogId(shoppingListContext.shoppingList, catalogId));
        }
    }, [shoppingListContext.shoppingList, catalogId]);

    useEffect(() => {
        if (currentShop) {
            setShopModalOpen(false);
        }
    }, [currentShop]);

    const { firstCategorieId } = useCategoriesPerCatalogue(catalogId);

    const handleProductView = () => {
        navigate(`/product-list/${catalogId}/${firstCategorieId}`);
    };

    const handleCatalogView = () => {
        navigate(`/catalogue/${catalogId}`);
    };

    useEffect(() => {
        showOnlyEcatalogue();
    }, []);

    return (
        <>
            {headerData ? (
                <>
                    {!(isMobileView && shopModalOpen) && (
                        <header className="header view-format-dialog-header">
                            <div className="view-format-dialog-left-part">
                                <img
                                    className="header-logo"
                                    src={isMobileView ? headerData.client_logo_mobile : headerData.client_logo_desktop}
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
                                        src={crossIconDark}
                                        alt="Fermer"
                                        width="25"
                                    />
                                </button>
                            </div>
                        </header>
                    )}
                    <div className="view-format-dialog-content">
                        <div className="view-format-dialog-desktop-content container">
                            <div className="view-format-dialog-desktop-right-part">
                                <div className="view-format-icon-container">
                                    <img
                                        className="view-format-icon"
                                        src={desktopFormatIconDark}
                                        alt=""
                                    />
                                    <h2
                                        style={{ color: headerData.client_color, marginBottom: 0 }}
                                        className="view-format-text"
                                    >
                                        <span style={{ fontWeight: 700 }}>Nouveau !</span> <br /> choisissez votre mode de lecture
                                    </h2>
                                    <p style={{ color: "black", textAlign: "center" }}>    Version <span className="text-gras" >simplifiée par produit</span> et créez ainsi directement vos listes
                                        de courses, <br /> ou continuer en <span className="text-gras" >version feuilletable.</span>
                                    </p>
                                </div>
                                <ViewModeButtons
                                    clientColor={headerData.client_color}
                                    firstCategorieId={firstCategorieId}
                                    onProductView={handleProductView}
                                    onCatalogView={handleCatalogView}
                                />
                            </div>
                        </div>
                        <div className="view-format-dialog-mobile-content container">
                            <div className="view-format-icon-container">
                                <img
                                    className="view-format-icon"
                                    src={viewFormatIconDark}
                                    alt=""
                                />
                                <h2 className="view-format-text" style={{ color: headerData.client_color, fontWeight: 500 }}>
                                    Choisissez <br/> votre mode de lecture
                                </h2>
                            </div>
                            <ViewModeButtons
                                clientColor={headerData.client_color}
                                firstCategorieId={firstCategorieId}
                                onProductView={handleProductView}
                                onCatalogView={handleCatalogView}
                            />
                        </div>
                    </div>
                </>
            ) : (
                <LoadingSpinner />
            )}
            {(shopModalOpen && definitionMagasinChoice === 1 && shopList && !currentShop) &&
                (<ShopModal
                    catalogId={catalogId}
                    isOpen={shopModalOpen}
                    onClose={() => setShopModalOpen(false)}
                    clientColor={headerData.client_color}
                    shopList={shopList}
                />)}
        </>
    );
}

export default ViewFormatDialog;
