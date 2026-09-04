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
import SearchBar from "../components/search_bar/search_global_bar";
import ProductSearchResults from "../components/search_bar/ProductSearchResults";
import CatalogHeaderInfo from "../components/CatalogHeaderInfo";
import useHeightBelow from "../components/functions/useHeightBelow";
import { useSearch } from '../components/search_bar/SearchContext';

function MainProduct() {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const { catalogId, productId, categoryId, id_produit_resume } = useParams();
    const headerData = useCatalogHeader(catalogId);
    const [productData, setProductData] = useState(null);
    const isMobileView = useIsMobile();
    const navigate = useNavigate();
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
        disableEcatalogueAutoScroll();
    }, []);

    useEffect(() => {
        showOnlyEcatalogue();
    }, []);

    const [modalOpen, setModalOpen] = useState(false);
    const { searchQuery, setSearchQuery, searchResults, setSearchResults, clearSearch, loading, setLoading } = useSearch();

    const wrapperHeight = useHeightBelow('.header', { enabled: !!headerData, delay: 500 });
    const wrapperHeightSearch = useHeightBelow('.sticky', { enabled: !!(searchQuery || searchResults), delay: 1000 });

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
                            <CatalogHeaderInfo headerData={headerData} isMobileView={isMobileView} />
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
                                        <path fill="#414141" fillRule="evenodd" d="m16.334 10.999-6.562 6.55 1.416 1.414 8.27-8.258.709-.706-.708-.707-8.271-8.257-1.416 1.413 6.562 6.551H0v2h16.334Z" clipRule="evenodd" /></svg>
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
                                    <ProductSearchResults
                                        loading={loading}
                                        results={searchResults}
                                        catalogId={catalogId}
                                        clientColor={headerData.client_color}
                                    />
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
                                                                <path d="M13.25 26.5C20.5681 26.5 26.5 20.5681 26.5 13.25C26.5 5.93187 20.5681 0 13.25 0C5.93187 0 0 5.93187 0 13.25C0 20.5681 5.93187 26.5 13.25 26.5Z" fill={headerData.client_color ? headerData.client_color : "#164194"} fillOpacity="0.1" />
                                                                <path d="M18.9991 15.3348C17.9245 16.5168 16.7102 17.5807 15.5389 18.6231C14.8941 19.1926 14.2816 19.7299 13.6905 20.2887C13.5723 20.4069 13.4111 20.4607 13.2499 20.4607C13.0887 20.4607 12.9383 20.4069 12.8093 20.2887C12.2183 19.7299 11.6058 19.1926 10.961 18.6231C9.78967 17.5915 8.57536 16.5168 7.50074 15.3348C6.67329 14.5288 6.14673 13.3467 6.14673 12.3151C6.14673 11.2835 6.55508 10.2303 7.30731 9.47811C8.05954 8.71514 9.37057 8.11335 10.7138 8.60768C12.1431 9.14498 12.7664 10.4453 13.2499 11.5736C13.7765 10.3271 14.8511 8.85484 16.3341 8.60768C17.4839 8.42499 18.4296 8.71514 19.1818 9.47811C19.934 10.2303 20.3424 11.2405 20.3424 12.3151C20.3424 13.3897 19.8051 14.5288 18.9884 15.3348H18.9991Z" fill={headerData.client_color ? headerData.client_color : "#164194"} stroke={headerData.client_color ? headerData.client_color : "#164194"} strokeWidth="0.75" strokeLinejoin="round" />
                                                            </svg>
                                                        ) : (
                                                            <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M13.25 26.5C20.5681 26.5 26.5 20.5681 26.5 13.25C26.5 5.93187 20.5681 0 13.25 0C5.93187 0 0 5.93187 0 13.25C0 20.5681 5.93187 26.5 13.25 26.5Z" fill="white" />
                                                                <path d="M13.25 26.5C20.5681 26.5 26.5 20.5681 26.5 13.25C26.5 5.93187 20.5681 0 13.25 0C5.93187 0 0 5.93187 0 13.25C0 20.5681 5.93187 26.5 13.25 26.5Z" fill={headerData.client_color ? headerData.client_color : "#164194"} fillOpacity="0.1" />
                                                                <path d="M18.9991 15.3348C17.9245 16.5168 16.7102 17.5807 15.5389 18.6231C14.8941 19.1926 14.2816 19.7299 13.6905 20.2887C13.5723 20.4069 13.4111 20.4607 13.2499 20.4607C13.0887 20.4607 12.9383 20.4069 12.8093 20.2887C12.2183 19.7299 11.6058 19.1926 10.961 18.6231C9.78967 17.5915 8.57536 16.5168 7.50074 15.3348C6.67329 14.5288 6.14673 13.3467 6.14673 12.3151C6.14673 11.2835 6.55508 10.2303 7.30731 9.47811C8.05954 8.71514 9.37057 8.11335 10.7138 8.60768C12.1431 9.14498 12.7664 10.4453 13.2499 11.5736C13.7765 10.3271 14.8511 8.85484 16.3341 8.60768C17.4839 8.42499 18.4296 8.71514 19.1818 9.47811C19.934 10.2303 20.3424 11.2405 20.3424 12.3151C20.3424 13.3897 19.8051 14.5288 18.9884 15.3348H18.9991Z" stroke={headerData.client_color ? headerData.client_color : "#164194"} strokeWidth="1.2" strokeLinejoin="round" />
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
