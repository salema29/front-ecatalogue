import React, { useContext } from "react";
import { ShoppingListContext } from '../../store-shopping-list';
import { chooseShop } from "../functions/Shop";
import useIsMobile from "../functions/useIsMobile";
import ShopLocationPin from "./ShopLocationPin";

const ShopItem = ({ catalogId, shop, clientColor, onClose, setKeyword }) => {
    const { shoppingList, setShoppingList } = useContext(ShoppingListContext);
    const isMobileView = useIsMobile();

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
        setKeyword('');
        onClose();
    };


    return (
        <div key={shop.magasin_id_action} className="shop-item" style={shopItemStyle}>
            <div className="shop-info" style={{ margin: "0 10px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div className="shop-info-title" style={{ fontWeight: "600", color: "#4A4A4A" }}>
                    {(shop.magasin_name.length > 40 ? shop.magasin_name.slice(0, 40) + '...' : shop.magasin_name)}
                </div>
                <div className="shop-info-address" style={{ display: "flex", alignItems: "center" }}>
                    <ShopLocationPin clientColor={clientColor} />
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