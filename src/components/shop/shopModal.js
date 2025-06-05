import React, { useState, useEffect, useContext } from "react";
import Modal from "react-modal";
import shareModalCloseIcon from "../../assets/icons/shopModalClose.svg";
import geolocalisationIcon from "../../assets/icons/geolocalisation.svg";
import roofIcon from "../../assets/icons/roof.svg";
import searchIcon from "../../assets/icons/search.svg";
import miniGeoIcon from "../../assets/icons/mini-geo.svg";
import ShopItem from "./shopItem";
import EmptyShopListContent from "./emptyShopListContent";
import { getCurrentLocation, getPlaceLocation } from "../functions/Geolocalisation";
import { ClientContext } from "../../store-client";
import { fetchShopsByGeolocation, fetchShopsByKeyword } from "../functions/Api";

const ShopModal = ({ catalogId, isOpen, onClose, clientColor, shopList }) => {
    const [isMobileView, setisMobileView] = useState(window.innerWidth <= 767);
    const clientContext = useContext(ClientContext);
    const [currentShopList, setCurrentShopList] = useState(shopList);
    const [keyword, setKeyword] = useState("");
    const [shopListStyle, setShopListStyle] = useState({
        maxWidth: "335px",
        maxHeight: "470px",
        backgroundColor: shopList.length > 0 ? "#dfdfdf" : "transparent",
        borderRadius: "20px",
        overflowY: "auto",
        display: "flex",
        alignItems: "center",
        marginTop: isMobileView ? "20px" : "0"
    });

    const [isLoading, setIsLoading] = useState(false);

    const getModalStyles = () => {
        return {
            overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
            content: {
                maxHeight: isMobileView ? "100%" : "545px",
                minHeight: isMobileView ? "auto" : "450px",
                maxWidth: isMobileView ? "100%" : "956px",
                minWidth: isMobileView ? "100%" : "785px",
                width: isMobileView ? "100%" : "45%",
                height: isMobileView ? "85%" : "58%",
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

    const iconSearchStyle = {
        backgroundColor: clientColor,
        width: "fit-content",
        height: "50px",
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
        marginTop: isMobileView ? "10px" : "20px",
        cursor: "pointer"
    }

    const modalHeaderIconStyle = {
        width: "100%",
        justifyContent: "end",
        margin: "5px 0"
    }

    const shopFilterStyle = {
        maxWidth: isMobileView ? "325px" : "310px",
        maxHeight: "382px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        marginTop: isMobileView ? "-15px" : "",
        margin: "auto 0"
    }

    const searchBarStyle = {
        display: "flex",
        marginTop: isMobileView ? "15px" : "20px",
        alignItems: "center",
        width: "100%"
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

    useEffect(() => {
        const handleResize = () => {
            setisMobileView(window.innerWidth <= 767);
        };
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [isMobileView])

    useEffect(() => {
        if (currentShopList) {
            setShopListStyle((prevStyle) => ({
                ...prevStyle,
                backgroundColor: currentShopList.length > 0 ? "#dfdfdf" : "transparent",
                marginTop: isMobileView ? "20px" : "0",
            }));
        } else {
            setShopListStyle((prevStyle) => ({
                ...prevStyle,
                backgroundColor: "transparent",
                marginTop: isMobileView ? "20px" : "0",
            }));
        }
    }, [isMobileView, currentShopList]);

    useEffect(() => {
        if (isLoading) {
            setShopListStyle((prevStyle) => ({
                ...prevStyle,
                backgroundColor: "transparent",
                marginTop: isMobileView ? "20px" : "0",
            }));
        }
    }, [isLoading, isMobileView]);

    const handleGeolocation = async () => {
        setIsLoading(true);
        setKeyword('');
        try {
            const position = await getCurrentLocation();
            const shopListByGeolocation = await fetchShopsByGeolocation(clientContext.storedClient, position);
            setCurrentShopList(shopListByGeolocation);
        } catch (error) {
            console.error("Geolocation error:", error.message);
            alert("Impossible de récupérer votre position. Veuillez vérifier vos paramètres de localisation et réessayer.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearchKeyword = async () => {
        if (keyword.trim() === "") {
            setCurrentShopList(shopList);
            return;
        }
        setIsLoading(true);
        try {
            const position = await getPlaceLocation(keyword.trim());
            const shopsByKeyword = await fetchShopsByKeyword(clientContext.storedClient, position, keyword);
            setCurrentShopList(shopsByKeyword);
        } catch (error) {
            console.error("Geolocation error:", error.message);
            alert("Impossible de récupérer la position de la ville ou du code postal. Veuillez vérifier vos paramètres de localisation ou réessayer avec une autre recherche.");
        } finally {
            setIsLoading(false);
        }
    };

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
                            <img src={geolocalisationIcon} style={{ width: isMobileView ? "36px" : "46px", height: isMobileView ? "55px" : "65px", transform: "translateY(8px)" }} alt="geolocalisationIcon"></img>
                            <img src={roofIcon} style={{ width: "104px", height: "36px" }} alt="roofIcon"></img>
                        </div>
                        {!isMobileView && <div style={{ fontWeight: "bold", fontSize: "22px", color: "#2C3336", marginTop: "5px" }}>Choisissez votre commerce</div>}
                        {!isMobileView && <div style={{ maxWidth: "257px", fontSize: "18px", marginTop: "10px" }}>Renseignez votre code postal ou utilisez la géolocalisation pour choisir votre commerce.</div>}
                        {isMobileView && <div style={{ maxWidth: "280px", fontWeight: "500", fontSize: "20px", color: "#2C3336", marginTop: "5px" }}>Trouvez le magasin le plus proche participant
                            à l'opération</div>}
                        <div className="search-bar" style={searchBarStyle}>
                            <input className="search-input" style={searchInputStyle} value={keyword} onChange={(e) => setKeyword(e.target.value)} onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSearchKeyword();
                                }
                            }} placeholder="Code postal, ville..." />
                            <div type="submit" className="icon-search" style={iconSearchStyle} onClick={handleSearchKeyword}><img style={{ margin: "0 10px" }} src={searchIcon} alt="search"></img></div>
                        </div>
                        <div className="geo-search" style={geoSearchStyle} onClick={handleGeolocation}><p>Me géolocaliser</p><img src={miniGeoIcon} style={{ margin: "0 0 0 15px" }} alt="geoIcon"></img></div>
                    </div>
                    <div className="shop-list" style={shopListStyle}>
                        {isLoading ? (
                            <div style={{ textAlign: "center", marginTop: "20px", width: "335px" }}>
                                <div style={{ overflow: "hidden" }}>
                                    <svg fill="none" className="circle-svg-1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                        <circle className="circle" cx="50" cy="50" r={isMobileView ? "20" : "40"} />
                                    </svg>
                                </div>
                            </div>
                        ) : currentShopList ? (
                            <div className="shop-list-content" style={{ overflowY: currentShopList.length > 0 ? "auto" : "hidden", height: "95%" }}>
                                {currentShopList.length > 0 ? (currentShopList.map((shop) => (
                                    <ShopItem
                                        key={shop.magasin_id_action}
                                        catalogId={catalogId}
                                        shop={shop}
                                        clientColor={clientColor}
                                        onClose={onClose}
                                    />
                                ))) : (
                                    <EmptyShopListContent clientColor={clientColor} />
                                )}
                            </div>
                        ) : (
                            <EmptyShopListContent clientColor={clientColor} />
                        )}
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ShopModal;
