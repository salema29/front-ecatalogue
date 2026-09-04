import React from 'react';
import { BsShop } from 'react-icons/bs';
import useIsMobile from '../functions/useIsMobile';
import EmptyState from '../EmptyState';

const EmptyShopListContent = ({ clientColor }) => {
    const isMobileView = useIsMobile();

    return (
        <EmptyState
            icon={!isMobileView ? <BsShop size={48} color={clientColor} /> : null}
            message="Aucun magasin participant à l'opération près de chez vous"
        />
    );
};

export default EmptyShopListContent;
