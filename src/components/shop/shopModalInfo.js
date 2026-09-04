import React, { useState, useEffect, useContext } from "react";
import Modal from "react-modal";
import shareModalCloseIcon from "../../assets/icons/shopModalClose.svg";
import miniGeoIcon from "../../assets/icons/mini-geo.svg";
import ShopModal from "./shopModal";
import { fetchDefinitionMagasinChoice, fetchShopListByClient } from "../functions/Api";
import useIsMobile from "../functions/useIsMobile";
import ShopLocationPin from "./ShopLocationPin";
import ShopBrandIcon from "./ShopBrandIcon";
import { ClientContext } from "../../store-client";

const ShopModalInfo = ({ catalogId, isOpen, onClose, clientColor, shop }) => {
    const isMobileView = useIsMobile();
    const [shopModalOpen, setShopModalOpen] = useState(false);
    const [definitionMagasinChoice, setDefinitionMagasinChoice] = useState(null);
    const [shopList, setShopList] = useState(null);
    const clientContext = useContext(ClientContext);

    const getModalStyles = () => {
        return {
            overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
            content: {
                maxHeight: isMobileView ? "100%" : "545px",
                minHeight: isMobileView ? "80%" : "350px",
                maxWidth: isMobileView ? "100%" : "956px",
                minWidth: isMobileView ? "100%" : "330px",
                width: isMobileView ? "100%" : "20%",
                height: isMobileView ? "70%" : "fit-content",
                overflowY: "auto",
                borderRadius: isMobileView ? "35px" : "10px",
                position: "fixed", // fixed pour un vrai centrage par rapport à la fenêtre
                top: isMobileView ? "55%" : "50%",
                left: "50%",
                transform: isMobileView ? "translate(-50%, -55%)" : "translate(-50%, -50%)",
                border: "none",
                padding: "5px"
            },
        };
    };

    const modalBodyStyle = {
        display: "flex",
        justifyContent: isMobileView ? "space-between" : "space-evenly",
        margin: "0 0 20px 0",
        flexDirection: isMobileView ? "column" : "row",
        alignItems: isMobileView ? "center" : "auto"
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
        marginTop: "auto",
        cursor: "pointer"
    }

    const modalHeaderIconStyle = {
        width: "100%",
        justifyContent: "end",
        margin: "5px 0"
    }

    const shopInfoStyle = {
        maxWidth: isMobileView ? "325px" : "310px",
        minWidth: isMobileView ? "85%" : "310px", 
        display: "flex",
        flexDirection: "column",
        justifyContent: isMobileView ? "start" : "center",
        marginTop: isMobileView ? "-15px" : "",
        margin: isMobileView ? "20px auto" : "0 auto",
        height: "100%"
    }


    const shopItemStyle = {
        display: "flex",
        justifyContent: "space-between",
        margin: "30px 5px",
        alignItems: "center"
    }



    useEffect(() => {
        async function fetchDefChoiceMagasin() {
            const defChoiceMagasin = await fetchDefinitionMagasinChoice(clientContext.storedClient);
            setDefinitionMagasinChoice(defChoiceMagasin);
        }
        fetchDefChoiceMagasin();
    }, [clientContext.storedClient]);

    useEffect(() => {
        if (definitionMagasinChoice !== 0) {
            async function fetchShopList() {
                const shops = await fetchShopListByClient(clientContext.storedClient);
                setShopList(shops);
            }
            fetchShopList();
        }
    }, [clientContext.storedClient, definitionMagasinChoice]);

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
                        <button className="close-btn" onClick={onClose} title='Fermer la fiche magasin'>
                            <img src={shareModalCloseIcon} alt="close"></img>
                        </button>
                    </div>
                </div>

                <div className="modal-body" style={modalBodyStyle}>
                    <div className="shop-info" style={shopInfoStyle}>
                        <ShopBrandIcon isMobileView={isMobileView} />
                        <div style={{ fontWeight: "bold", fontSize: "22px", color: "#2C3336", marginTop: "5px", textAlign: "center" }}>{shop.magasin_name}</div>
                        <div key={shop.magasin_id_action} className="shop-item" style={shopItemStyle}>
                            <div className="shop-info" style={{ margin: "0 10px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                                <div className="shop-info-address" style={{ display: "flex", alignItems: "center" }}>
                                    <ShopLocationPin clientColor={clientColor} />
                                    <div className="shop-info-address-value" style={{ fontSize: "12px", color: "#4A4A4A" }}>
                                        <div>{shop.magasin_adresse}</div>
                                        <div>{shop.magasin_code_postal + ' ' + shop.magasin_city}</div>
                                    </div>
                                </div>
                                <div className="shop-info-address" style={{ display: "flex", alignItems: "center", margin:"15px 0 0 0" }}>
                                    <div className="shop-info-address-location-icon" style={{ transform: "translate(-4px, 2px)" }}>
                                        <svg width="36" height="37" viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M22.95 25.55L25.05 23.45L19.5 17.9V11H16.5V19.1L22.95 25.55ZM18 33.5C15.925 33.5 13.975 33.1062 12.15 32.3187C10.325 31.5312 8.7375 30.4625 7.3875 29.1125C6.0375 27.7625 4.96875 26.175 4.18125 24.35C3.39375 22.525 3 20.575 3 18.5C3 16.425 3.39375 14.475 4.18125 12.65C4.96875 10.825 6.0375 9.23749 7.3875 7.88749C8.7375 6.53749 10.325 5.46874 12.15 4.68124C13.975 3.89374 15.925 3.49999 18 3.49999C20.075 3.49999 22.025 3.89374 23.85 4.68124C25.675 5.46874 27.2625 6.53749 28.6125 7.88749C29.9625 9.23749 31.0312 10.825 31.8187 12.65C32.6062 14.475 33 16.425 33 18.5C33 20.575 32.6062 22.525 31.8187 24.35C31.0312 26.175 29.9625 27.7625 28.6125 29.1125C27.2625 30.4625 25.675 31.5312 23.85 32.3187C22.025 33.1062 20.075 33.5 18 33.5ZM18 30.5C21.325 30.5 24.1562 29.3312 26.4937 26.9937C28.8312 24.6562 30 21.825 30 18.5C30 15.175 28.8312 12.3437 26.4937 10.0062C24.1562 7.66874 21.325 6.49999 18 6.49999C14.675 6.49999 11.8437 7.66874 9.50625 10.0062C7.16875 12.3437 6 15.175 6 18.5C6 21.825 7.16875 24.6562 9.50625 26.9937C11.8437 29.3312 14.675 30.5 18 30.5Z" fill={clientColor} />
                                        </svg>

                                    </div>
                                    <div className="shop-info-address-value" style={{ fontSize: "12px", color: "#4A4A4A" }}>
                                        <div>{shop.magasin_horaire ? shop.magasin_horaire : "Fermeture temporaire"}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="geo-search" style={geoSearchStyle} onClick={() => {setShopModalOpen(true); onClose()}}><p>Changer de magasin</p><img src={miniGeoIcon} style={{ margin: "0 0 0 15px" }} alt="geoIcon"></img></div>
                    </div>
                </div>
            </Modal>
            {shopList &&
                (<ShopModal
                    catalogId={catalogId}
                    isOpen={shopModalOpen}
                    onClose={() => setShopModalOpen(false)}
                    clientColor={clientColor}
                    shopList={shopList}
                />)}
        </>
    );
};

export default ShopModalInfo;
