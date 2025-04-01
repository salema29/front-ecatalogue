import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import html2canvas from 'html2canvas';
import { postShoppingListImage } from '../functions/Api';
import '../../assets/styles/ShareModal.css';
import MiniSpinner from '../spinner/MiniSpinner';
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

            const image = canvas.toDataURL("image/png");

            setImageData(image);
            setIsLoading(false);
            document.body.removeChild(tempDiv);
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
                <button className="close-btn" onClick={onClose} title='Fermer ma liste de course'>
                    <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.5 32C25.6127 32 33 24.8366 33 16C33 7.16344 25.6127 0 16.5 0C7.3873 0 0 7.16344 0 16C0 24.8366 7.3873 32 16.5 32Z" fill="white" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M8.02844 7.78518C8.41291 7.38869 9.046 7.37895 9.44248 7.76342L16.492 14.5993L23.5414 7.76342C23.9379 7.37895 24.571 7.38869 24.9555 7.78518C25.3399 8.18166 25.3302 8.81475 24.9337 9.19922L17.9284 15.9922L24.9337 22.7852C25.3302 23.1697 25.3399 23.8028 24.9555 24.1993C24.571 24.5958 23.9379 24.6055 23.5414 24.221L16.492 17.3852L9.44248 24.221C9.046 24.6055 8.41291 24.5958 8.02844 24.1993C7.64397 23.8028 7.65371 23.1697 8.05019 22.7852L15.0555 15.9922L8.05019 9.19922C7.65371 8.81475 7.64397 8.18166 8.02844 7.78518Z"
                            fill={clientColor} />
                    </svg>
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
