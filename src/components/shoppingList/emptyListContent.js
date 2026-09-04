import React from 'react';
import { BsCart3 } from 'react-icons/bs';
import EmptyState from '../EmptyState';

const EmptyCart = ({ clientColor }) => (
    <EmptyState
        icon={<BsCart3 size={48} color={clientColor} />}
        title="Votre liste de courses est vide"
        message="Veuillez ajouter des produits."
        containerStyle={{ height: '90%', backgroundColor: '#f8f9fa' }}
    />
);

export default EmptyCart;
