import React, { useState } from "react";
import Modal from "react-modal";
import { handleShoppingListShare } from "../functions/ShareShoppinListImage";

export const ShareWithEmail = ({ isOpen, onClose, shoppingList, catalogId, clientColor }) => {
    const [email, setEmail] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [sendStatus, setSendStatus] = useState(null);

    // Custom styles that position this modal over the existing one
    const customStyles = {
        overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1050 // Higher z-index than the parent modal
        },
        content: {
            position: "absolute",
            maxWidth: "350px",
            width: "90%",
            margin: "auto",
            height: "50%",
            left: "50%",
            top: "15%",
            transform: "translate(-50%, -50%)",
            padding: "0",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            zIndex: 1051
        },
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;
    
        setIsSending(true);
        setSendStatus(null);
    
        try {
            const base64Image = await handleShoppingListShare(shoppingList, catalogId);
        } catch (error) {
            console.error("Error sharing list:", error);
            setSendStatus('error');
        } finally {
            setIsSending(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            style={customStyles}
            shouldCloseOnOverlayClick={true}
            ariaHideApp={false}
        >
            <div className="share-email-modal">
                <div className="modal-header" style={{ background: clientColor, padding: "15px", borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }}>
                    <h2 className="modal-header-title">Partager ma liste</h2>
                    <button className="close-btn" onClick={onClose} style={{ position: "absolute", top: "10px", right: "10px" }} title='Fermer'>
                        <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.5 32C25.6127 32 33 24.8366 33 16C33 7.16344 25.6127 0 16.5 0C7.3873 0 0 7.16344 0 16C0 24.8366 7.3873 32 16.5 32Z" fill="white" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M8.02844 7.78518C8.41291 7.38869 9.046 7.37895 9.44248 7.76342L16.492 14.5993L23.5414 7.76342C23.9379 7.37895 24.571 7.38869 24.9555 7.78518C25.3399 8.18166 25.3302 8.81475 24.9337 9.19922L17.9284 15.9922L24.9337 22.7852C25.3302 23.1697 25.3399 23.8028 24.9555 24.1993C24.571 24.5958 23.9379 24.6055 23.5414 24.221L16.492 17.3852L9.44248 24.221C9.046 24.6055 8.41291 24.5958 8.02844 24.1993C7.64397 23.8028 7.65371 23.1697 8.05019 22.7852L15.0555 15.9922L8.05019 9.19922C7.65371 8.81475 7.64397 8.18166 8.02844 7.78518Z" fill={clientColor} />
                        </svg>
                    </button>
                </div>

                <div style={{ padding: "20px" }}>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Adresse e-mail du destinataire</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="exemple@email.com"
                                required
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    marginTop: "5px",
                                    border: "1px solid #ddd",
                                    borderRadius: "4px"
                                }}
                            />
                        </div>

                        {sendStatus === 'success' && (
                            <div style={{ color: 'green', margin: '10px 0' }}>
                                Liste envoyée avec succès !
                            </div>
                        )}

                        {sendStatus === 'error' && (
                            <div style={{ color: 'red', margin: '10px 0' }}>
                                Erreur lors de l'envoi de la liste. Veuillez réessayer.
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isSending || !email}
                            style={{
                                background: clientColor,
                                color: "white",
                                border: "none",
                                padding: "10px 15px",
                                borderRadius: "4px",
                                cursor: "pointer",
                                marginTop: "15px",
                                width: "100%"
                            }}
                        >
                            {isSending ? "Envoi en cours..." : "Envoyer la liste"}
                        </button>
                    </form>
                </div>
            </div>
        </Modal>
    );
};

export default ShareWithEmail;
