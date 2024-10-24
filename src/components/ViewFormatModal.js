import React from 'react';
import '../assets/styles/ViewFormatDialog.css';
import { Dialog, DialogContent, Button } from '@mui/material';

const ViewFormatDialog = ({ open, handleClose }) => {
    const GutenbergLogo = 'https://preprod-appli-server.vivetic.com/web_si/front-ecatalogue-v2/assets/icons/gutenberg-logo.svg'
    const ByProductIcon = 'https://preprod-appli-server.vivetic.com/web_si/front-ecatalogue-v2/assets/icons/by-product-icon.svg';
    const ByCatalogIcon = 'https://preprod-appli-server.vivetic.com/web_si/front-ecatalogue-v2/assets/icons/by-catalog-icon.svg';
    const ViewFormatIcon = 'https://preprod-appli-server.vivetic.com/web_si/front-ecatalogue-v2/assets/icons/view-format-icon.svg';
    const DesktopViewFormatIcon = 'https://preprod-appli-server.vivetic.com/web_si/front-ecatalogue-v2/assets/icons/desktop-view-format-icon.svg';
    const PromoImage = 'https://preprod-appli-server.vivetic.com/web_si/front-ecatalogue-v2/assets/images/pross-promo-hiver.png';

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            className='view-format-dialog'
        >
            <header className='view-format-dialog-header container'>
                <div className='view-format-dialog-left-part'>
                    <img className='view-format-dialog-header-logo' src={GutenbergLogo} alt='' />
                    <div className='view-format-dialog-header-text'>
                        <p>Les promo de l'hiver 2024</p>
                        <p>du 13 au 22 janvier 2024</p>
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
                                src={PromoImage} 
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
