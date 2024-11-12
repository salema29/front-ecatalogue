import React, { useEffect, useState } from "react";
import Flickity from "react-flickity-component";
import '../assets/styles/Carousel.css';
import '../assets/styles/Confidentiality.css'
import { useNavigate  } from 'react-router-dom';

function Carousel() {
    const [slidesData, setSlidesData] = useState([]);
    const navigate = useNavigate();
    
    const handleOpenText = () => {
        navigate(`/confidentiality-text`);
    };

    useEffect(() => {
        fetch('http://localhost/admin-ecatalogue-v2/api/getSlides/logo-preprod')
            .then(response => response.json())
            .then(fetchedData => setSlidesData(fetchedData))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const flickityOptions = {
        initialIndex: 0,
        cellAlign: 'left',
        contain: true,
        selectedAttraction: 0.03,
        friction: 0.3,
    };

    return (
        <>
            <Flickity className='slider-container' options={flickityOptions}>
                {slidesData.map(slide => {
                    const handleClick = () => {
                        navigate(`/view/${slide.catalogue_id}`);
                    };
                    return (
                        <div key={slide.catalogue_id} className='slide-element'>
                            <img
                                alt={`slide${slide.catalogue_id} media`}
                                className='slide-media'
                                src={slide.slide_image}
                            />
                            <div className='slide-meta'>
                                <div className='slide-head'>
                                <div className='slide-head-subtitle' style={{ fontFamily: slide.date_typo_name }}>
                                        Du {slide.catalogue_date_validite_debut} au {slide.catalogue_date_validite_fin}
                                    </div>
                                    <div className='slide-head-title' style={{ fontFamily: slide.nom_catalogue_typo_name }}>
                                        <div className='slide-headline'>{slide.catalogue_name_ln_un}</div>
                                        <div className='slide-headline'>{slide.catalogue_name_ln_deux}</div>
                                    </div>
                                </div>
                                <div className='slide-button' onClick={handleClick} style={{ cursor: 'pointer', fontFamily: slide.btn_discover_typos_name }} >
                                    Découvrir
                                </div>
                            </div>
                        </div>
                    );
                })}
            </Flickity>
            <div className='section-confidentiality'>
                <div  className='confidentiality-button' title="Cliquez ici pour lire le texte de confidentialité" style={{ cursor: 'pointer' }} onClick={handleOpenText}>
                    <p className='confidentiality-text-button'>Données personnelles &amp; Paramètres de confidentialité</p>
                </div>
            </div>
        </>
    );
}

export default Carousel;
