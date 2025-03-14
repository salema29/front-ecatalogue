import React from 'react';
import Modal from "react-modal";

const customStyles = {
  overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
  content: {
    maxWidth: "346px",
    marginLeft: "auto",
    borderRadius: "8px",
    height: '585'
  },
};

const ShoppingListModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Exemple de Modal"
      style={customStyles}
      shouldCloseOnOverlayClick={true}
      ariaHideApp={false}
    >
      <button
        onClick={onClose}
        aria-label="Fermer"
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "none",
          border: "none",
          fontSize: "18px",
          cursor: "pointer"
        }}
      >
        ✖
      </button>
      <h2>Ma liste des courses</h2>
      <p>Préparez votre liste de courses pour gagner du temps en magasin.</p>
    </Modal>
  );
};

export default ShoppingListModal;