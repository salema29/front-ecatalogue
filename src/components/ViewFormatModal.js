import React, { useEffect, useState } from "react";
import '../assets/styles/ViewFormatDialog.css';
import { Dialog, DialogContent, Button } from '@mui/material';

const ViewFormatDialog = ({ open, handleClose }) => {
    const ByProductIcon = 'https://preprod-appli-server.vivetic.com/web_si/front-ecatalogue-v2/assets/icons/by-product-icon.svg';
    const ByCatalogIcon = 'https://preprod-appli-server.vivetic.com/web_si/front-ecatalogue-v2/assets/icons/by-catalog-icon.svg';
    const ViewFormatIcon = 'https://preprod-appli-server.vivetic.com/web_si/front-ecatalogue-v2/assets/icons/view-format-icon.svg';
    const DesktopViewFormatIcon = 'https://preprod-appli-server.vivetic.com/web_si/front-ecatalogue-v2/assets/icons/desktop-view-format-icon.svg';

    const [oneSlideData, setOneSlideData] = useState([]);
    useEffect(() => {
        fetch('http://localhost/admin-ecatalogue-v2/api/getOneSlide/336')
            .then(response => response.json())
            .then(fetchedData => setOneSlideData(fetchedData))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            className='view-format-dialog'
        >
            <header className='view-format-dialog-header container'>
                <div className='view-format-dialog-left-part'>
                    <img className='view-format-dialog-header-logo' src={oneSlideData.client_logo} alt='' />
                    <div className='view-format-dialog-header-text'>
                        <p>{oneSlideData.catalogue_name_ln_un} {oneSlideData.catalogue_name_ln_deux}</p>
                        <p>du {oneSlideData.catalogue_date_validite_debut} au {oneSlideData.catalogue_date_validite_fin}</p>
                    </div>
                </div>
                <div className='view-format-dialog-right-part'>
                    <Button className='view-format-dialog-close' onClick={handleClose}>🗙</Button>
                </div>
            </header>
            <DialogContent className='view-format-dialog-content'>
                <div className='view-format-dialog-desktop-content'>
                    <div className='view-format-dialog-desktop-left-part'>
                        <span className='view-format-dialog-side-image'>
                            <img 
                                src={oneSlideData.slide_image}
                                alt='Pross Promo Hiver'
                            />
                        </span>
                    </div>
                    <div className='view-format-dialog-desktop-right-part'>
                        <div className='view-format-icon-container'>
                            <img className='view-format-icon' src={DesktopViewFormatIcon} alt='' />
                            <h2 className='view-format-text'>Nouveau ! choisissez votre mode de lecture... Version simplifiée par produit et créez ainsi directement vos listes de courses, ou continuer en version feuilletable.</h2>
                        </div>
                        <div className='view-format-dialog-button-container' >
                            <a href='#' className='view-format-dialog-button'>
                                <span className='view-format-dialog-button-text'>Par produit</span>
                                <span className='view-format-dialog-button-icon'>
                                    <img src={ByProductIcon} alt='' />
                                </span>
                            </a>
                            <a href='#' className='view-format-dialog-button'>
                                <span className='view-format-dialog-button-text'>e-catalogue</span>
                                <span className='view-format-dialog-button-icon'>
                                    <img src={ByCatalogIcon} alt='' />
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
                <div className='view-format-dialog-mobile-content'>
                    <div className='view-format-icon-container'>
                        <img className='view-format-icon' src={ViewFormatIcon} alt='' />
                        <h2 className='view-format-text'>Choisissez votre mode de lecture</h2>
                    </div>
                    <div className='view-format-dialog-button-container' >
                        <a href='#' className='view-format-dialog-button'>
                            <span className='view-format-dialog-button-text'>Par produit</span>
                            <span className='view-format-dialog-button-icon'>
                                <img src={ByProductIcon} alt='' />
                            </span>
                        </a>
                        <a href='#' className='view-format-dialog-button'>
                            <span className='view-format-dialog-button-text'>e-catalogue</span>
                            <span className='view-format-dialog-button-icon'>
                                <img src={ByCatalogIcon} alt='' />
                            </span>
                        </a>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ViewFormatDialog;
