import React, { useEffect, useState, useContext, useRef, useCallback } from "react";
import Modal from "react-modal";
import "../../assets/styles/modalShoppingList.css";
import { ShoppingListContext } from '../../store-shopping-list';
import UpdateCountProduct from './update_count_product/updateCountproduct';
import RemoveProductFromList from '../shoppingList/update_count_product/removeProduct'
import ShareShoppingList from '../../assets/icons/share-list-shopping.svg';
import ProductSkeleton from "../shoppingList/skelleton";
import EmptyCart from "../shoppingList/emptyListContent";
import ShareModal from "./ShareModal";
import { ShareWithEmail } from "../shoppingList/shareWithEmail";
import { postShoppingListImage, postTotalPriceEconomyByCatalogue } from "../functions/Api";
import html2canvas from "html2canvas";

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

const categoryNameStyle = {
    height: "30px",
    backgroundColor: "#DADADA",
    textAlign: "center",
    textTransform: "uppercase",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}

const ShoppingListModal = ({ catalogId, isOpen, onClose, clientColor }) => {
    const { shoppingList, setShoppingList } = useContext(ShoppingListContext);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const currentAbortController = useRef(null);
    const isMounted = useRef(false);
    const [imageurl, setImageurl] = useState("");
    const [blob, setBlob] = useState("");
    const [totalEconomyData, setTotalEconomyData] = useState(null);

    const isMobile = () => window.innerWidth <= 768; // Détection simple du mobile
    const [emailShare, setEmailShare] = useState(false);

    useEffect(() => {
        if (shoppingList && shoppingList.length > 0) {
            postTotalPriceEconomyByCatalogue(shoppingList, catalogId).then(data => {
                if (data) {
                    setTotalEconomyData(data[catalogId]);
                }
            });
        }
    }, [shoppingList, catalogId]);

    const handleShareClick = async () => {
        if (isMobile()) {
            setIsShareModalOpen(true);
        } else {
            setEmailShare(true);
        }
    };

    const closeEmailModal = () => {
        setEmailShare(false);
        isMounted.current = false;
        if (currentAbortController.current) {
            currentAbortController.current.abort();
            currentAbortController.current = null;
        }
    };

    const generateImage = useCallback(async () => {
        try {
            const controller = new AbortController();
            currentAbortController.current = controller;
            const { signal } = controller;

            const html = await postShoppingListImage(shoppingList, catalogId, { signal });

            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = html;
            tempDiv.style.position = "absolute";
            tempDiv.style.left = "-9999px";
            document.body.appendChild(tempDiv);

            const canvas = await html2canvas(tempDiv, { allowTaint: true, useCORS: true });
            if (!isMounted.current) {
                document.body.removeChild(tempDiv);
                return;
            }
            const dataUrl = canvas.toDataURL("image/png");
            canvas.toBlob((blob) => {
                if (blob) {
                    setBlob(blob);
                }
            }, "image/png");
            document.body.removeChild(tempDiv);
            if (dataUrl.startsWith("data:image/png;base64,")) {
                setImageurl(dataUrl);
            }
            if (currentAbortController.current === controller) {
                currentAbortController.current = null;
            }
        } catch (error) {
            console.error("Error generating image:", error);
        }
    }, [shoppingList, catalogId]);

    useEffect(() => {
        isMounted.current = true;
        if (emailShare) {
            setImageurl('')
            generateImage();
        }

        return () => {
            // Abort any ongoing image generation
            if (currentAbortController.current) {
                currentAbortController.current.abort();
                currentAbortController.current = null;
            }
        };
    }, [emailShare, generateImage]);


    const idListProducts = shoppingList.reduce((acc, item) =>
        item.catalogId === catalogId ? acc.concat(item.products.map(p => p.id_produit_resume)) : acc, []);

    const [productHtmls, setProductHtmls] = useState([]);
    const [visibleProducts, setVisibleProducts] = useState(new Set());
    const observerRef = useRef(null);

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

    const [showMessageEmptyShoppingList, setShowMessageEmptyShoppingList] = useState(false);
    const [questionEmpyShoppingList, setQuestionEmpyShoppingList] = useState(false);
    const [messageType, setMessageType] = useState(false);


    const deleteShoppingList = () => {
        setShowMessageEmptyShoppingList(true);
        setQuestionEmpyShoppingList(true);
    }

    const removeCatalog = (catalogId) => {
        setShoppingList((prevList) => {
            const status = prevList.some((catalog) => catalog.catalogId === catalogId);
            if (status) {
                setMessageType("true");
                return prevList.filter((catalog) => catalog.catalogId !== catalogId);
            } else {
                setMessageType("false");
                return prevList;
            }
        });
    };

    const confirmDeleteShoppingList = (catalogId) => {
        setQuestionEmpyShoppingList(true);
        removeCatalog(catalogId);
        setQuestionEmpyShoppingList(false);

    };

    const closeEmptyListCourseModal = () => {
        setShowMessageEmptyShoppingList(false);
    };

    const customStyles = {
        overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
        content: {
            maxWidth: "390px",
            height: 'fit-content',
            padding: 'none',
            overflowY: 'hidden',
            margin: 'auto auto'
        },
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
                <div className="modal-header" style={{ background: clientColor }}>
                    <div>
                        <h2 className="modal-header-title">Ma liste de courses</h2>
                        <p className="modal-header-subtitle">
                            Préparez votre liste de courses <br /> pour gagner du temps en magasin
                        </p>
                    </div>
                    <div className="modal-header-icons">
                        {productHtmls.length > 0 &&
                            <>
                                <button className="share-btn"
                                    disabled={productHtmls.length <= 0} style={{ cursor: "pointer" }}
                                    title={productHtmls.length <= 0 ? 'Fermez et ajoutez au moins un produit ' : 'Partager la liste de courses'}
                                    onClick={handleShareClick}
                                >
                                    <img src={ShareShoppingList} alt="partager-course" />
                                </button>

                                <button className="btn empty-shopping-list" onClick={deleteShoppingList} title='Vider la liste de courses' >
                                    <svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.16666 23.625C8.525 23.625 7.97569 23.4047 7.51875 22.9641C7.0618 22.5234 6.83333 21.9937 6.83333 21.375V6.75H5.66666V4.5H11.5V3.375H18.5V4.5H24.3333V6.75H23.1667V21.375C23.1667 21.9937 22.9382 22.5234 22.4812 22.9641C22.0243 23.4047 21.475 23.625 20.8333 23.625H9.16666ZM20.8333 6.75H9.16666V21.375H20.8333V6.75ZM11.5 19.125H13.8333V9H11.5V19.125ZM16.1667 19.125H18.5V9H16.1667V19.125Z" fill={clientColor} />
                                    </svg>
                                </button>
                            </>
                        }
                        <button className="close-btn" onClick={onClose} title='Fermer la liste de course'>
                            <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.5 32C25.6127 32 33 24.8366 33 16C33 7.16344 25.6127 0 16.5 0C7.3873 0 0 7.16344 0 16C0 24.8366 7.3873 32 16.5 32Z" fill="white" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M8.02844 7.78518C8.41291 7.38869 9.046 7.37895 9.44248 7.76342L16.492 14.5993L23.5414 7.76342C23.9379 7.37895 24.571 7.38869 24.9555 7.78518C25.3399 8.18166 25.3302 8.81475 24.9337 9.19922L17.9284 15.9922L24.9337 22.7852C25.3302 23.1697 25.3399 23.8028 24.9555 24.1993C24.571 24.5958 23.9379 24.6055 23.5414 24.221L16.492 17.3852L9.44248 24.221C9.046 24.6055 8.41291 24.5958 8.02844 24.1993C7.64397 23.8028 7.65371 23.1697 8.05019 22.7852L15.0555 15.9922L8.05019 9.19922C7.65371 8.81475 7.64397 8.18166 8.02844 7.78518Z"
                                    fill={clientColor} />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="modal-body">
                    <div>
                        {showMessageEmptyShoppingList && (
                            <Modal
                                isOpen={isOpen}
                                onRequestClose={onClose}
                                contentLabel="Vider la liste de courses"
                                shouldCloseOnOverlayClick={false}
                                ariaHideApp={false}
                                style={customStyles}
                            >
                                <div className="modal-header-empty-shopping-list" style={{ background: clientColor }}>
                                    <button className="close-btn" onClick={closeEmptyListCourseModal} title='Fermer'>
                                        <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M16.5 32C25.6127 32 33 24.8366 33 16C33 7.16344 25.6127 0 16.5 0C7.3873 0 0 7.16344 0 16C0 24.8366 7.3873 32 16.5 32Z" fill="none" />
                                            <path fillRule="evenodd" clipRule="evenodd" d="M8.02844 7.78518C8.41291 7.38869 9.046 7.37895 9.44248 7.76342L16.492 14.5993L23.5414 7.76342C23.9379 7.37895 24.571 7.38869 24.9555 7.78518C25.3399 8.18166 25.3302 8.81475 24.9337 9.19922L17.9284 15.9922L24.9337 22.7852C25.3302 23.1697 25.3399 23.8028 24.9555 24.1993C24.571 24.5958 23.9379 24.6055 23.5414 24.221L16.492 17.3852L9.44248 24.221C9.046 24.6055 8.41291 24.5958 8.02844 24.1993C7.64397 23.8028 7.65371 23.1697 8.05019 22.7852L15.0555 15.9922L8.05019 9.19922C7.65371 8.81475 7.64397 8.18166 8.02844 7.78518Z"
                                                fill="black" />
                                        </svg>
                                    </button>
                                </div>
                                {questionEmpyShoppingList ? (
                                    <div style={{ height: '10rem' }}>
                                        <p className="delete-list-message">Voulez-vous vraiment vider votre liste de courses ?</p>
                                        <div className="delete-list-action-btn">
                                            <button className="btn-clear-action"
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    handleLaunchFunction(catalogId);
                                                }}
                                                style={{ backgroundColor: 'rgb(40, 167, 69)' }}
                                            >
                                                Oui
                                            </button >
                                            <button className="btn-clear-action" onClick={closeEmptyListCourseModal} style={{ marginLeft: '8px', backgroundColor: '#ea5455' }}>Non</button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="empty-list-message-result">
                                        {messageType ?
                                            (
                                                <p style={{ color: "green", textAlign: "center" }}>Liste de courses vidée avec succès. </p>
                                            ) : (
                                                <p style={{ color: "red", textAlign: "center" }}>Oups ! La liste de courses n’a pas été vidée. Vous pouvez réessayer. </p>
                                            )
                                        }
                                    </div>
                                )
                                }
                            </Modal>
                        )}
                    </div>
                    {productHtmls.length > 0 ? (
                        productHtmls.map((categoryGroup, groupIndex) => {
                            if (categoryGroup.categorie_name && categoryGroup.products) {
                                return (
                                    <div key={groupIndex} className="category-group">
                                        <div className="category-title" style={categoryNameStyle}><span>{categoryGroup.categorie_name}</span></div>
                                        {categoryGroup.products.map((productHtml, productIndex) => {
                                            const isLastProductInCategory = productIndex === categoryGroup.products.length - 1;
                                            const isLastCategory = groupIndex === productHtmls.length - 1;

                                            return (
                                                <div
                                                    className="product-wrapper"
                                                    ref={(el) => el && observerRef.current.observe(el)}
                                                    key={productHtml.id_produit}
                                                    data-id-produit={productHtml.id_produit}
                                                >
                                                    {(!isShareModalOpen && !emailShare) && visibleProducts.has(productHtml.id_produit) ? (
                                                        <>
                                                            <div className="product">
                                                                <div className="product-item">
                                                                    <iframe
                                                                        className="product-shopping-list"
                                                                        src={productHtml.html_name}
                                                                        scrolling="no"
                                                                        title={productHtml.id_produit}
                                                                    />
                                                                </div>
                                                                <div className="side-btn">
                                                                    <div className="remove-product">
                                                                        <RemoveProductFromList
                                                                            id_produit_resume={productHtml.id_produit}
                                                                            catalogue_id={catalogId}
                                                                        />
                                                                    </div>
                                                                    {!isMobile() && (
                                                                        <div className="update-count-btn">
                                                                            <UpdateCountProduct
                                                                                id_produit_resume={productHtml.id_produit}
                                                                                catalogue_id={catalogId}
                                                                            />
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            {isMobile() && (
                                                                <div className="update-count-btn-mobile">
                                                                    <UpdateCountProduct
                                                                        id_produit_resume={productHtml.id_produit}
                                                                        catalogue_id={catalogId}
                                                                    />
                                                                </div>
                                                            )}
                                                            {
                                                                (!isLastProductInCategory || isLastCategory) && (
                                                                    <hr style={{ border: "1px solid black", width: "50%" }} />
                                                                )
                                                            }
                                                        </>
                                                    ) : (
                                                        <ProductSkeleton height={200} width={"95%"} />
                                                    )}
                                                </div>
                                            );
                                        })}

                                    </div>
                                )
                            } else return null
                        })
                    ) : (
                        <EmptyCart clientColor={clientColor} />
                    )
                    }
                </div>
                {(productHtmls.length > 0 && totalEconomyData) && (
                    <div className="modal-footer modal-footer-body">
                        <div className="vente-total">
                            <div className="vente-total-texte">Total :</div>
                            <div className="vente-total-prix">
                                <div className="vente-total-prix-remise">{parseFloat(totalEconomyData.totalPriceAfterDiscount).toFixed(2)} €</div>
                                <div className="vente-total-prix-economie" style={{ color: clientColor }}>Vous économisez {parseFloat(totalEconomyData.economy).toFixed(2)} €</div>
                            </div>
                        </div>
                    </div>
                )}
                <ShareModal
                    isOpen={isShareModalOpen}
                    onClose={() => setIsShareModalOpen(false)}
                    shoppingList={shoppingList}
                    catalogId={catalogId}
                    clientColor={clientColor}
                />
            </Modal>
            {emailShare && (
                <ShareWithEmail
                    isOpen={emailShare}
                    onClose={closeEmailModal}
                    image={imageurl}
                    blob={blob}
                    clientColor={clientColor}
                    catalogId={catalogId}
                />
            )}
        </>
    );
};

export default ShoppingListModal;
