import React, { useEffect, useState, useRef } from "react";
import Flickity from "react-flickity-component";
import "../assets/styles/Carousel.css";
import "../assets/styles/Confidentiality.css";
import { useNavigate } from "react-router-dom";
import AbsCatalogue from "./AbsCatalogue";
// import { dataSlide } from "./slide.data";

function Carousel() {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const API_BUILD_URL = process.env.REACT_APP_API_BUILD_URL;
    const API_ASSETS_URL = process.env.REACT_APP_API_ASSET_URL;
    const [slidesData, setSlidesData] = useState([]);
    const [shopId, setShopId] = useState(null);
    const [clientId, setClientId] = useState(null);
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 767);
    const [slideWidth, setSlideWidth] = useState(640);
    const [showPageDots, setShowPageDots] = useState(true);
    const sliderContainerRef = useRef(null);

    let environment_shop_id = 0;

    if (window.dataLayer && window.dataLayer[0]?.cdl_environment_shop) {
        environment_shop_id = window.dataLayer[0].cdl_environment_shop;
    }
    const client = document.getElementById('catalogue-client');
    const navigate = useNavigate();
    const handleOpenText = () => {
        navigate(`/confidentiality`);
    };

    const [flickityOptions, setFlickityOptions] = useState({
        initialIndex: 0,
        cellAlign: isMobileView ? 'left' : slidesData.length < 3 ? 'center' : 'left',
        contain: true,
        selectedAttraction: 0.03,
        friction: 0.3,
        groupCells: isMobileView ? false : true,
        pageDots: true,
        prevNextButtons: true,
    });

    useEffect(() => {
        const hiddenInput = document.getElementById('catalogue-client');
        const fetchedValue = hiddenInput ? hiddenInput.value : 'No value found';
        setClientId(fetchedValue);
    }, []);

    useEffect(() => {
        setShopId(environment_shop_id);
    }, [environment_shop_id]);

    useEffect(() => {
        updateSlideWidth();
        calculatePaginationVisibility();
        const handleResize = () => {
            setIsMobileView(window.innerWidth <= 767);
            updateSlideWidth();
            calculatePaginationVisibility();
        };
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);

    }, [clientId, shopId, client, environment_shop_id, API_BASE_URL, slidesData, isMobileView]);

    useEffect(() => {
        fetchSlideData();
    }, [clientId, shopId, client, environment_shop_id, API_BASE_URL, isMobileView]);

    const fetchSlideData = () => {
        // setClientId(202);
        // fetch(`${API_BASE_URL}/api/getSlides/202/0`) //Static data for testing
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

    const updateSlideWidth = () => {
        const dataSlideLength = slidesData.length;
        if (!isMobileView && sliderContainerRef.current) {
            const paddingSlideContainer = 15 * 2; // 15px * 2 -> slide-container padding 
            const slideMarginRight = 10 * dataSlideLength; // 10 px -> slide-element margin-right
            const containerWidth = sliderContainerRef.current.offsetWidth - (paddingSlideContainer + slideMarginRight);
            const minWidth = 600;
            const maxWidth = 640;
            const slidesPerView = Math.min(dataSlideLength, containerWidth / minWidth); 
            const theoricalNewSlideWidth = containerWidth / slidesPerView;
            const newSlideWidth = Math.min(theoricalNewSlideWidth, maxWidth);
            setSlideWidth(newSlideWidth);
        }
    };

    const calculatePaginationVisibility = () => {
        const dataSlideLength = slidesData.length;
        const paddingSlideContainer = 15 * 2; // 15px * 2 -> slide-container padding 
        const slideMarginRight = 10 * dataSlideLength; // 10 px -> slide-element margin-right
        const containerWidth = sliderContainerRef.current.offsetWidth - (paddingSlideContainer + slideMarginRight);
        if (sliderContainerRef.current && slidesData) {
            const totalSlidesWidth = slidesData.length * containerWidth;
            setShowPageDots(totalSlidesWidth > containerWidth);
        }
    };

    return (
        <div ref={sliderContainerRef}>
            {(slidesData && slidesData.length > 0) ? (
                <Flickity
                    options={flickityOptions}
                    className={showPageDots ? "slider-container show-page-dots" : "slider-container hide-page-dots"}
                >
                    {slidesData.map((slide, key) => {
                        const handleClick = () => {
                            const targetUrl = `${window.location.href.split("#")[0]}#/view/${slide.catalogue_id}`;
                            const placeholderFavicon = `${API_ASSETS_URL}/icons/popup-svgrepo-com.svg`;
                        
                            // Vérifier si on est déjà dans un popup
                            const isPopup = window.opener !== null && window.opener !== undefined;
                        
                            if (isPopup) {
                                // Si on est dans un popup, rediriger directement
                                window.location.href = targetUrl;
                            } else {
                                // Si on n'est pas dans un popup, ouvrir un popup
                                const screenWidth = window.screen.availWidth; // Largeur de l'écran disponible
                                const screenHeight = window.screen.availHeight; // Hauteur de l'écran disponible
                        
                                const popupWindow = window.open(
                                    `${targetUrl}`,
                                    "_blank",
                                    `width=${screenWidth},height=${screenHeight},left=0,top=0`
                                );
                        
                                if (!popupWindow) {
                                    alert("Popup bloqué ! Veuillez autoriser les fenêtres contextuelles pour ce site web.");
                                }
                            }
                        };                        

                        return (
                            <div
                                key={key}
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
                                            Du {slide.catalogue_date_validite_debut} au{" "}{slide.catalogue_date_validite_fin}
                                        </div>
                                        <div
                                            className="slide-head-title"
                                            style={{ fontFamily: slide.nom_catalogue_typo_name }}
                                        >
                                            <div className="slide-headline">
                                                E-CATALOGUE
                                            </div>
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
                                        onClick={handleClick}
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
