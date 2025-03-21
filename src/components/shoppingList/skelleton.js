import React from "react";

const ProductSkeleton = () => {
    return (
        <div className="product-skeleton" style={{ width: "100%", height: "200px", position: "relative" }}>
            <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 390 200"
            style={{ width: "100%", height: "100%" }}
            >
                {/* Background */}
                <rect width="390" height="200" fill="#ffffff" stroke="#e0e0e0" strokeWidth="1"/>
                <rect x="20" y="20" width="250" height="160" fill="#f0f0f0"/>
                <rect x="290" y="20" width="250" height="40" fill="#f0f0f0"/>
                <rect x="290" y="135" width="250" height="40" fill="#f0f0f0"/>

            </svg>
        </div>
    ) ;
};

export default ProductSkeleton;