import React from "react";
import Modal from "react-modal";
import shareModalCloseIcon from "../../assets/icons/shopModalClose.svg";
import geolocalisationIcon from "../../assets/icons/geolocalisation.svg";
import roofIcon from "../../assets/icons/roof.svg";
import searchIcon from "../../assets/icons/search.svg";
import miniGeoIcon from "../../assets/icons/mini-geo.svg";
import ShopItem from "./shopItem";

const getModalStyles = () => {
    const isMobile = window.innerWidth <= 768;

    return {
        overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
        content: {
            maxHeight: isMobile ? "100%" : "545px",
            maxWidth: isMobile ? "100%" : "956px",
            width: isMobile ? "100%" : "55%",
            height: isMobile ? "100%" : "58%",
            overflowY: "auto",
            borderRadius: "10px",
            position: "fixed", // fixed pour un vrai centrage par rapport à la fenêtre
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            border: "none", // optionnel aussi
        },
    };
};

const modalHeaderIconStyle = {
    width: "100%",
    justifyContent: "end"
}

const modalBodyStyle = {
    display: "flex",
    justifyContent: "space-evenly",
}

const shopFilterStyle = {
    maxWidth: "310px",
    maxHeight: "382px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
}

const shopListStyle = {
    maxWidth: "345px",
    maxHeight: "470px",
    backgroundColor: "#dfdfdf",
    borderRadius: "20px",
    overflowY: "auto",
    display: "flex",
    alignItems: "center"
}

const searchBarStyle = {
    display: "flex",
    marginTop: "30px",
    alignItems: "center"
}

const shopIconStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
}

const searchInputStyle = {
    backgroundColor: "#dfdfdf",
    padding: "15px 20px",
    borderEndEndRadius: 0,
    borderStartEndRadius: 0,
}

const shops = [
    {
        shopId: 1,
        shopTitle: "Bondues",
        shopAdress: "14 Rue de la Loge 59910 Bondues",
        shopImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAEBAk8JmfVm07SlFfjb5WIagpvWCM_e_0Zg&s"
    },
    {
        shopId: 2,
        shopTitle: "Lille",
        shopAdress: "12 Rue de Paris 59000 Lille",
        shopImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAEBAk8JmfVm07SlFfjb5WIagpvWCM_e_0Zg&s"
    },
    {
        shopId: 3,
        shopTitle: "Roubaix",
        shopAdress: "8 Avenue Jean Lebas 59100 Roubaix",
        shopImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAEBAk8JmfVm07SlFfjb5WIagpvWCM_e_0Zg&s"
    },
    {
        shopId: 4,
        shopTitle: "Tourcoing",
        shopAdress: "5 Rue Nationale 59200 Tourcoing",
        shopImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAEBAk8JmfVm07SlFfjb5WIagpvWCM_e_0Zg&s"
    },
    {
        shopId: 1,
        shopTitle: "Bondues",
        shopAdress: "14 Rue de la Loge 59910 Bondues",
        shopImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAEBAk8JmfVm07SlFfjb5WIagpvWCM_e_0Zg&s"
    },
    {
        shopId: 2,
        shopTitle: "Lille",
        shopAdress: "12 Rue de Paris 59000 Lille",
        shopImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAEBAk8JmfVm07SlFfjb5WIagpvWCM_e_0Zg&s"
    },
    {
        shopId: 3,
        shopTitle: "Roubaix",
        shopAdress: "8 Avenue Jean Lebas 59100 Roubaix",
        shopImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAEBAk8JmfVm07SlFfjb5WIagpvWCM_e_0Zg&s"
    },
    {
        shopId: 4,
        shopTitle: "Tourcoing",
        shopAdress: "5 Rue Nationale 59200 Tourcoing",
        shopImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAEBAk8JmfVm07SlFfjb5WIagpvWCM_e_0Zg&s"
    }
];

const ShopModal = ({ catalogId, isOpen, onClose, clientColor }) => {

    const iconSearchStyle = {
        backgroundColor: clientColor,
        width: "fit-content",
        height: "49px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderEndEndRadius: "50%",
        borderStartEndRadius: "50%",
        transform: "translateX(-2px)",
        cursor: "pointer"
    }

    const geoSearchStyle = {
        backgroundColor: clientColor,
        borderRadius: "40px",
        width: "100%",
        height: "52px",
        alignItems: "center",
        color: "white",
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
        cursor: "pointer"
    }

    return (
        <>
            <Modal
                isOpen={isOpen}
                onRequestClose={onClose}
                style={getModalStyles()}
                shouldCloseOnOverlayClick={true}
                ariaHideApp={false}
            >
                <div className="modal-header" style={{ padding: 0 }}>
                    <div className="modal-header-icons" style={modalHeaderIconStyle}>
                        <button className="close-btn" onClick={onClose} title='Fermer la liste de course'>
                            <img src={shareModalCloseIcon} alt="close"></img>
                        </button>
                    </div>
                </div>

                <div className="modal-body" style={modalBodyStyle}>
                    <div className="shop-filter" style={shopFilterStyle}>
                        {/* filter */}
                        <div className="shop-icon" style={shopIconStyle}>
                            <img src={geolocalisationIcon} style={{ width: "46px", height: "65px", transform: "translateY(8px)" }} alt="geolocalisationIcon"></img>
                            <img src={roofIcon} style={{ width: "104px", height: "36px" }} alt="roofIcon"></img>
                        </div>
                        <div style={{ fontWeight: "bold", fontSize: "22px", color: "#2C3336", marginTop: "5px" }}>Choisissez votre commerce</div>
                        <div style={{ maxWidth: "257px", fontSize: "18px", marginTop: "10px" }}>Renseignez votre code postal ou utilisez la géolocalisation pour choisir votre commerce.</div>
                        <div className="search-bar" style={searchBarStyle}>
                            <input className="search-input" style={searchInputStyle} placeholder="Code postal, ville..."/>
                            <div type="submit" className="icon-search" style={iconSearchStyle}><img style={{ margin: "0 10px" }} src={searchIcon} alt="search"></img></div>
                        </div>
                        <div className="geo-search" style={geoSearchStyle}><p>Me géolocaliser</p><img src={miniGeoIcon} style={{ margin: "0 0 0 15px" }} alt="geoIcon"></img></div>
                    </div>
                    <div className="shop-list" style={shopListStyle}>
                        <div className="shop-list-content" style={{overflowY: "auto", height: "95%"}}>
                        {shops.map((shop) => (
                            <ShopItem
                                key={shop.shopId}
                                shopId={shop.shopId}
                                shopImage={shop.shopImage}
                                shopTitle={shop.shopTitle}
                                shopAdress={shop.shopAdress}
                                clientColor={clientColor}
                            />
                        ))}
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ShopModal;
