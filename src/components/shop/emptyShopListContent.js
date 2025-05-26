import React from 'react';
import { BsShop } from 'react-icons/bs';

const EmptyShopListContent = ({clientColor}) => {
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
            <div style={styles.icon}>
            <BsShop size={48} color={clientColor} />
            </div>
            <h2 style={styles.title}>Oups</h2>
            <p style={styles.message}>Aucun magasin detecté autour de vous.</p>
        </div>
        </div>
    );
};

export default EmptyShopListContent;