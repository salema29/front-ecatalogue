import React from 'react';
import { BsListUl  } from 'react-icons/bs';

const ListCourseIcon = () => {
    const nbProduit = 99;
    const clientColor = '#5b9a9a';

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
            <div style={{ position: 'relative' }}>
                <div style={{
                    backgroundColor: clientColor,
                    width: '32px',
                    height: '32px',
                    borderRadius: '4px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <BsListUl  size={24} color="white" />
                </div>

                {nbProduit > 0 && (
                    <div style={{
                        position: 'absolute',
                        top: '-8px',
                        right: '-8px',
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
                )}
            </div>
        </div>
    );
};

export default ListCourseIcon;