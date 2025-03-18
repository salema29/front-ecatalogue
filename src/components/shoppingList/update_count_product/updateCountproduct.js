import React from 'react';

const updateCountProduct = () => {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '72px',
                height: '29px',
                backgroundColor: "white",
                borderRadius: '14px',
                border: `1px solid black`,
                overflow: 'hidden',
                position: 'relative'
            }}
        >
            <button
                // onClick={handleDecrement}
                style={{
                    width: '29px',
                    height: '29px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    outline: 'none',
                    padding: 0
                }}
                aria-label="Diminuer la quantité"
            >
                <div
                    style={{
                        width: '10px',
                        height: '1.5px',
                        backgroundColor: "black"
                    }}
                />
            </button>

            <div
                style={{
                fontFamily: 'Arial, sans-serif',
                fontSize: '14px',
                color: "black",
                textAlign: 'center',
                userSelect: 'none'
                }}
            >
                12
            </div>

        <button
            // onClick={handleIncrement}
            style={{
                width: '29px',
                height: '29px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                outline: 'none',
                padding: 0,
                position: 'relative'
            }}
            aria-label="Augmenter la quantité"
        >
        <div
            style={{
            width: '10px',
            height: '1.5px',
            backgroundColor: "black"
            }}
        />
        <div
            style={{
            width: '1.5px',
            height: '10px',
            backgroundColor: "black",
            position: 'absolute'
            }}
        />
        </button>
    </div>
    );
};

export default updateCountProduct;