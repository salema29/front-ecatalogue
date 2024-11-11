import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CategoryNavigation from '../components/CategoryNavigation'
import '../assets/styles/Product.css'

function Product() {
    const { id } = useParams();
    const [slideData, setSlideData] = useState(null);
    const navigate = useNavigate();
    const handleClose = () => {
        navigate(`/view/${id}`);
    };

    useEffect(() => {
        fetch(`http://localhost/admin-ecatalogue-v2/api/getOneSlide/${id}`)
            .then(response => response.json())
            .then(fetchedData => setSlideData(fetchedData))
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, [id]);

    return (
        <>
            {slideData ? (
                <>
                    <header className='view-format-dialog-header'>
                        <div className='view-format-dialog-left-part'>
                            <img className='view-format-dialog-header-logo' src={slideData.client_logo} alt='' />
                            <div className='view-format-dialog-header-text'>
                                <p>{slideData.catalogue_name_ln_un} {slideData.catalogue_name_ln_deux}</p>
                                <p>du {slideData.catalogue_date_validite_debut} au {slideData.catalogue_date_validite_fin}</p>
                            </div>
                        </div>
                        <div className='view-format-dialog-right-part'>
                            <button className='view-format-dialog-close' onClick={handleClose}><img src='https://preprod-appli-server.vivetic.com/web_si/front-ecatalogue-v2/assets/icons/cross-icon.svg' width='20' /></button>                        </div>
                    </header>
                    <CategoryNavigation />
                </>
            ) : (
                <p>Loading...</p>
            )}
            <div className="container">
                <div class="grid-container">
                    <div class="grid-item">1</div>
                    <div class="grid-item">2</div>
                    <div class="grid-item">3</div>
                    <div class="grid-item">4</div>
                    <div class="grid-item">5</div>
                </div>
            </div>
        </>
    );
};

export default Product;