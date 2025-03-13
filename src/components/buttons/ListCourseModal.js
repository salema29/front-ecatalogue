// import React from "react";
// import Modal from "react-modal";

// Modal.setAppElement("#ecatalogue"); // Nécessaire pour l'accessibilité

// const MyModal = ({ isOpen, onClose, children }) => {
//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={onClose}
//       contentLabel="Exemple de Modal"
//       style={{
//         overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
//         content: { maxWidth: "500px", margin: "auto", padding: "20px" },
//       }}
//     >
//       <button onClick={onClose} style={{ float: "right" }}>X</button>
//       {children}
//     </Modal>
//   );
// };

// export default MyModal;


import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white p-6 rounded-lg shadow-lg z-10 relative max-w-md w-full">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>
        <div className="mt-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;