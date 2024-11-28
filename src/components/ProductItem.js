import React from 'react';

const ProductItem = ({ product, isMobileView, handleDetailedView, index }) => {
    if (product.view_type !== '1') return null;

    return (
        <div
            key={index}
            className={`grid-item ${isMobileView ? 'mobile-items' : 'desktop-items'}`}
            style={{
                gridColumn: `span ${isMobileView ? product.mobile_width : product.desktop_width}`,
                gridRow: `span ${isMobileView ? product.mobile_height : product.desktop_height}`,
                order: product.view_order,
            }}
        >
            <div className="item-wrapper">
                <div onClick={handleDetailedView} className="item-link">
                    <iframe
                        src={`https://intranet.vivetic.com/labo/15556/sftp_simulation/catalogue_sftp/HTML/${product.html_name}`}
                        className="product-item"
                        title={`Product ${index}`}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductItem;
