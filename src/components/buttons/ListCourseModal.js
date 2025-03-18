import React, { useEffect, useState, useContext, useCallback  } from "react";
import Modal from "react-modal";
import "../../assets/styles/modalShoppingList.css";
import { ShoppingListContext } from '../../store-shopping-list';
import { handleShoppingListToImage } from '../functions/ShareShoppingList'; 

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const customStyles = {
    overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
    content: {
        maxWidth: "390px",
        marginLeft: "auto",
        height: '585',
        right: '0',
        padding:'none',
        overflowY:'hidden'
    },
};

const ShoppingListModal = ({ catalogId, isOpen, onClose, clientColor }) => {
    const { shoppingList } = useContext(ShoppingListContext);
    const idListProducts = shoppingList.reduce((acc, item) =>
        item.catalogId === catalogId ? acc.concat(item.products.map(p => p.id_produit_resume)) : acc
    , []);

    const [productHtmls, setproductHtmls] = useState([]);
    useEffect(() => {
        fetch(`${API_BASE_URL}/api/shopping-list/`, {
            method: 'POST',
            body: JSON.stringify({
                ids: idListProducts,
            }),
        })
        .then(response => response.json())
        .then(data => {
            setproductHtmls(data);
        })
        .catch(error => {
            console.error('Error fetching htmls:', error);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, []);

    const handleShareBtnClick = useCallback(() => {
        if (window.innerWidth <= 768) {
            handleShoppingListToImage(shoppingList, catalogId);
        } else {
            onClose();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, []);

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
                <button  className="share-btn" onClick={handleShareBtnClick} title='Partager ma liste de course'
                    style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer"
                }}>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_3062_14625)">
                        <path d="M24.4286 0H7.57137C3.38982 0 0 3.38982 0 7.57137V24.4286C0 28.6102 3.38982 32 7.57137 32H24.4286C28.6102 32 32 28.6102 32 24.4286V7.57137C32 3.38982 28.6102 0 24.4286 0Z" fill="white"/>
                        <path d="M25.0784 6.89781L4.80673 14.7011C4.07194 14.9835 4.10638 16.0344 4.85725 16.2694L9.63337 17.762L11.6058 23.951C11.8094 24.5901 12.6154 24.7914 13.0953 24.3222L15.9181 21.5645L21.2675 25.654C21.7535 26.0253 22.4608 25.762 22.5855 25.1634L26.1898 7.84232C26.3238 7.19861 25.6923 6.6613 25.0784 6.89781Z" fill="black"/>
                        <path d="M22.0719 10.3942L10.8434 17.3694C10.6735 17.475 10.5954 17.6801 10.6513 17.8715C10.9774 18.9874 12.0068 22.5925 12.1017 22.8581C12.153 23.0035 12.3658 22.9706 12.3781 22.8236L12.6835 19.5745C12.6934 19.465 12.7439 19.3632 12.8251 19.289C14.7363 17.5339 22.2594 10.6262 22.2594 10.6262C22.4018 10.48 22.2089 10.297 22.0719 10.3935V10.3942Z" fill="white"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_3062_14625">
                        <rect width="32" height="32" fill="white"/>
                        </clipPath>
                        </defs>
                    </svg>
                </button>
                <button  className="close-btn" onClick={onClose} title='Fermer ma liste de course'
                        style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer"
                    }}>
                    <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.5 32C25.6127 32 33 24.8366 33 16C33 7.16344 25.6127 0 16.5 0C7.3873 0 0 7.16344 0 16C0 24.8366 7.3873 32 16.5 32Z" fill="white"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.02844 7.78518C8.41291 7.38869 9.046 7.37895 9.44248 7.76342L16.492 14.5993L23.5414 7.76342C23.9379 7.37895 24.571 7.38869 24.9555 7.78518C25.3399 8.18166 25.3302 8.81475 24.9337 9.19922L17.9284 15.9922L24.9337 22.7852C25.3302 23.1697 25.3399 23.8028 24.9555 24.1993C24.571 24.5958 23.9379 24.6055 23.5414 24.221L16.492 17.3852L9.44248 24.221C9.046 24.6055 8.41291 24.5958 8.02844 24.1993C7.64397 23.8028 7.65371 23.1697 8.05019 22.7852L15.0555 15.9922L8.05019 9.19922C7.65371 8.81475 7.64397 8.18166 8.02844 7.78518Z"
                        fill={clientColor}/>
                    </svg>
                </button>
        </div>
        <div className="modal-body">
            {productHtmls.length > 0 && productHtmls.map((productHtml, index) =>
                <iframe
                    src={productHtml.html_name}
                    key={productHtml.html_name}
                />
            )}
        </div>
    </Modal>
    );
};

export default ShoppingListModal;