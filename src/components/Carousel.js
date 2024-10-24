import React, { useState } from "react";
import Flickity from "react-flickity-component";
import Slide from '../assets/images/rentree.webp'
import '../assets/styles/Carousel.css'
import ViewFormatDialog from '../components/ViewFormatModal';

function Carousel() {
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

    return (
        <Flickity className='slider-container' options={flickityOptions}>
            <div className='slide-element'>
                <img
                    alt='slide0 media'
                    className='slide-media'
                    src={Slide}
                // src='https://f2a4-51-83-2-114.ngrok-free.app/rentree.webp'
                />
                <div className='slide-meta'>
                    <div className='slide-head'>
                        <div className='slide-head-subtitle'>Du 16 Août au 23 Août 2024</div>
                        <div className='slide-head-title'>
                            <div className='slide-headline'>E-CATALOGUE</div>
                            <div className='slide-headline'>1st LINE</div>
                            <div className='slide-headline'>2nd LINE</div>
                        </div>
                    </div>
                    <div className='slide-button' variant="contained" onClick={handleClickOpen}>
                        Découvrir
                    </div>
                </div>
            </div>
            <div className='slide-element'>
                <img
                    alt='slide0 media'
                    className='slide-media'
                    src={Slide}
                // src='https://f2a4-51-83-2-114.ngrok-free.app/rentree.webp'
                />
                <div className='slide-meta'>
                    <div className='slide-head'>
                        <div className='slide-head-subtitle'>Du 16 Août au 23 Août 2024</div>
                        <div className='slide-head-title'>
                            <div className='slide-headline'>E-CATALOGUE</div>
                            <div className='slide-headline'>1st LINE</div>
                            <div className='slide-headline'>2nd LINE</div>
                        </div>
                    </div>
                    <div className='slide-button' variant="contained" onClick={handleClickOpen}>
                        Découvrir
                    </div>
                </div>
            </div>
            <div className='slide-element'>
                <img
                    alt='slide0 media'
                    className='slide-media'
                    src={Slide}
                // src='https://f2a4-51-83-2-114.ngrok-free.app/rentree.webp'
                />
                <div className='slide-meta'>
                    <div className='slide-head'>
                        <div className='slide-head-subtitle'>Du 16 Août au 23 Août 2024</div>
                        <div className='slide-head-title'>
                            <div className='slide-headline'>E-CATALOGUE</div>
                            <div className='slide-headline'>1st LINE</div>
                            <div className='slide-headline'>2nd LINE</div>
                        </div>
                    </div>
                    <div className='slide-button' variant="contained" onClick={handleClickOpen}>
                        Découvrir
                    </div>
                </div>
            </div>
            <div className='slide-element'>
                <img
                    alt='slide0 media'
                    className='slide-media'
                    src={Slide}
                // src='https://f2a4-51-83-2-114.ngrok-free.app/rentree.webp'
                />
                <div className='slide-meta'>
                    <div className='slide-head'>
                        <div className='slide-head-subtitle'>Du 16 Août au 23 Août 2024</div>
                        <div className='slide-head-title'>
                            <div className='slide-headline'>E-CATALOGUE</div>
                            <div className='slide-headline'>1st LINE</div>
                            <div className='slide-headline'>2nd LINE</div>
                        </div>
                    </div>
                    <div className='slide-button' variant="contained" onClick={handleClickOpen}>
                        Découvrir
                    </div>
                </div>
            </div>
            <ViewFormatDialog 
                open={open} 
                handleClose={handleClose} />
        </Flickity>
    );
}

export default Carousel;