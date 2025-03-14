import React from 'react';
import Modal from "react-modal";
import "../../assets/styles/modalShoppingList.css";

const customStyles = {
    overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
    content: {
        maxWidth: "346px",
        marginLeft: "auto",
        height: '585',
        right: '0',
        padding:'none',
        overflowY:'hidden'
    },
};

const ShoppingListModal = ({ isOpen, onClose, clientColor }) => {
    return (
    <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        style={customStyles}
        shouldCloseOnOverlayClick={true}
        ariaHideApp={false}
    >
        <div className="modal-header" style={{ background: clientColor }} >
            <div>
                <h2 className='modal-header-title'>Ma liste des courses</h2>
                <p className='modal-header-subtitle'>Préparez votre liste de courses <br/> pour gagner du temps en magasin</p>
            </div>
            <div></div>
            <div>
                <button  className="close-btn" onClick={onClose}
                        aria-label="Fermer"
                        style={{
                        position: "absolute",
                        top: "26px",
                        right: "10px",
                        background: "none",
                        border: "none",
                        fontSize: "18px",
                        cursor: "pointer"
                        }}>✖</button>
            </div>
        </div>
        <div className="modal-body">
        
        </div>
    </Modal>
    );
};

export default ShoppingListModal;