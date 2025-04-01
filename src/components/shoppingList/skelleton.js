import React from "react";
import "../../assets/styles/ProductSkeleton.css";

const ProductSkeleton = ({ height, width }) => {
    return (
        <div
            className="skeleton"
            style={{
                height: height || "200px",
                width: width || "90%",
                backgroundColor: "#f0f0f0",
                borderRadius: "10px",
                animation: "pulse 1.5s infinite ease-in-out",
                margin: "5px auto"
            }}
        ></div>
    );
};

export default ProductSkeleton;