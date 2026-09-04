import React from 'react';

// Carte "etat vide" centree (liste de courses vide, aucun magasin trouve, ...).
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        margin: 0,
        fontFamily: 'Arial, sans-serif',
    },
    card: {
        textAlign: 'center',
        padding: '2rem',
        borderRadius: '8px',
        backgroundColor: 'white',
        maxWidth: '500px',
    },
    icon: {
        fontSize: '48px',
        color: '#6c757d',
        marginBottom: '1rem',
    },
    title: {
        color: '#333',
        marginBottom: '1rem',
        fontWeight: '500',
        fontSize: '1.3rem',
    },
    message: {
        color: '#6c757d',
        fontSize: '18px',
        lineHeight: 1.5,
        marginBottom: '1.5rem',
    },
};

const EmptyState = ({ icon, title, message, containerStyle }) => (
    <div style={{ ...styles.container, ...containerStyle }}>
        <div style={styles.card}>
            {icon && <div style={styles.icon}>{icon}</div>}
            {title && <h2 style={styles.title}>{title}</h2>}
            {message && <p style={styles.message}>{message}</p>}
        </div>
    </div>
);

export default EmptyState;
