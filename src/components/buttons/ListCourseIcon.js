import React from 'react';
import { BsListUl  } from 'react-icons/bs';

const ListCourseIcon = ({ catalogId, shoppingList, clientColor }) => {
    const nbProduit = shoppingList
        .filter(item => item.catalogId === catalogId)
        .reduce((acc, item) => acc + item.products.length, 0);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
            <div style={{ position: 'relative' }}>
                {nbProduit > 0 ?
                    (
                        <div style={{padding : "0px 6px 0px 6px"}}>
                            <div style={{
                                backgroundColor: clientColor,
                                width: '20px',
                                height: '23px',
                                borderRadius: '2px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                cursor: 'pointer'
                            }}>
                                <BsListUl size={24} color="white" />
                            </div>
                            <div style={{
                                position: 'absolute',
                                top: '-11px',
                                right: '-7px',
                                backgroundColor: 'white',
                                color: '#4A4A4A',
                                borderRadius: '50%',
                                width: '20px',
                                height: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '12px',
                                fontWeight: 'bold',
                                border: '1px solid #4A4A4A'
                            }}>
                                {nbProduit}
                            </div>
                        </div>
                    )
                    :
                    (
                        <div >
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="16" cy="16" r="16" fill="white" />
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M19.2038 10.4429C19.2038 10.5883 19.3216 10.7055 19.4665 10.7055H24.9491V25.0236C24.9491 26.245 23.9589 27.2353 22.7375 27.2353H9.21164C7.99026 27.2353 7 26.245 7 25.0236V7.39742C7 6.07541 8.07541 5 9.39742 5H19.2038V10.4429ZM19.7059 10.2941H25L19.7059 5V10.2941Z"
                                    fill={clientColor}
                                />
                                <path d="M13 13H18" stroke="white" strokeWidth="1.90476" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M13.3334 17H22" stroke="white" strokeWidth="1.90476" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M13.3334 21H22" stroke="white" strokeWidth="1.90476" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M10 13H10.0058" stroke="white" strokeWidth="1.90476" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M10 17H10.0058" stroke="white" strokeWidth="1.90476" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M10 21H10.0058" stroke="white" strokeWidth="1.90476" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default ListCourseIcon;