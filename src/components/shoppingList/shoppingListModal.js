import React, { useEffect, useState, useContext, useRef } from "react";
import Modal from "react-modal";
import "../../assets/styles/modalShoppingList.css";
import { ShoppingListContext } from '../../store-shopping-list';
import UpdateCountProduct from './update_count_product/updateCountproduct';
import RemoveProductFromList from '../shoppingList/update_count_product/removeProduct'
import ShareShoppingList from '../../assets/icons/share-list-shopping.svg';
import MiniSpinner from "../spinner/MiniSpinner";
import ProductSkeleton from "../shoppingList/skelleton";
import EmptyCart from "../shoppingList/emptyListContent";
import  { ShareWithEmail } from "../shoppingList/shareWithEmail";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const getModalStyles = () => {
    const isMobile = window.innerWidth <= 768;

    return {
        overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
        content: {
            width: isMobile ? "100%" : "600px",
            marginLeft: isMobile ? "0" : "auto",
            height: isMobile ? "100%" : "92%",
            right: "0",
            left: isMobile ? "0" : "auto",
            padding: "none",
            overflowY: "auto",
            borderRadius: isMobile ? "0" : "10px",
            ...(isMobile
                ? { top: "0", bottom: "0" } // Pour mobile, occupe tout l'écran
                : { top: "4%", bottom: "auto" } // Pour desktop, un léger espacement en haut
            ),
        },
    };
};

const ShoppingListModal = ({ catalogId, isOpen, onClose, clientColor }) => {
    const { shoppingList } = useContext(ShoppingListContext);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);

    const isMobile = () => window.innerWidth <= 768; // Détection simple du mobile
    const [isSharing, setIsSharing] = useState(false);
    const handleShareClick = async () => {
        if (isMobile()) {
            setIsSharing(true); // Activer le loader
            setIsShareModalOpen(true);
            setIsSharing(false); // Désactiver le loader après partage
        } else {
            setShowEmailShare(true);
        }
    };

    const idListProducts = shoppingList.reduce((acc, item) =>
        item.catalogId === catalogId ? acc.concat(item.products.map(p => p.id_produit_resume)) : acc, []);

    const [productHtmls, setProductHtmls] = useState([]);
    const [visibleProducts, setVisibleProducts] = useState(new Set());
    const observerRef = useRef(null);
    const [showEmailShare, setShowEmailShare] = useState(false);
    useEffect(() => {
        if (idListProducts.length > 0) {
            fetch(`${API_BASE_URL}/api/shopping-list/`, {
                method: "POST",
                body: JSON.stringify({ ids: idListProducts }),
            })
                .then(response => response.json())
                .then(data => {
                    setProductHtmls(data);
                })
                .catch(error => console.error("Error fetching htmls:", error));
        } else {
            setProductHtmls([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shoppingList]);

    useEffect(() => {
        if (!observerRef.current) {
            observerRef.current = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisibleProducts(prev => new Set([...prev, entry.target.dataset.idProduit]));
                    }
                });
            });
        }

        return () => observerRef.current && observerRef.current.disconnect();
    }, []);

    return (
        <>
            <Modal
                isOpen={isOpen}
                onRequestClose={onClose}
                style={getModalStyles()}
                shouldCloseOnOverlayClick={true}
                ariaHideApp={false}
            >
                <div className="modal-header" style={{ background: clientColor }}>
                    <div>
                        <h2 className="modal-header-title">Ma liste des courses</h2>
                        <p className="modal-header-subtitle">
                            Préparez votre liste de courses <br /> pour gagner du temps en magasin
                        </p>
                    </div>
                    <div className="modal-header-icons">
                        {isSharing ? (
                            <MiniSpinner /> // Loader ici
                        ) : (
                            <button className="share-btn" onClick={handleShareClick} title='Partager ma liste de courses'>
                                <img src={ShareShoppingList} alt="partager-course" />
                            </button>
                        )}
                        <button className="close-btn" onClick={onClose} title='Fermer ma liste de course'>
                            <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.5 32C25.6127 32 33 24.8366 33 16C33 7.16344 25.6127 0 16.5 0C7.3873 0 0 7.16344 0 16C0 24.8366 7.3873 32 16.5 32Z" fill="white" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M8.02844 7.78518C8.41291 7.38869 9.046 7.37895 9.44248 7.76342L16.492 14.5993L23.5414 7.76342C23.9379 7.37895 24.571 7.38869 24.9555 7.78518C25.3399 8.18166 25.3302 8.81475 24.9337 9.19922L17.9284 15.9922L24.9337 22.7852C25.3302 23.1697 25.3399 23.8028 24.9555 24.1993C24.571 24.5958 23.9379 24.6055 23.5414 24.221L16.492 17.3852L9.44248 24.221C9.046 24.6055 8.41291 24.5958 8.02844 24.1993C7.64397 23.8028 7.65371 23.1697 8.05019 22.7852L15.0555 15.9922L8.05019 9.19922C7.65371 8.81475 7.64397 8.18166 8.02844 7.78518Z"
                                    fill={clientColor} />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="modal-body">
                    {productHtmls.length > 0 ?
                        (
                            productHtmls.map((productHtml) => (
                                <div
                                    className="product-wrapper"
                                    ref={(el) => el && observerRef.current.observe(el)}
                                    key={productHtml.id_produit}
                                    data-id-produit={productHtml.id_produit}
                                >
                                    {visibleProducts.has(productHtml.id_produit) ? (
                                        <>
                                            <div className="product">
                                                <div className="product-item">
                                                    <iframe
                                                        className="product-shopping-list"
                                                        src={productHtml.html_name}
                                                        key={productHtml.id_produit}
                                                        scrolling="no"
                                                        title={productHtml.id_produit} />
                                                </div>
                                                <div className="side-btn">
                                                    <div className="remove-product">
                                                        <RemoveProductFromList id_produit_resume={productHtml.id_produit} catalogue_id={catalogId} />
                                                    </div>
                                                    {!isMobile() && (
                                                        <div className="update-count-btn">
                                                            <UpdateCountProduct id_produit_resume={productHtml.id_produit} catalogue_id={catalogId} />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            {isMobile() && (
                                                <div className="update-count-btn-mobile">
                                                    <UpdateCountProduct id_produit_resume={productHtml.id_produit} catalogue_id={catalogId} />
                                                </div>
                                            )}
                                            <hr style={{ border: "1px solid black", width: "50%" }} />
                                        </>
                                    ) : (
                                        <ProductSkeleton height={200} width="100%" />
                                    )}
                                </div>
                            ))
                        )
                        : (
                            <EmptyCart clientColor={clientColor} />
                        )}
                </div>
            </Modal>
            <ShareWithEmail
                isOpen={showEmailShare}
                onClose={() => setShowEmailShare(false)}
                shoppingList={shoppingList}
                catalogId={catalogId}
                clientColor={clientColor} />
        </>
    );
};

export default ShoppingListModal;
