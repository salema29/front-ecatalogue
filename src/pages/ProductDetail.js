import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoadingSpinner from '../components/spinner/LoadingSpinner';
import '../assets/styles/ProductDetail.css';
import disableEcatalogueAutoScroll from "../components/functions/DisableScroll";
import showOnlyEcatalogue from "../components/functions/ShowOnlyEcatalogue";
import { ShoppingListContext } from '../store-shopping-list';
import ListCourse from '../components/shoppingList/shoppingListIcon';
import ShoppingListModal from "../components/shoppingList/shoppingListModal";
import crossIconDark from "../assets/icons/cross-icon-dark.svg";
import VueDetailArrow from "../components/arrow/VueDetailArrow";
import { fetchPrevNextVueDetail } from "../components/functions/Api";
import useCatalogHeader from "../components/functions/useCatalogHeader";
import useIsMobile from "../components/functions/useIsMobile";
import ProductItem from "../components/ProductItem";
import SearchBar from "../components/search_bar/search_global_bar";
import { useSearch } from '../components/search_bar/SearchContext';

function MainProduct() {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const { catalogId, productId, categoryId, id_produit_resume } = useParams();
    const headerData = useCatalogHeader(catalogId);
    const [productData, setProductData] = useState(null);
    const isMobileView = useIsMobile();
    const navigate = useNavigate();
    const headerHeight = 20; // class "header" height
    const [wrapperHeight, setWrapperHeight] = useState(window.innerHeight - headerHeight);
    const [wrapperHeightSearch, setWrapperHeightSearch] = useState(window.innerHeight);
    const [isLoading, setIsLoading] = useState(true);
    const { shoppingList, addProduct, removeProduct } = useContext(ShoppingListContext);

    const isAddedInList = shoppingList.some(
        (catalog) =>
            catalog.catalogId === catalogId &&
            catalog.products.some(
                (item) => item.productId === productId && item.categoryId === categoryId
            )
    );
    const [prevNextVueDetail, setPrevNextVueDetail] = useState(null);

    const handleClose = () => {
        navigate(`/product-list/${catalogId}/${categoryId}`);
    };

    useEffect(() => {
        if (!API_BASE_URL || !categoryId || !productId) return;

        const fetchData = async () => {
            try {
                setProductData([])
                const response = await fetch(`${API_BASE_URL}/api/getProductDetailV2/${categoryId}/${productId}`);
                const fetchedData = await response.json();
                setProductData(fetchedData);

                if (fetchedData?.html.product_id) {
                    const prevNextData = await fetchPrevNextVueDetail(fetchedData.html.product_id);
                    setPrevNextVueDetail(prevNextData);
                }
            } catch (error) {
                console.error("Error fetching product detail:", error);
            }
        };

        fetchData();
    }, [productId, API_BASE_URL, categoryId]);

    useEffect(() => {
        if (headerData) {
            const updateHeight = () => {
                const stickyElement = document.querySelector('.header');
                const stickyHeight = stickyElement ? stickyElement.getBoundingClientRect().height : 0;
                const height = window.innerHeight - stickyHeight;
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

    useEffect(() => {
        showOnlyEcatalogue();
    }, []);

    const [modalOpen, setModalOpen] = useState(false);
    const { searchQuery, setSearchQuery, searchResults, setSearchResults, clearSearch, loading, setLoading } = useSearch();
    useEffect(() => {
        if (searchQuery || searchResults) {
            const updateHeightResultatSearch = () => {
                const stickyElement = document.querySelector('.sticky');
                const stickyHeight = stickyElement ? stickyElement.getBoundingClientRect().height : 0;
                const height = window.innerHeight - stickyHeight;
                setWrapperHeightSearch(height);
            };
            setTimeout(updateHeightResultatSearch, 1000); // Assurez-vous que le DOM est à jour.
            window.addEventListener('resize', updateHeightResultatSearch);
            return () => {
                window.removeEventListener('resize', updateHeightResultatSearch);
            };
        }
    }, [searchQuery, searchResults]);
    useEffect(() => {
        clearSearch();
        setProductData([]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleQueryChange = (value) => {
        setSearchQuery(value);
        setLoading(false);
    };
    const handleSearchResults = (results) => {
        setSearchResults(results);
        setLoading(false);
    };

    const returnToCategory = () => {
        clearSearch();
    };

    return (
        <>
            {headerData ? (
                <div className="wrapper-one">
                    <div className="sticky">
                        <header className="header">
                            <div className="view-format-dialog-left-part">
                                <img
                                    className="header-logo"
                                    src={isMobileView ? headerData.client_logo_mobile : headerData.client_logo_desktop}
                                    alt=""
                                />
                                <div className="header-text">
                                    <p className="catalogue-name" style={{ color: headerData ? headerData.client_color : "#fff" }}>
                                        {headerData.catalogue_name_ln_un} {headerData.catalogue_name_ln_deux}
                                    </p>
                                    <p style={{ color: "black" }}>
                                        du {headerData.catalogue_date_validite_debut} au {headerData.catalogue_date_validite_fin}
                                    </p>
                                </div>
                            </div>
                            <div className="view-format-dialog-right-part">
                                {!isMobileView && (<SearchBar onResults={handleSearchResults} catalogue_id={catalogId} onQueryChange={handleQueryChange} />)}

                                {headerData.show_list_course === 't' && (
                                    <button
                                        className="view-format-dialog-open-list-course btn"
                                        onClick={() => setModalOpen(true)}
                                        title="Ouvrir ma liste de courses"
                                    >
                                        <ListCourse catalogId={catalogId} shoppingList={shoppingList} clientColor={headerData ? headerData.client_color : "#669999"} />
                                    </button>
                                )}

                                <button
                                    className="view-format-dialog-close btn"
                                    onClick={handleClose}
                                    title="Fermer"
                                >
                                    <img
                                        src={crossIconDark}
                                        alt="Fermer"
                                        width="25"
                                    />
                                </button>
                            </div>
                        </header>
                        <div className="category-return" >
                            {isMobileView && (
                                <SearchBar onResults={handleSearchResults} catalogue_id={catalogId} onQueryChange={handleQueryChange} />
                            )}

                            {searchQuery && (
                                <button className="search-return btn" title="Retour" onClick={returnToCategory}>
                                    <svg className="search-return-icon" xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" style={{ transform: "rotate(180deg)" }}>
                                        <path fill="#414141" fill-rule="evenodd" d="m16.334 10.999-6.562 6.55 1.416 1.414 8.27-8.258.709-.706-.708-.707-8.271-8.257-1.416 1.413 6.562 6.551H0v2h16.334Z" clip-rule="evenodd" /></svg>
                                    <span>Retour </span>
                                </button>
                            )}
                        </div>
                    </div>
                    {modalOpen && (<ShoppingListModal catalogId={catalogId} isOpen={modalOpen} onClose={() => setModalOpen(false)} clientColor={headerData ? headerData.client_color : "#669999"} />)}
                    <div className="product-detail-container" style={{ marginBottom: '20px' }}>
                        {searchQuery ?
                            // searching
                            (
                                <div className="search-result-in-detail" style={{ height: `${wrapperHeightSearch}px`, overflowY: 'scroll' }}  >
                                    <div className="product-list-container" >
                                        {loading ?
                                            (
                                                <LoadingSpinner />
                                            ) : searchResults.length > 0 ? (<div className="grid-container" >
                                                {searchResults.map((product, index) => (
                                                    <ProductItem
                                                        key={product.id_produit || index}
                                                        product={product}
                                                        index={index}
                                                        categoryId={product.product_categorie_id}
                                                        catalogId={catalogId}
                                                        showListCourse="t"
                                                        clientColor={headerData.client_color}
                                                    />
                                                ))}
                                            </div>
                                            ) : (
                                                <div className="empty-search-result" >
                                                    <p style={{ color: headerData.client_color }}>
                                                        Aucun produit trouvé
                                                    </p>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            ) :
                            // displaying vue detaille
                            (
                                <div className="single-item-wrapper" style={{
                                    height: `${wrapperHeight}px`
                                }}
                                >
                                    {(productData && productData.html) ? (
                                        <>
                                            {!modalOpen && prevNextVueDetail && (
                                                <>
                                                    {prevNextVueDetail.previous && (
                                                        <VueDetailArrow
                                                            direction="previous"
                                                            catalogId={catalogId}
                                                            prevNextVueDetail={prevNextVueDetail}
                                                        />
                                                    )}
                                                    {prevNextVueDetail.next && (
                                                        <VueDetailArrow
                                                            direction="next"
                                                            catalogId={catalogId}
                                                            prevNextVueDetail={prevNextVueDetail}
                                                        />
                                                    )}
                                                </>
                                            )}

                                            <iframe
                                                src={productData.html.html_name}
                                                className="product-item-detail placeholder-content"
                                                title={productData.html.html_name}
                                                width="auto"
                                                onLoad={() => setIsLoading(false)}
                                            />

                                            {!isLoading && headerData.show_list_course === "t" && (
                                                <button
                                                    className="add-bouton-detail"
                                                    style={{ backgroundColor: headerData.client_color }}
                                                    onClick={() => isAddedInList ? removeProduct(productId, categoryId, catalogId) : addProduct(productId, categoryId, catalogId, id_produit_resume)}
                                                >
                                                    <span className="add-bouton-detail-text">
                                                        {isAddedInList ? 'Supprimer de ma liste' : 'Ajouter à ma liste'}
                                                    </span>
                                                    <span className="add-bouton-detail-icon">
                                                        {isAddedInList ? (
                                                            <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M13.25 26.5C20.5681 26.5 26.5 20.5681 26.5 13.25C26.5 5.93187 20.5681 0 13.25 0C5.93187 0 0 5.93187 0 13.25C0 20.5681 5.93187 26.5 13.25 26.5Z" fill="white" />
                                                                <path d="M13.25 26.5C20.5681 26.5 26.5 20.5681 26.5 13.25C26.5 5.93187 20.5681 0 13.25 0C5.93187 0 0 5.93187 0 13.25C0 20.5681 5.93187 26.5 13.25 26.5Z" fill={headerData.client_color ? headerData.client_color : "#164194"} fill-opacity="0.1" />
                                                                <path d="M18.9991 15.3348C17.9245 16.5168 16.7102 17.5807 15.5389 18.6231C14.8941 19.1926 14.2816 19.7299 13.6905 20.2887C13.5723 20.4069 13.4111 20.4607 13.2499 20.4607C13.0887 20.4607 12.9383 20.4069 12.8093 20.2887C12.2183 19.7299 11.6058 19.1926 10.961 18.6231C9.78967 17.5915 8.57536 16.5168 7.50074 15.3348C6.67329 14.5288 6.14673 13.3467 6.14673 12.3151C6.14673 11.2835 6.55508 10.2303 7.30731 9.47811C8.05954 8.71514 9.37057 8.11335 10.7138 8.60768C12.1431 9.14498 12.7664 10.4453 13.2499 11.5736C13.7765 10.3271 14.8511 8.85484 16.3341 8.60768C17.4839 8.42499 18.4296 8.71514 19.1818 9.47811C19.934 10.2303 20.3424 11.2405 20.3424 12.3151C20.3424 13.3897 19.8051 14.5288 18.9884 15.3348H18.9991Z" fill={headerData.client_color ? headerData.client_color : "#164194"} stroke={headerData.client_color ? headerData.client_color : "#164194"} stroke-width="0.75" stroke-linejoin="round" />
                                                            </svg>
                                                        ) : (
                                                            <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M13.25 26.5C20.5681 26.5 26.5 20.5681 26.5 13.25C26.5 5.93187 20.5681 0 13.25 0C5.93187 0 0 5.93187 0 13.25C0 20.5681 5.93187 26.5 13.25 26.5Z" fill="white" />
                                                                <path d="M13.25 26.5C20.5681 26.5 26.5 20.5681 26.5 13.25C26.5 5.93187 20.5681 0 13.25 0C5.93187 0 0 5.93187 0 13.25C0 20.5681 5.93187 26.5 13.25 26.5Z" fill={headerData.client_color ? headerData.client_color : "#164194"} fill-opacity="0.1" />
                                                                <path d="M18.9991 15.3348C17.9245 16.5168 16.7102 17.5807 15.5389 18.6231C14.8941 19.1926 14.2816 19.7299 13.6905 20.2887C13.5723 20.4069 13.4111 20.4607 13.2499 20.4607C13.0887 20.4607 12.9383 20.4069 12.8093 20.2887C12.2183 19.7299 11.6058 19.1926 10.961 18.6231C9.78967 17.5915 8.57536 16.5168 7.50074 15.3348C6.67329 14.5288 6.14673 13.3467 6.14673 12.3151C6.14673 11.2835 6.55508 10.2303 7.30731 9.47811C8.05954 8.71514 9.37057 8.11335 10.7138 8.60768C12.1431 9.14498 12.7664 10.4453 13.2499 11.5736C13.7765 10.3271 14.8511 8.85484 16.3341 8.60768C17.4839 8.42499 18.4296 8.71514 19.1818 9.47811C19.934 10.2303 20.3424 11.2405 20.3424 12.3151C20.3424 13.3897 19.8051 14.5288 18.9884 15.3348H18.9991Z" stroke={headerData.client_color ? headerData.client_color : "#164194"} stroke-width="1.2" stroke-linejoin="round" />
                                                            </svg>
                                                        )}
                                                    </span>
                                                </button>
                                            )}

                                        </>
                                    ) : (
                                        <LoadingSpinner />
                                    )}
                                </div>
                            )}
                    </div>
                </div>
            ) : (
                <LoadingSpinner />
            )}
        </>
    )
}

export default MainProduct;
