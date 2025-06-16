import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CategoryMenu from "../components/navigation/CategoryMenu";
import LoadingSpinner from '../components/spinner/LoadingSpinner';
import disableEcatalogueAutoScroll from "../components/functions/DisableScroll";
import "../assets/styles/ProductList.css";
import showOnlyEcatalogue from "../components/functions/ShowOnlyEcatalogue";
import ProductItem from "../components/ProductItem";
import CategoryPerCatalogue from "../components/navigation/CategoryPerCatalogue";
import { fetchViewChoice } from "../components/functions/Api";
import { ShoppingListContext } from '../store-shopping-list';
import ListCourse from '../components/shoppingList/shoppingListIcon';
import ShoppingListModal from "../components/shoppingList/shoppingListModal";
import crossIconDark from "../assets/icons/cross-icon-dark.svg";
import SearchBar from "../components/search_bar/search_global_bar";
import { useSearch } from '../components/search_bar/SearchContext';


function Product() {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const { catalogId, categoryId } = useParams();
    const [headerData, setHeaderData] = useState(null);
    const [productData, setProductData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 767);
    const headerHeight = document.querySelector('.sticky'); // class "sticky" height
    const [wrapperHeight, setWrapperHeight] = useState(window.innerHeight - headerHeight);
    const [wrapperHeightSearch, setWrapperHeightSearch] = useState(window.innerHeight - headerHeight);
    const navigate = useNavigate();
    const { categoryList } = CategoryPerCatalogue(catalogId);
    const [viewChoice, setViewChoice] = useState({
        isVueProduit: true,
        isVueFeuilletable: true
    });
    const { shoppingList } = useContext(ShoppingListContext);

    const handleClose = () => {
        navigate(`/`);
        window.location.reload();
    };

    const handleCatalogView = () => {
        navigate(`/catalogue/${catalogId}`);
    };
    const { searchQuery, setSearchQuery, searchResults, setSearchResults, clearSearch, loading, setLoading } = useSearch();

    // Gerer le media query pour la mise en page responsive du grille desktop/moble
    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth <= 1024);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [API_BASE_URL]);

    useEffect(() => {
        const fetchHeaderData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(
                    `${API_BASE_URL}/api/getOneSlide/${catalogId}`
                );
                if (!response.ok) {
                    setIsLoading(false);
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                if (data && Object.keys(data).length > 0) {
                    setHeaderData(data);
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 1000);
                } else {
                    console.warn("Empty or invalid slide data received");
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("Error fetching slide data: ", error);
                setIsLoading(false);
            }
        };

        fetchHeaderData();
    }, [catalogId, API_BASE_URL]);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await fetch(
                    `${API_BASE_URL}/api/getProducts/${categoryId}/${catalogId}`
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
    }, [categoryId, API_BASE_URL, catalogId]);

    useEffect(() => {
        if (headerData && categoryList) {
            const updateHeight = () => {
                const stickyElement = document.querySelector('.sticky');
                const stickyHeight = stickyElement ? stickyElement.getBoundingClientRect().height : 0;

                const height = window.innerHeight - stickyHeight;
                setWrapperHeight(height);
            };

            setTimeout(updateHeight, 1000); // Assurez-vous que le DOM est à jour.
            window.addEventListener('resize', updateHeight);

            return () => {
                window.removeEventListener('resize', updateHeight);
            };
        }
    }, [headerData, categoryId, categoryList]);


    useEffect(() => {
        const wrapper = document.querySelector('.wrapper');
        if (wrapper) {
            wrapper.scrollTop = 0; // Réinitialise le scroll de l'élément wrapper
        }
    }, [categoryId]);

    useEffect(() => {
        disableEcatalogueAutoScroll();
    }, []);

    useEffect(() => {
        async function fetchChoiceForView() {
            const choice = await fetchViewChoice(catalogId);
            setViewChoice(choice);
        }
        fetchChoiceForView();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    showOnlyEcatalogue();

    const [modalOpen, setModalOpen] = useState(false);

    const handleQueryChange = (value) => {
        setSearchQuery(value);
        setLoading(false);
    };
    const handleSearchResults = (results) => {
        setSearchResults(results);
        setLoading(false);
    };

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

    const returnToCategory = () => {
        clearSearch();
    };

    return (
        <>
            {headerData ? (
                <div className="wrapper_one">
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
                                    <p className="catalogue-date" style={{ color: "black" }}>
                                        du {headerData.catalogue_date_validite_debut} au{" "}
                                        {headerData.catalogue_date_validite_fin}
                                    </p>
                                </div>
                            </div>
                            <div className="view-format-dialog-right-part">
                                {!isMobileView && productData.length > 0 ? (<SearchBar onResults={handleSearchResults} catalogue_id={catalogId} onQueryChange={handleQueryChange} />) : (<></>)}

                                {viewChoice.isVueFeuilletable && (
                                    <button
                                        className="view-format-switcher btn"
                                        onClick={handleCatalogView}
                                        title="Voir la vue feuilletable"
                                    >
                                        <span style={{
                                            height: "25",
                                            width: "auto"
                                        }}>
                                            <svg width="33" height="29" viewBox="0 0 46 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M3.73762 7.2074C2.91199 7.54057 1 8.4787 1 8.4787V38.6393C1 38.6393 12.7153 33.9399 23.04 40.0948" stroke={headerData.client_color ? headerData.client_color : "#164194"} stroke-width="1.48571" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M23.04 9.94298C16.9477 5.12079 11.5159 6.78663 6.91846 1V31.1694C11.5159 36.956 16.9477 35.2814 23.04 40.1036" stroke={headerData.client_color ? headerData.client_color : "#164194"} stroke-width="1.48571" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M23.04 9.94319C34.0601 2.50825 45.0801 8.48777 45.0801 8.48777V38.6484C45.0801 38.6484 33.3648 33.9577 23.04 40.1038" stroke={headerData.client_color ? headerData.client_color : "#164194"} stroke-width="1.48571" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M23.04 9.94293V40.1036" stroke={headerData.client_color ? headerData.client_color : "#164194"} stroke-width="1.48571" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>

                                        </span>
                                    </button>
                                )}
                                {headerData.show_list_course === 't' ?
                                    (
                                        <button
                                            className="view-format-dialog-open-list-course btn"
                                            onClick={() => setModalOpen(true)}
                                            title="Ouvrir ma liste de course"
                                        >
                                            <ListCourse catalogId={catalogId} shoppingList={shoppingList} clientColor={headerData ? headerData.client_color : "#669999"} />
                                        </button>
                                    )
                                    : (<></>)
                                }
                                <button
                                    className="view-format-dialog-close btn"
                                    onClick={handleClose}
                                    title="Fermer ce catalogue"
                                >
                                    <img
                                        src={crossIconDark}
                                        width="25"
                                        alt="Fermer"
                                    />
                                </button>
                            </div>
                        </header>
                        {productData.length > 0 && (
                            <div style={{ backgroundColor: "white" }}>
                                {isMobileView && (<SearchBar onResults={handleSearchResults} catalogue_id={catalogId} onQueryChange={handleQueryChange} />)}
                                {!searchQuery ? (
                                    <CategoryMenu categoryIdSelected={categoryId} categoryList={categoryList} />)
                                    :
                                    (
                                        <button className="search-return btn" title="Retour" onClick={returnToCategory}>
                                            <svg className="search-return-icon" xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" style={{ transform: "rotate(180deg)" }}>
                                                <path fill="#414141" fill-rule="evenodd" d="m16.334 10.999-6.562 6.55 1.416 1.414 8.27-8.258.709-.706-.708-.707-8.271-8.257-1.416 1.413 6.562 6.551H0v2h16.334Z" clip-rule="evenodd" /></svg>
                                            <span>Retour </span>
                                        </button>
                                    )
                                }
                            </div>
                        )}
                    </div>
                    <div className="wrapper"
                        style={{
                            height: searchQuery ? `${wrapperHeightSearch}px` : `${wrapperHeight}px`,
                            overflowY: 'scroll'
                        }}
                    >
                        {searchQuery ?
                            // si on cherhce qlq chose
                            (
                                <div className="product-list-container">
                                    {loading ?
                                        (
                                            <LoadingSpinner />
                                        ) : searchResults.length > 0 ? (
                                            <div className="grid-container">
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
                            ) :
                            // si on consulte par categorie
                            (
                                <div className="product-list-container">
                                    {isLoading ? (
                                        <LoadingSpinner />
                                    ) : (
                                        productData.length > 0 ?
                                            (
                                                <div className="grid-container">
                                                    {productData.map((product, index) => (
                                                        product.view_type === '1' ? (
                                                            <ProductItem
                                                                key={index}
                                                                product={product}
                                                                index={index}
                                                                categoryId={categoryId}
                                                                catalogId={catalogId}
                                                                showListCourse={headerData.show_list_course}
                                                                clientColor={headerData.client_color}
                                                            />
                                                        ) : null
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="empty-search-result" >
                                                    <p style={{ color: headerData.client_color }}>
                                                        Aucun produit disponible
                                                    </p>
                                                </div>
                                            )
                                    )
                                    }
                                </div>
                            )
                        }
                        {/* </div> */}
                        {modalOpen && (<ShoppingListModal catalogId={catalogId} isOpen={modalOpen} onClose={() => setModalOpen(false)} clientColor={headerData.client_color} />)}
                    </div>
                </div>
            ) : (
                <LoadingSpinner />
            )}
        </>
    );
}

export default Product;
