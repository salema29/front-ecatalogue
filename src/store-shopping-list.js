import React, { createContext, useState, useEffect } from 'react';

const ShoppingListContext = createContext({
    shoppingList: [],
    setShoppingList: () => {}
});

const ShoppingListStore = (props) => {
    const [shoppingList, setShoppingList] = useState([]);

    useEffect(() => {
        const storedShoppingList = JSON.parse(localStorage.getItem('shopping-list')) || [];
        setShoppingList(storedShoppingList);
    }, []);

    return (
        <ShoppingListContext.Provider value={{ shoppingList, setShoppingList }}>
            {props.children}
        </ShoppingListContext.Provider>
    );
};

export { ShoppingListContext, ShoppingListStore };