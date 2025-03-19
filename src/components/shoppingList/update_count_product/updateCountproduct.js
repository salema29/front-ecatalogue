import React, {useContext} from 'react';
import { ShoppingListContext } from '../../../store-shopping-list';

function UpdateCountProduct ( {id_produit_resume, catalogue_id} ) {
    const { shoppingList, setShoppingList } = useContext(ShoppingListContext);

    const updateProductCount = (increment) => {
        const updatedList = JSON.parse(JSON.stringify(shoppingList));
        const catalogIndex = updatedList.findIndex(catalog => catalog.catalogId === catalogue_id);

        if (catalogIndex !== -1) {
            const productIndex = updatedList[catalogIndex].products.findIndex(product => product.id_produit_resume === id_produit_resume );
            if (productIndex !== -1) {
                const product = updatedList[catalogIndex].products[productIndex];
                if (increment) {
                    product.count = (product.count || 0) + 1;
                } else {
                    const newCount = Math.max(0, (product.count || 0) - 1);
                    if (newCount === 0) {
                        // Remove the product from the array if count becomes 0
                        updatedList[catalogIndex].products.splice(productIndex, 1);

                        // If the catalog has no more products, remove the catalog too
                        if (updatedList[catalogIndex].products.length === 0) {
                            updatedList.splice(catalogIndex, 1);
                        }
                    } else {
                        product.count = newCount;
                    }
                }
                setShoppingList(updatedList);
            }
        }
    };

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
        updateProductCount(false);
    };

    const increment = () => {
        updateProductCount(true);
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
                    cursor: 'pointer',
                    outline: 'none',
                    padding: 0,
                    cursor: currentCount <= 1 ? "not-allowed" : "pointer",
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

export default UpdateCountProduct;