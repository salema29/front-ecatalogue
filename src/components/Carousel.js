import React, { useEffect, useState } from "react";
import Flickity from "react-flickity-component";
import "../assets/styles/Carousel.css";
import "../assets/styles/Confidentiality.css";
import { useNavigate } from "react-router-dom";

function Carousel() {
    const [slidesData, setSlidesData] = useState([]);
    const [shopId, setShopId] = useState(null);
    const [clientId, setClientId] = useState(null);
    let environment_shop_id = 0;
    if (window.dataLayer && window.dataLayer[0]?.cdl_environment_shop) 
    {
        environment_shop_id = window.dataLayer[0].cdl_environment_shop;
    }    
    const client = document.getElementById('catalogue-client');
    const navigate = useNavigate();
    const handleOpenText = () => {
        navigate(`/confidentiality`);
    };

    useEffect(() => {
        const shop = environment_shop_id;
        setShopId(shop);
        
        const fetchedValue = client ? client.value : null ;
        setClientId(fetchedValue);

        fetch(`http://localhost/admin-ecatalogue-v2/api/getSlides/${clientId}/${shopId}`)
            .then((response) => response.json())
            .then((fetchedData) => setSlidesData(fetchedData))
            .catch((error) => console.error("Error fetching data:", error));
    }, [clientId, shopId, client, environment_shop_id]);

    const flickityOptions = {
        initialIndex: 0,
        cellAlign: "left",
        contain: true,
        selectedAttraction: 0.03,
        friction: 0.3,
    };

    return (
        <>
            <Flickity className="slider-container" options={flickityOptions}>
                {slidesData.map((slide) => {
                    const handleClick = () => {
                        navigate(`/view/${slide.catalogue_id}`);
                    };
                    return (
                        <div key={slide.catalogue_id} className="slide-element">
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
