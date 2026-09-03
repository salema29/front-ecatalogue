import React from 'react';
import { BsShop } from 'react-icons/bs';
import useIsMobile from '../functions/useIsMobile';

const EmptyShopListContent = ({clientColor}) => {
    const isMobileView = useIsMobile();

    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            margin: 0,
            fontFamily: 'Arial, sans-serif'
        },
        card: {
            textAlign: 'center',
            padding: '2rem',
            borderRadius: '8px',
            backgroundColor: 'white',
            maxWidth: '500px'
        },
        icon: {
            fontSize: '48px',
            color: '#6c757d',
            marginBottom: '1rem'
        },
        title: {
            color: '#333',
            marginBottom: '1rem',
            fontWeight: '500',
            fontSize: '1.3rem'
        },
        message: {
            color: '#6c757d',
            fontSize: '18px',
            lineHeight: 1.5,
            marginBottom: '1.5rem'
        }
    };

    return (
        <div style={styles.container}>
        <div style={styles.card}>
            {!isMobileView && <div style={styles.icon}>
            <BsShop size={48} color={clientColor} />
            </div>}
            <p style={styles.message}>Aucun magasin participant à l'opération près de chez vous</p>
        </div>
        </div>
    );
};

export default EmptyShopListContent;