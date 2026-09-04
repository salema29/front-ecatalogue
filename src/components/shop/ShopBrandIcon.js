import React from 'react';
import geolocalisationIcon from "../../assets/icons/geolocalisation.svg";
import roofIcon from "../../assets/icons/roof.svg";

// Bloc d'illustration (pointeur de geolocalisation + toit) en tete des
// modales "choix du magasin" et "fiche magasin".
const ShopBrandIcon = ({ isMobileView }) => (
    <div className="shop-icon" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <img
            src={geolocalisationIcon}
            style={{
                width: isMobileView ? "36px" : "46px",
                height: isMobileView ? "55px" : "65px",
                transform: "translateY(8px)"
            }}
            alt="geolocalisationIcon"
        />
        <img src={roofIcon} style={{ width: "104px", height: "36px" }} alt="roofIcon" />
    </div>
);

export default ShopBrandIcon;
