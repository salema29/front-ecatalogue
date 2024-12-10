import React, { useEffect, useState } from "react";
import Flickity from "react-flickity-component";
import "../assets/styles/Carousel.css";
import "../assets/styles/Confidentiality.css";
import { useNavigate } from "react-router-dom";
// import { dataSlide } from "./slide.data";

function Carousel() {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const [slidesData, setSlidesData] = useState([]);
    const [shopId, setShopId] = useState(null);
    const [inputValue, setInputValue] = useState(null);
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 767);
    const navigate = useNavigate();
    const handleOpenText = () => {
        navigate(`/confidentiality`);
    };

    let environment_shop_id = 0;
    if (window.dataLayer && window.dataLayer[0]?.cdl_environment_shop) {
        environment_shop_id = window.dataLayer[0].cdl_environment_shop;
    }
    useEffect(() => {
        const hiddenInput = document.getElementById('catalogue-client');
        const fetchedValue = hiddenInput ? hiddenInput.value : 'No value found';
        setInputValue(fetchedValue);
    }, []);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/getSlides/189/0`) //Static data for testing
        fetch(`${API_BASE_URL}/api/getSlides/${inputValue}/${shopId}`)
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
    }, [inputValue, shopId, API_BASE_URL])

    useEffect(() => {
        setShopId(environment_shop_id);
    }, [environment_shop_id]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth <= 767);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [API_BASE_URL]);

    const flickityOptionsCenter = {
        initialIndex: 0,
        cellAlign: isMobileView ? 'left' : slidesData.length < 3 ? 'center' :  'left',
        contain: true,
        selectedAttraction: 0.03,
        friction: 0.3,
        // pageDots: false
        // groupCells: true
    };

    return (
        <>
            <Flickity className="slider-container" options={flickityOptionsCenter}>
                {slidesData.map((slide) => {
                    const handleClick = () => {
                        navigate(`/view/${slide.catalogue_id}`);
                    };
                    return (
                        <div
                            key={slide.catalogue_id}
                            className="slide-element"
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
        </>
    );
}

export default Carousel;
