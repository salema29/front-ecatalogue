import React, { useState, useEffect, useContext } from "react";
import Modal from "react-modal";
import shareModalCloseIcon from "../../assets/icons/shopModalClose.svg";
import geolocalisationIcon from "../../assets/icons/geolocalisation.svg";
import roofIcon from "../../assets/icons/roof.svg";
import miniGeoIcon from "../../assets/icons/mini-geo.svg";
import ShopModal from "./shopModal";
import { fetchDefinitionMagasinChoice, fetchShopListByClient } from "../functions/Api";
import useIsMobile from "../functions/useIsMobile";
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


    const shopIconStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
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
                        <div className="shop-icon" style={shopIconStyle}>
                            <img src={geolocalisationIcon} style={{ width: isMobileView ? "36px" : "46px", height: isMobileView ? "55px" : "65px", transform: "translateY(8px)" }} alt="geolocalisationIcon"></img>
                            <img src={roofIcon} style={{ width: "104px", height: "36px" }} alt="roofIcon"></img>
                        </div>
                        <div style={{ fontWeight: "bold", fontSize: "22px", color: "#2C3336", marginTop: "5px", textAlign: "center" }}>{shop.magasin_name}</div>
                        <div key={shop.magasin_id_action} className="shop-item" style={shopItemStyle}>
                            <div className="shop-info" style={{ margin: "0 10px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                                <div className="shop-info-address" style={{ display: "flex", alignItems: "center" }}>
                                    <div className="shop-info-address-location-icon" style={{ transform: "translate(-4px, 2px)" }}>
                                        <svg width="34.08" height="34.08" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.668 31.2429C17.3367 31.2429 17.0526 31.1482 16.8159 30.9588C16.5792 30.7695 16.4017 30.521 16.2834 30.2133C15.8337 28.8878 15.2656 27.6452 14.5792 26.4854C13.9165 25.3256 12.9816 23.9647 11.7744 22.4025C10.5673 20.8403 9.58507 19.3492 8.82766 17.9291C8.09392 16.5089 7.72705 14.7929 7.72705 12.7811C7.72705 10.0118 8.68564 7.66856 10.6028 5.75137C12.5437 3.81052 14.8988 2.84009 17.668 2.84009C20.4373 2.84009 22.7805 3.81052 24.6977 5.75137C26.6386 7.66856 27.609 10.0118 27.609 12.7811C27.609 14.9349 27.1948 16.7338 26.3664 18.1776C25.5616 19.5977 24.6267 21.006 23.5616 22.4025C22.2835 24.1067 21.313 25.5268 20.6503 26.6629C20.0113 27.7754 19.4787 28.9588 19.0527 30.2133C18.9343 30.5446 18.745 30.805 18.4846 30.9943C18.2479 31.16 17.9757 31.2429 17.668 31.2429ZM17.668 16.3314C18.6621 16.3314 19.5024 15.9882 20.1888 15.3018C20.8752 14.6154 21.2184 13.7752 21.2184 12.7811C21.2184 11.787 20.8752 10.9467 20.1888 10.2603C19.5024 9.57391 18.6621 9.23071 17.668 9.23071C16.6739 9.23071 15.8337 9.57391 15.1473 10.2603C14.4609 10.9467 14.1177 11.787 14.1177 12.7811C14.1177 13.7752 14.4609 14.6154 15.1473 15.3018C15.8337 15.9882 16.6739 16.3314 17.668 16.3314Z" fill={clientColor} />
                                        </svg>
                                    </div>
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
