import React, { useState } from "react";
import Modal from "react-modal";
import "../../assets/styles/ProductSkeleton.css"

export const ShareWithEmail = ({ isOpen, onClose, image, blob, clientColor, catalogId }) => {
    const [email, setEmail] = useState("");
    const [objet, setObjet] = useState("Liste des courses");
    const [message, setMessage] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [sendStatus, setSendStatus] = useState(null);

    const customStyles = {
        overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1,
            position: "fixed",
        },
        content: {
            position: "absolute",
            width: "50%",
            margin: "auto",
            height: "fit-content",
            padding: "0",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            zIndex: 1,
            top: "0%",
            overflowY: "auto",
        },
    };

    const validateEmail = () => {
        if (!email) {
            return false;
        }
        const emailRegex = /.+@.+\..+/;
        if (!emailRegex.test(email)) {
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateEmail()) return;

        setIsSending(true);
        setSendStatus(null);

        try {
            await sendEmail(blob);
        } catch (error) {
            console.error("Erreur lors du partage de la liste. Veuillez recommencer", error);
            setSendStatus("error");
        } finally {
            setIsSending(false);
        }
    };

    const sendEmail = async (blob) => {
        try {
            const formData = new FormData();
            formData.append("image", blob);
            formData.append("objet", objet);
            formData.append("destinataire", email);
            formData.append("message", message);
            formData.append("catalogue_id", catalogId);

            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/post-shopping-list-email`, {
                method: "POST",
                body: formData,
            });

            const result =  response;
            if (result.status) {
                setSendStatus("success");
                setEmail("");
                setTimeout(() => {
                    onClose();
                }, 2000);
            } else {
                setSendStatus("error");
            }
            return result.status;
        } catch (err) {
            console.error("Error while sending email:", err);
            setSendStatus("error");
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            style={customStyles}
            shouldCloseOnOverlayClick={true}
            ariaHideApp={false}
        >
            <div className="share-email-modal">
                <div className="modal-header" style={{ background: clientColor, padding: "15px", borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }}>
                    <h2 className="modal-header-title">Partager ma liste de courses</h2>
                    <button className="close-btn" onClick={onClose} style={{ position: "absolute", top: "10px", right: "10px" }} title='Fermer la boite email'>
                        <svg width="20" height="20" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.5 32C25.6127 32 33 24.8366 33 16C33 7.16344 25.6127 0 16.5 0C7.3873 0 0 7.16344 0 16C0 24.8366 7.3873 32 16.5 32Z" fill="white" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M8.02844 7.78518C8.41291 7.38869 9.046 7.37895 9.44248 7.76342L16.492 14.5993L23.5414 7.76342C23.9379 7.37895 24.571 7.38869 24.9555 7.78518C25.3399 8.18166 25.3302 8.81475 24.9337 9.19922L17.9284 15.9922L24.9337 22.7852C25.3302 23.1697 25.3399 23.8028 24.9555 24.1993C24.571 24.5958 23.9379 24.6055 23.5414 24.221L16.492 17.3852L9.44248 24.221C9.046 24.6055 8.41291 24.5958 8.02844 24.1993C7.64397 23.8028 7.65371 23.1697 8.05019 22.7852L15.0555 15.9922L8.05019 9.19922C7.65371 8.81475 7.64397 8.18166 8.02844 7.78518Z" fill={clientColor} />
                        </svg>
                    </button>
                </div>

                <div style={{ padding: "20px" }}>
                    <form onSubmit={handleSubmit}>
                        <div className="form-container" >
                            <div className="form-group" style={{display: "flex",alignItems: "center", marginBottom: "10px"}} >
                                    <label
                                        htmlFor="email"
                                        style={{
                                            marginRight: "10px",
                                            minWidth: "150px",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Pour (*) :
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        onBlur={validateEmail}
                                        placeholder="exemple@email.com"
                                        required
                                        style={{
                                            flex: 1,
                                            padding: "10px",
                                            border: "1px solid #ddd",
                                            borderRadius: "4px",
                                            cursor: isSending ? "not-allowed" : "text"
                                        }}
                                        disabled={isSending}
                                    />
                            </div>

                            <div className="form-group" style={{display: "flex",alignItems: "center", marginBottom: "10px"}} >
                                <label
                                    htmlFor="objet"
                                    style={{
                                        marginRight: "10px",
                                        minWidth: "150px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Objet (*) :
                                </label>
                                <input
                                    type="text"
                                    id="objet"
                                    value={objet}
                                    onChange={(e) => setObjet(e.target.value)}
                                    placeholder="Email du destinataire"
                                    required
                                    style={{
                                        flex: 1,
                                        padding: "10px",
                                        border: "1px solid #ddd",
                                        borderRadius: "4px",
                                        cursor: isSending ? "not-allowed" : "text"
                                    }}
                                    disabled={isSending}
                                />
                            </div>

                            <div className="form-group" style={{display: "flex",alignItems: "center", marginBottom: "10px"}} >
                                <label
                                    htmlFor="pj"
                                    style={{
                                        marginRight: "10px",
                                        minWidth: "150px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Pièce jointe :
                                </label>
                                {image ?
                                    (
                                        <div>
                                            <img
                                                src={image}
                                                alt="liste des courses"
                                                style={{ maxWidth: "100%", maxHeight: "50px", marginBottom: "10px" }} />
                                        </div>
                                    )
                                    :
                                    (
                                        <div
                                            className="skeleton"
                                            style={{
                                                height: "50px",
                                                width: "7%",
                                                backgroundColor: "#f0f0f0",
                                                borderRadius: "10px",
                                                animation: "pulse 1.9s infinite ease-in-out",
                                            }}
                                        ></div>
                                    )
                                }
                            </div>

                            <div className="form-group" style={{display: "flex",alignItems: "center", marginBottom: "10px"}} >
                                    <textarea
                                        id="message"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Écrivez votre message ici..."
                                        rows="4"
                                        style={{
                                            width: "100%",
                                            padding: "10px",
                                            border: "1px solid #ddd",
                                            borderRadius: "4px",
                                            minHeight: "50px",
                                            resize: "vertical",
                                            cursor: isSending ? "not-allowed" : "text"
                                        }}
                                        disabled={isSending}
                                    >
                                    </textarea>
                                </div>

                            <div className="form-group" style={{ textAlign: "right" }}>
                                <button
                                    type="submit"
                                    disabled={isSending || !image }
                                    style={{
                                        background: clientColor,
                                        color: "white",
                                        border: "none",
                                        padding: "10px 20px",
                                        borderRadius: "4px",
                                        cursor: isSending || !image ? "not-allowed" : "pointer"
                                    }}
                                >
                                    {isSending ? "Envoi en cours..." : "Envoyer la liste"}
                                </button>
                            </div>

                            {sendStatus === "success" && (
                                <p style={{ color: "green", textAlign: "center" }}>Email envoyé avec succès !</p>
                            )}

                            {sendStatus === "error" && (
                                <p style={{ color: "red", textAlign: "center" }}>Échec de l'envoi de l'email.</p>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
};
