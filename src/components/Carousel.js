import React, { useEffect, useState, useRef, useContext, useMemo, useCallback } from "react";
import Flickity from "react-flickity-component";
import "../assets/styles/Carousel.css";
import "../assets/styles/Confidentiality.css";
import { useNavigate } from "react-router-dom";
import AbsCatalogue from "./AbsCatalogue";
import { fetchCategories, fetchDefinitionMagasinChoice, fetchShopById, fetchViewChoice } from "./functions/Api";
import { ClientContext } from "../store-client";
import { ShoppingListContext } from "../store-shopping-list";
import useIsMobile from "./functions/useIsMobile";
import { getClientId } from "./functions/clientId";

function Carousel() {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const [slidesData, setSlidesData] = useState([]);
    const [shopId, setShopId] = useState(null);
    const [clientId, setClientId] = useState(null);
    const isMobileView = useIsMobile();
    const [slideWidth, setSlideWidth] = useState(640);
    const [showPageDots, setShowPageDots] = useState(true);
    const [definitionMagasinChoice, setDefinitionMagasinChoice] = useState(null);
    const { setShoppingList } = useContext(ShoppingListContext);
    const sliderContainerRef = useRef(null);
    const clientContext = useContext(ClientContext);

    let environment_shop_id = process.env.REACT_APP_SHOP_ID_TEST ? process.env.REACT_APP_SHOP_ID_TEST : 0;

    if (window.dataLayer && window.dataLayer[0]?.cdl_environment_shop) {
        environment_shop_id = window.dataLayer[0].cdl_environment_shop;
    }

    const client = document.getElementById("catalogue-client");
    const navigate = useNavigate();
    const handleOpenText = () => {
        navigate(`/confidentiality`);
    };

    // Redirige vers la bonne vue selon les modes actives du catalogue.
    const handleSlideClick = useCallback(async (catalogueId) => {
        const viewChoice = await fetchViewChoice(catalogueId);
        // vue produit ET vue feuilletable
        if (viewChoice?.isVueProduit && viewChoice?.isVueFeuilletable) {
            navigate(`/view/${catalogueId}/${clientId}`);
        }
        // vue feuilletable seule
        else if (viewChoice?.isVueProduit === false && viewChoice?.isVueFeuilletable === true) {
            navigate(`/catalogue/${catalogueId}`);
        }
        // vue produit seule
        else if (viewChoice?.isVueProduit === true && viewChoice?.isVueFeuilletable === false) {
            const categories = await fetchCategories(catalogueId);
            navigate(`/product-list/${catalogueId}/${categories[0]?.categorie_id}`);
        } else {
            navigate(`/view/${catalogueId}`);
        }
    }, [clientId, navigate]);

    const flickityOptions = useMemo(() => ({
        initialIndex: 0,
        cellAlign: isMobileView
            ? "left"
            : slidesData.length < 3
                ? "center"
                : "left",
        contain: true,
        selectedAttraction: 0.03,
        friction: 0.3,
        groupCells: !isMobileView,
        pageDots: true,
        prevNextButtons: true,
    }), [isMobileView, slidesData.length]);

    useEffect(() => {
        const clientIdToUse = getClientId();
        setClientId(clientIdToUse);
        if (clientIdToUse) {
            clientContext.setStoredClient(clientIdToUse);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setShopId(environment_shop_id);
    }, [environment_shop_id]);

    useEffect(() => {
        updateSlideWidth();
        calculatePaginationVisibility();
        const handleResize = () => {
            updateSlideWidth();
            calculatePaginationVisibility();
        };
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);

        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [
        clientId,
        shopId,
        client,
        environment_shop_id,
        API_BASE_URL,
        slidesData,
        isMobileView,
    ]);

    useEffect(() => {
        fetchSlideData();
        
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [
        clientId,
        shopId,
        client,
        environment_shop_id,
        API_BASE_URL,
        isMobileView,
    ]);

    const fetchSlideData = () => {
    fetch(`${API_BASE_URL}/api/getSlides/${clientId}/${shopId}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((fetchedData) => {
            setSlidesData(fetchedData);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
    }

    useEffect(() => {
        async function fetchDefChoiceMagasin() {
            const defChoiceMagasin = await fetchDefinitionMagasinChoice(clientId);
            setDefinitionMagasinChoice(defChoiceMagasin);
        }
        fetchDefChoiceMagasin();
    }, [clientId, API_BASE_URL]);

    useEffect(() => {
        async function fetchEnvShop() {
            if (definitionMagasinChoice !== 2 || slidesData.length === 0) return;

            const shop = await fetchShopById(environment_shop_id);
            if (!shop) return;

            // Mise à jour immuable : on ajoute les catalogues manquants sans muter
            // le state, et on renvoie la liste inchangée s'il n'y a rien à ajouter
            // (évite un re-render / une boucle inutile). La persistance est gérée
            // par le store.
            setShoppingList((prevList) => {
                const slidesToAdd = slidesData.filter((slide) =>
                    !prevList.some(
                        (item) => item.catalogId === slide.catalogue_id && item.shop !== null
                    )
                );

                if (slidesToAdd.length === 0) return prevList;

                return [
                    ...prevList,
                    ...slidesToAdd.map((slide) => ({
                        catalogId: slide.catalogue_id,
                        shop,
                        products: []
                    }))
                ];
            });
        }
        fetchEnvShop();
    }, [definitionMagasinChoice, environment_shop_id, slidesData, setShoppingList]);

    const updateSlideWidth = () => {
        const dataSlideLength = slidesData.length;
        if (!isMobileView && sliderContainerRef.current) {
            const paddingSlideContainer = 15 * 2; // 15px * 2 -> slide-container padding
            const slideMarginRight = 10 * dataSlideLength; // 10 px -> slide-element margin-right
            const containerWidth =
                sliderContainerRef.current.offsetWidth -
                (paddingSlideContainer + slideMarginRight);
            const minWidth = 600;
            const maxWidth = 640;
            const slidesPerView = Math.min(
                dataSlideLength,
                containerWidth / minWidth
            );
            const theoricalNewSlideWidth = containerWidth / slidesPerView;
            const newSlideWidth = Math.min(theoricalNewSlideWidth, maxWidth);
            setSlideWidth(newSlideWidth);
        }
    };

    const calculatePaginationVisibility = () => {
        if (!sliderContainerRef.current || !slidesData) return;

        const dataSlideLength = slidesData.length;
        const paddingSlideContainer = 15 * 2; // 15px * 2 -> slide-container padding
        const slideMarginRight = 10 * dataSlideLength; // 10 px -> slide-element margin-right
        const containerWidth =
            sliderContainerRef.current.offsetWidth -
            (paddingSlideContainer + slideMarginRight);
        const totalSlidesWidth = slidesData.length * containerWidth;
        setShowPageDots(totalSlidesWidth > containerWidth);
    };

    return (
        <div ref={sliderContainerRef}>
            {slidesData && slidesData.length > 0 ? (
                <Flickity
                    options={flickityOptions}
                    className={
                        showPageDots
                            ? "slider-container show-page-dots"
                            : "slider-container hide-page-dots"
                    }
                >
                    {slidesData.map((slide) => {
                        return (
                            <div
                                key={slide.catalogue_id}
                                className="slide-element"
                                style={{
                                    width: isMobileView ? "100%" : `${slideWidth}px`,
                                }}
                            >
                                <img
                                    alt={`slide${slide.catalogue_id} media`}
                                    className="slide-media"
                                    src={slide.slide_image}
                                />
                                <div className="slide-meta">
                                    <div className="slide-head">
                                        <div
                                            className="slide-head-subtitle"
                                            style={{ fontFamily: slide.date_typo_name }}
                                        >
                                            Du {slide.catalogue_date_validite_debut} au{" "}
                                            {slide.catalogue_date_validite_fin}
                                        </div>
                                        <div
                                            className="slide-head-title"
                                            style={{ fontFamily: slide.nom_catalogue_typo_name }}
                                        >
                                            <div className="slide-headline">E-CATALOGUE</div>
                                            <div className="slide-headline">
                                                {slide.catalogue_name_ln_un}
                                            </div>
                                            <div className="slide-headline">
                                                {slide.catalogue_name_ln_deux}
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="slide-button btn"
                                        onClick={() => handleSlideClick(slide.catalogue_id)}
                                        style={{
                                            fontFamily: slide.btn_discover_typos_name,
                                        }}
                                    >
                                        Découvrir
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </Flickity>
            ) : (
                <AbsCatalogue />
            )}
            <div className="section-confidentiality container btn">
                <div
                    className="confidentiality-button"
                    title="Cliquez ici pour lire le texte de confidentialité"
                    onClick={handleOpenText}
                >
                    <p className="confidentiality-text-button">
                        Données personnelles &amp; Paramètres de confidentialité
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Carousel;
