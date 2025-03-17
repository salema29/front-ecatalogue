import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoadingSpinner from '../components/spinner/LoadingSpinner'
import '../assets/styles/ProductDetail.css';
import disableEcatalogueAutoScroll from "../components/functions/DisableScroll";
import showOnlyEcatalogue from "../components/functions/ShowOnlyEcatalogue";
import addListICon from '../assets/icons/add-list.svg';
import addListIConOk from '../assets/icons/add-list-ok.svg';
import { ShoppingListContext } from '../store-shopping-list';
import ListCourse  from '../components/buttons/ListCourseIcon';
import ShoppingListModal from "../components/buttons/ListCourseModal"

function MainProduct() {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const ASSET_BASE_URL = process.env.REACT_APP_API_ASSET_URL;
    const { catalogId, productId, categoryId, id_produit_resume } = useParams();
    const [headerData, setHeaderData] = useState(null);
    const [productData, setProductData] = useState(null);
    const isMobileView = window.innerWidth <= 767;
    const navigate = useNavigate();
    const heightToMinus = 0;
    const headerHeight = 20; // class "header" height
    const [wrapperHeight, setWrapperHeight] = useState(window.innerHeight - headerHeight);
    const [isLoading, setIsLoading] = useState(true);
    const { shoppingList, setShoppingList } = useContext(ShoppingListContext);
    const isAddedInList = shoppingList.some(
        (catalog) =>
            catalog.catalogId === catalogId &&
            catalog.products.some(
                (item) => item.productId === productId && item.categoryId === categoryId
            )
    );

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
        fetch(`${API_BASE_URL}/api/getProductDetailV2/${categoryId}/${productId}`)
            .then((response) => response.json())
            .then((fetchedData) => setProductData(fetchedData))
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [productId, API_BASE_URL, categoryId]);

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

    useEffect(() => {
        localStorage.setItem('shopping-list', JSON.stringify(shoppingList));
    }, [shoppingList]);
    const addInList = (productId, categoryId, catalogId, id_produit_resume) => {
        setShoppingList((prevList) => {
            const catalogIndex = prevList.findIndex((item) => item.catalogId === catalogId);
            if (catalogIndex !== -1) {
                const updatedCatalog = {
                    ...prevList[catalogIndex],
                    products: [
                        ...prevList[catalogIndex].products,
                        { productId, categoryId, count: 1, id_produit_resume },
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
                        products: [{ productId, categoryId, count: 1, id_produit_resume }],
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

    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            {headerData ? (
                <>
                    <header className="header">
                        <div className="view-format-dialog-left-part">
                            <img
                                className="header-logo"
                                src={isMobileView ? headerData.client_logo_mobile : headerData.client_logo_desktop}
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
                        {headerData.show_list_course === 't' ?
                            (
                                <button
                                    className="view-format-dialog-open-list-course btn"
                                    onClick={() => setModalOpen(true)}
                                    title="Ouvrir ma liste de course"
                                >
                                    <ListCourse catalogId ={catalogId} shoppingList={shoppingList} clientColor = {headerData ? headerData.client_color : "#669999"}/>
                                </button>
                            )
                            :(<></>)
                        }
                            <button
                                className="view-format-dialog-close btn"
                                onClick={handleClose}
                                title="Fermer"
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
                                    {(isLoading === false && headerData.show_list_course === "t") && (
                                        <button
                                            className="add-bouton-detail"
                                            style={{ backgroundColor: headerData.client_color }}
                                            onClick={() => isAddedInList ? removeInList(productId, categoryId, catalogId) : addInList(productId, categoryId, catalogId, id_produit_resume)}
                                        >
                                            <span className="add-bouton-detail-text">
                                                Ajouter à ma liste
                                            </span>
                                            <span className="add-bouton-detail-icon">
                                                {isAddedInList ? (
                                                    <img
                                                        src={addListIConOk}
                                                        alt="add-to-basket"
                                                    />
                                                ) : (
                                                    <img
                                                        src={addListICon}
                                                        alt="add-to-basket"
                                                    />
                                                )}
                                            </span>
                                        </button>
                                    )}
                                    <ShoppingListModal catalogId ={catalogId} isOpen={modalOpen} onClose={() => setModalOpen(false)} clientColor = {headerData ? headerData.client_color : "#669999"} shoppingList = {shoppingList} />
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