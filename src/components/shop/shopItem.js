import React, { useState, useEffect, useContext } from "react";
import { ShoppingListContext } from '../../store-shopping-list';
import { chooseShop } from "../functions/Shop";

const ShopItem = ({ catalogId, shop, clientColor, onClose }) => {
    const { shoppingList, setShoppingList } = useContext(ShoppingListContext);
    const [isMobileView, setisMobileView] = useState(window.innerWidth <= 767);

    useEffect(() => {
        const handleResize = () => {
            setisMobileView(window.innerWidth <= 767);
        };
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [isMobileView])

    const shopItemStyle = {
        display: "flex",
        justifyContent: "space-between",
        margin: isMobileView ? "10px 5px" : "10px 10px",
        alignItems: "center"
    }

    const shopChoiceBtn = {
        backgroundColor: clientColor,
        minWidth: "100px",
        height: "48.69px",
        borderRadius: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontWeight: "500",
        cursor: "pointer"
    }

    const handleChooseShop = () => {
        const updatedList = chooseShop(shoppingList, catalogId, shop);
        setShoppingList(updatedList);
        onClose();
    };


    return (
        <div key={shop.magasin_id_action} className="shop-item" style={shopItemStyle}>
            <div className="shop-info" style={{ margin: "0 10px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div className="shop-info-title" style={{ fontWeight: "600", color: "#4A4A4A" }}>{shop.magasin_city}</div>
                <div className="shop-info-address" style={{ display: "flex", alignItems: "center" }}>
                    <div className="shop-info-address-location-icon" style={{ transform: "translate(-4px, 2px)" }}>
                        <svg width="34.08" height="34.08" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.668 31.2429C17.3367 31.2429 17.0526 31.1482 16.8159 30.9588C16.5792 30.7695 16.4017 30.521 16.2834 30.2133C15.8337 28.8878 15.2656 27.6452 14.5792 26.4854C13.9165 25.3256 12.9816 23.9647 11.7744 22.4025C10.5673 20.8403 9.58507 19.3492 8.82766 17.9291C8.09392 16.5089 7.72705 14.7929 7.72705 12.7811C7.72705 10.0118 8.68564 7.66856 10.6028 5.75137C12.5437 3.81052 14.8988 2.84009 17.668 2.84009C20.4373 2.84009 22.7805 3.81052 24.6977 5.75137C26.6386 7.66856 27.609 10.0118 27.609 12.7811C27.609 14.9349 27.1948 16.7338 26.3664 18.1776C25.5616 19.5977 24.6267 21.006 23.5616 22.4025C22.2835 24.1067 21.313 25.5268 20.6503 26.6629C20.0113 27.7754 19.4787 28.9588 19.0527 30.2133C18.9343 30.5446 18.745 30.805 18.4846 30.9943C18.2479 31.16 17.9757 31.2429 17.668 31.2429ZM17.668 16.3314C18.6621 16.3314 19.5024 15.9882 20.1888 15.3018C20.8752 14.6154 21.2184 13.7752 21.2184 12.7811C21.2184 11.787 20.8752 10.9467 20.1888 10.2603C19.5024 9.57391 18.6621 9.23071 17.668 9.23071C16.6739 9.23071 15.8337 9.57391 15.1473 10.2603C14.4609 10.9467 14.1177 11.787 14.1177 12.7811C14.1177 13.7752 14.4609 14.6154 15.1473 15.3018C15.8337 15.9882 16.6739 16.3314 17.668 16.3314Z" fill={clientColor} />
                        </svg>
                    </div>
                    <div className="shop-info-address-value" style={{ fontSize: "12px", color: "#4A4A4A" }}>
                        <div>{(shop.magasin_adresse + ' ' + shop.magasin_code_postal).length > 45 ? (shop.magasin_adresse + ' ' + shop.magasin_code_postal).slice(0, 45) + '...' : (shop.magasin_adresse + ' ' + shop.magasin_code_postal)}</div>
                        {shop.distance && <div><strong>{parseFloat(shop.distance).toFixed(2)} Km</strong></div>}
                    </div>
                </div>
            </div>
            <div className="shop-choice-btn" style={shopChoiceBtn} onClick={handleChooseShop}><span>Choisir</span></div>
        </div>
    );
};

export default ShopItem;