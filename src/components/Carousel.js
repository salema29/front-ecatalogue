import React, { useState } from "react";
import Flickity from "react-flickity-component";
import '../assets/styles/Carousel.css'
import ViewFormatDialog from '../components/ViewFormatModal';

function Carousel() {
    const imageSrc = 'https://preprod-appli-server.vivetic.com/web_si/front-ecatalogue-v2/assets/images/rentree.webp';
    const slidesCount = 2; // Replace this with the actual count of your elements
    const flickityOptions = {
        initialIndex: 0,
        cellAlign: 'left',
        selectedAttraction: 0.03,
        friction: 0.3
    };

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const slidesData = [
        {
            id: 1,
            imageSrc: imageSrc,
            subtitle: "Du 16 Août au 23 Août 2024",
            headlines: ["E-CATALOGUE", "1st LINE", "2nd LINE"],
        },
        {
            id: 2,
            imageSrc: imageSrc,
            subtitle: "Du 16 Août au 23 Août 2024",
            headlines: ["E-CATALOGUE", "1st LINE", "2nd LINE"],
        },
        {
            id: 3,
            imageSrc: imageSrc,
            subtitle: "Du 16 Août au 23 Août 2024",
            headlines: ["E-CATALOGUE", "1st LINE", "2nd LINE"],
        },
        {
            id: 4,
            imageSrc: imageSrc,
            subtitle: "Du 16 Août au 23 Août 2024",
            headlines: ["E-CATALOGUE", "1st LINE", "2nd LINE"],
        },
    ];

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