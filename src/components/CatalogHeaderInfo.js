import React from 'react';

// Partie gauche de l'en-tete catalogue : logo client (mobile/desktop),
// nom du catalogue sur 2 lignes, periode de validite.
// Partage par ProductList, ProductDetail et CatalogOverview.
const CatalogHeaderInfo = ({ headerData, isMobileView }) => (
    <div className="view-format-dialog-left-part">
        <img
            className="header-logo"
            src={isMobileView ? headerData.client_logo_mobile : headerData.client_logo_desktop}
            alt=""
        />
        <div className="header-text">
            <p className="catalogue-name" style={{ color: headerData.client_color || "#fff" }}>
                {headerData.catalogue_name_ln_un} {headerData.catalogue_name_ln_deux}
            </p>
            <p className="catalogue-date" style={{ color: "black" }}>
                du {headerData.catalogue_date_validite_debut} au {headerData.catalogue_date_validite_fin}
            </p>
        </div>
    </div>
);

export default CatalogHeaderInfo;
