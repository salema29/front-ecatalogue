import React, { useContext } from 'react';
import { ShoppingListContext } from '../../../store-shopping-list';
import { BsPlusLg, BsDashLg } from 'react-icons/bs';
import '../../../assets/styles/UpdateCountProduct.css';

function UpdateCountProduct({ id_produit_resume, catalogue_id }) {
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
        <div className="qty-counter">
            <button
                className="qty-counter-btn"
                disabled={currentCount <= 1}
                title={currentCount <= 1 ? "Vous ne pouvez plus diminuer la quantité " : "Diminuer la quantité"}
                onClick={decrement}
                aria-label="Diminuer la quantité"
            >
                <div>
                    <BsDashLg style={{ height: '10px' }} />
                </div>
            </button>

            <div className="qty-counter-value">{currentCount}</div>

            <button
                className="qty-counter-btn"
                title='Augmenter la quantité'
                onClick={increment}
                aria-label="Augmenter la quantité"
            >
                <div>
                    <BsPlusLg style={{ height: '10px' }} />
                </div>
                <div className="qty-counter-plus-bar" />
            </button>
        </div>
    );
}

export default UpdateCountProduct;
