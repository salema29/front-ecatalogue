import React, { useEffect, useState } from "react";
import Flickity from "react-flickity-component";
import '../assets/styles/Carousel.css';
import ViewFormatDialog from '../components/ViewFormatModal';

function Carousel() {
    const [slidesData, setSlidesData] = useState([]);
    const [productsData, setProductsData] = useState([]);

    // get slides data API
    useEffect(() => {
        fetch('http://localhost/admin-ecatalogue-v2/api/getSlides')
            .then(response => response.json())
            .then(fetchedData => setSlidesData(fetchedData))
            .catch(error => console.error('Error fetching data:', error));
    }, []);
    console.log(slidesData);

    // get products data API
    useEffect(() => {
        fetch('http://localhost/admin-ecatalogue-v2/api/getProducts')
            .then(response => response.json())
            .then(fetchedData => setProductsData(fetchedData))
            .catch(error => console.error('Error fetching data:', error));
    }, []);
    console.log(productsData);
    
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
                <div key={slide.id} className='slide-element'>
                    <img
                        alt={`slide${slide.id} media`}
                        className='slide-media'
                        src={slide.imageSrc}
                    />
                    <div className='slide-meta'>
                        <div className='slide-head'>
                            <div className='slide-head-subtitle'>{slide.subtitle}</div>
                            <div className='slide-head-title'>
                                {slide.headlines.map((line, index) => (
                                    <div key={index} className='slide-headline'>{line}</div>
                                ))}
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
