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
import ListCourse  from '../components/shoppingList/shoppingListIcon';
import ShoppingListModal from "../components/shoppingList/shoppingListModal";
import crossIconDark from "../assets/icons/cross-icon-dark.svg";
import SearchBar from "../components/search_bar/search_global_bar"

function Product() {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const { catalogId, categoryId } = useParams();
    const [headerData, setHeaderData] = useState(null);
    const [productData, setProductData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 767);
    const headerHeight = document.querySelector('.sticky'); // class "sticky" height
    const [wrapperHeight, setWrapperHeight] = useState(window.innerHeight - headerHeight);
    const navigate = useNavigate();
    const { categoryList } = CategoryPerCatalogue(catalogId);
    const [viewChoice, setViewChoice] = useState({
        isVueProduit : true,
        isVueFeuilletable : true
    });
    const { shoppingList } = useContext(ShoppingListContext);

    const handleClose = () => {
        navigate(`/`);
        window.location.reload();
    };

    const handleCatalogView = () => {
        navigate(`/catalogue/${catalogId}`);
    };

    // for searching
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoadSearch, setIsLoadSearch] = useState(false);

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
        if (headerData && categoryList && searchQuery) {
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
    }, [headerData, categoryId, categoryList, searchQuery]);


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
        setIsLoadSearch(true);
    };
    const handleSearchResults = (results) => {
        setSearchResults(results);
        setIsLoadSearch(false); // <-- Stop loader after results arrive
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
                                    src={isMobileView ? headerData.client_logo_mobile : headerData.client_logo_desktop }
                                    alt=""
                                />
                                <div className="header-text">
                                    <p className="catalogue-name" style={{ color: headerData ? headerData.client_color : "#fff" }} >
                                        {headerData.catalogue_name_ln_un}{" "}
                                        {headerData.catalogue_name_ln_deux}
                                    </p>
                                    <p className="catalogue-date"style={{ color: "black" }}>
                                        du {headerData.catalogue_date_validite_debut} au{" "}
                                        {headerData.catalogue_date_validite_fin}
                                    </p>
                                </div>
                            </div>
                            <div className="view-format-dialog-right-part">

                            <SearchBar  onResults={handleSearchResults}  catalogue_id={catalogId} onQueryChange={handleQueryChange} />

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
                                            <svg xmlns="http://www.w3.org/2000/svg" width="51" height="30" fill="none"><g stroke={headerData ? headerData.client_color : "#fff"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.401" clipPath="url(#a)">
                                                <path d="M5.356 21.495h12.382c5.8 0 7.09 5.796 7.09 5.796V6.496S23.538.701 17.738.701H5.356v20.794ZM44.724 21.495H31.956c-5.8 0-7.09 5.796-7.09 5.796V6.496s1.29-5.795 7.09-5.795h12.768v20.794Z" />
                                                <path d="M24.866 28.096h-.038s-1.29-4.569-7.09-4.569H2.94V2.694" />
                                                <path d="M24.866 29.3h-.038s-1.29-3.548-7.09-3.548H.701V4.854M24.942 28.096h.038s1.289-4.569 7.09-4.569h15.013V2.694" />
                                                <path d="M24.942 29.3h.038s1.289-3.548 7.09-3.548h17.25V4.854" /></g><defs><clipPath id="a">
                                                    <path fill="#fff" d="M0 0h50.021v30H0z" /></clipPath></defs>
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
                                            <ListCourse catalogId ={catalogId} shoppingList={shoppingList} clientColor = {headerData ? headerData.client_color : "#669999"}/>
                                        </button>
                                    )
                                    :(<></>)
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
                        {productData.length > 0 && !searchQuery ? (
                            <CategoryMenu categoryIdSelected={categoryId} categoryList={categoryList} />)
                            :
                            (<></>)
                        }
                    </div>
                    <div className="wrapper"
                        style={{
                            height: `${wrapperHeight}px`,
                            overflowY: 'scroll'
                        }}
                    >
                        <div className="product-list-container" >
                            {searchQuery ?
                                // si on cherhce qlq chose
                                (
                                    <div className="product-list-container">
                                        {isLoadSearch ? (
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
                                                        API_BASE_URL={API_BASE_URL}
                                                    />
                                                ))}
                                            </div>
                                        ) : (
                                            <p>No result</p>
                                        )}
                                    </div>
                                ) :
                                // si on consulte par categorie
                                (
                                    isLoading === false && productData.length > 0 ?
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
                                                        API_BASE_URL={API_BASE_URL} />
                                                ) : null
                                            ))}
                                        </div>
                                    ) : (
                                        <LoadingSpinner />
                                    )
                                )
                            }
                        </div>
                        {modalOpen && ( <ShoppingListModal catalogId ={catalogId} isOpen={modalOpen} onClose={() => setModalOpen(false)} clientColor = {headerData.client_color} /> )}
                    </div>
                </div>
            ) : (
                <LoadingSpinner />
            )}
        </>
    );
}

export default Product;
