import React, {useContext} from 'react';
import { ShoppingListContext } from '../../../store-shopping-list';
import RemoveProductFromListIcon from '../../../assets/icons/remove-product-from-shopping-list.svg'

function RemoveProduct ({id_produit_resume, catalogue_id}) {
    const { shoppingList, setShoppingList } = useContext(ShoppingListContext);
    const removeProduct = () => {
        const updatedList = JSON.parse(JSON.stringify(shoppingList));
        const catalogIndex = updatedList.findIndex(catalog => catalog.catalogId === catalogue_id);
        if (catalogIndex !== -1) {
            const productIndex = updatedList[catalogIndex].products.findIndex(product => product.id_produit_resume === id_produit_resume);
            if (productIndex !== -1) {
                updatedList[catalogIndex].products.splice(productIndex, 1);
                if (updatedList[catalogIndex].products.length === 0) {
                    updatedList.splice(catalogIndex, 1);
                }
                setShoppingList(updatedList);
            }
        }
    };

    return (
        <img
            src={RemoveProductFromListIcon}
            onClick={removeProduct}
            alt="Enlever le produit de la liste"
            title='Enlever le produit de la liste'
        />
    );
};

export default RemoveProduct;