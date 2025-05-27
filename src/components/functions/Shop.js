export const chooseShop = (shoppingList, catalogId, shop) => {
    const existingItemIndex = shoppingList.findIndex(item => item.catalogId === catalogId);
    let updatedList;

    if (existingItemIndex !== -1) {
        updatedList = shoppingList.map((item, index) =>
            index === existingItemIndex
                ? { ...item, shop }
                : item
        );
    } else {
        // Ajoute un nouvel item avec ce catalogId et le shop
        updatedList = [
            ...shoppingList,
            {
                catalogId,
                shop,
                products: []
            }
        ];
    }

    return updatedList;
}

export const getShopByCatalogId = (shoppingList, catalogId) => {
    const item = shoppingList.find(item => item.catalogId === catalogId);
    return item?.shop || null;
};