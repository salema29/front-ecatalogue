import React, {useContext} from 'react';
import { ShoppingListContext } from '../../../store-shopping-list';
import { BsPlusLg, BsDashLg } from 'react-icons/bs';

function UpdateCountProduct ( {id_produit_resume, catalogue_id} ) {
    const { shoppingList, changeProductCount } = useContext(ShoppingListContext);

    const getCurrentCount = () => {
        for (const catalog of shoppingList) {
            if (catalog.catalogId === catalogue_id) {
                const product = catalog.products.find(p => p.id_produit_resume === id_produit_resume);
                return product ? (product.count || 0) : 0;
            }
        }
        return 0;
    };

    const currentCount = getCurrentCount();

    const decrement = () => {
        changeProductCount(catalogue_id, id_produit_resume, -1);
    };

    const increment = () => {
        changeProductCount(catalogue_id, id_produit_resume, 1);
    };

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
                disabled={currentCount <= 1 }
                title={currentCount <= 1 ? "Vous ne pouvez plus diminuer la quantité " : "Diminuer la quantité"}
                onClick={decrement}
                style={{
                    width: '29px',
                    height: '29px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    padding: 0,
                    cursor: currentCount <= 1 ? "not-allowed" : "pointer",
                }}
                aria-label="Diminuer la quantité"
            >
                <div>
                    <BsDashLg style={{ height: '10px' }} />
                </div>
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
                {currentCount}
            </div>

        <button
            title='Augmenter la quantité'
            onClick={increment}
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
        <div>
            <BsPlusLg style={{ height: '10px' }}  />
        </div>
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

export default UpdateCountProduct;
