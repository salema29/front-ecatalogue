import React, { useContext } from 'react';
import { ShoppingListContext } from '../../../store-shopping-list';
import RemoveProductFromListIcon from '../../../assets/icons/remove-product-from-shopping-list.svg'

function RemoveProduct ({id_produit_resume, catalogue_id}) {
    const { removeProductByResumeId } = useContext(ShoppingListContext);

    const removeProduct = () => {
        removeProductByResumeId(catalogue_id, id_produit_resume);
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
