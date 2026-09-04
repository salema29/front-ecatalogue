import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import { postShoppingListImage } from '../functions/Api';
import { renderHtmlToCanvas } from '../functions/renderHtmlToCanvas';
import '../../assets/styles/ShareModal.css';
import MiniSpinner from '../spinner/MiniSpinner';
import CloseIcon from '../CloseIcon';
import sendIcon from '../../assets/icons/send-icon.svg';

const ShareModal = ({ isOpen, onClose, shoppingList, catalogId, clientColor }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [imageData, setImageData] = useState(null);
    const currentAbortController = useRef(null);
    const isMounted = useRef(false);

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

    useEffect(() => {
        isMounted.current = true;

        if (isOpen) {
            generateImage();
        }

        return () => {
            isMounted.current = false;

            if (currentAbortController.current) {
                currentAbortController.current.abort(); // Annule le fetch si encore en cours
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [isOpen]);

    const generateImage = async () => {
        setIsLoading(true);
        const controller = new AbortController();  // contrôleur d'annulation
        const { signal } = controller;

        // Enregistrer le contrôleur pour l'annuler lors de la fermeture
        currentAbortController.current = controller;

        try {
            const html = await postShoppingListImage(shoppingList, catalogId, { signal }); // Ajout du signal
            if (!isMounted.current) return;

            const canvas = await renderHtmlToCanvas(html, { windowWidth: 1440 });
            if (!isMounted.current) return;

            setImageData(canvas.toDataURL("image/png"));
            setIsLoading(false);
        } catch (error) {
            if (error.name !== "AbortError") {  // Ignorer l'erreur si l'opération est annulée
                console.error("Erreur lors de la génération de l'image", error);
            }
            setIsLoading(false);
        }
    };

    const handleShare = async () => {
        if (navigator.share && imageData) {
            try {
                const res = await fetch(imageData);
                const blob = await res.blob();

                if (blob.size === 0) {
                    console.error("Erreur : le fichier généré est vide.");
                    return;
                }

                const file = new File([blob], "shopping-list.png", { type: "image/png" });

                await navigator.share({
                    title: "Ma liste de courses",
                    text: "Voici ma liste de courses. Partage-la avec tes amis !",
                    files: [file],
                });

                onClose(); // Ferme la modal après partage
            } catch (err) {
                console.error("Erreur lors du partage :", err);
            }
        }
    };


    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Partager ma liste de courses"
            shouldCloseOnOverlayClick={true}
            ariaHideApp={false}
            style={customStyles}
        >
            <div className="share-modal-header">
                <button className="close-btn" onClick={onClose} title='Fermer ma liste de courses'>
                    <CloseIcon xFill={clientColor} />
                </button>
            </div>
            <div className="share-modal-body">
                <div className="share-modal-body-title">Partager ma liste de courses</div>
                <div className="share-modal-body-preview">
                    {isLoading ? (
                        // Skeleton loader pendant le chargement
                        <div className="skeleton-loader"></div>
                    ) : (
                        // Affichage de l'aperçu de l'image une fois chargée
                        <img src={imageData} alt="Aperçu de la liste" className="image-preview" />
                    )}
                </div>
                <div onClick={isLoading ? () => { } : handleShare} className="share-modal-body-loader" style={{ backgroundColor: clientColor }}>
                    {isLoading ? (
                        <>
                            <div className="share-modal-body-loader-text" style={{ cursor: "not-allowed" }}>Chargement</div>
                            <span className="share-modal-body-loader-icon">
                                <MiniSpinner />
                            </span>
                        </>
                    ) : (
                        <>
                            <div className="share-modal-body-loader-text" style={{ cursor: "pointer" }}>
                                Partager
                            </div>
                            <img src={sendIcon} alt="partager-course" />
                        </>
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default ShareModal;
