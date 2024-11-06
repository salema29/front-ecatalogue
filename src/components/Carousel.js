import React, { useEffect, useState } from "react";
import Flickity from "react-flickity-component";
import '../assets/styles/Carousel.css';
import ViewFormatDialog from '../components/ViewFormatModal';

function Carousel() {
    const [slidesData, setSlidesData] = useState([]);

    // get slides data API
    useEffect(() => {
        fetch('http://localhost/admin-ecatalogue-v2/api/getSlides/l-intersport')
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

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Flickity className='slider-container' options={flickityOptions}>
            {slidesData.map(slide => (
                <div key={slide.catalogue_id} className='slide-element'>
                    <img
                        alt={`slide${slide.catalogue_id} media`}
                        className='slide-media'
                        src={slide.slide_image}
                    />
                    <div className='slide-meta'>
                        <div className='slide-head'>
                            <div className='slide-head-subtitle'> Du {slide.catalogue_date_validite_debut} au {slide.catalogue_date_validite_fin}</div>
                            <div className='slide-head-title'>
                                <div className='slide-headline'>{slide.catalogue_name_ln_un}</div>
                                <div className='slide-headline'>{slide.catalogue_name_ln_deux}</div>
                            </div>
                        </div>
                        <div className='slide-button' onClick={handleClickOpen}>
                            Découvrir
                        </div>
                    </div>
                </div>
            ))}
            <ViewFormatDialog open={open} handleClose={handleClose} />
        </Flickity>
    );
}

export default Carousel;
