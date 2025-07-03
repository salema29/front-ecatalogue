import React, { useEffect,useState,useContext} from 'react';
import { ShoppingListContext } from '../../store-shopping-list';

const ShoppingListIcon = ({ catalogId, clientColor }) => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const { shoppingList, setShoppingList } = useContext(ShoppingListContext);
    const [nbProduit, setNbProduit] = useState(null);

    useEffect(() => {
        const idListProducts = shoppingList.reduce((acc, item) => {
            if (item.catalogId === catalogId) {
                return acc.concat(item.products.map(p => p.id_produit_resume));
            }
            return acc;
        }, []);

        if (idListProducts.length > 0) {
            fetch(`${API_BASE_URL}/api/shopping-list/`, {
                method: "POST",
                body: JSON.stringify({ ids: idListProducts }),
            })
                .then(response => response.json())
                .then(data => {
                    if (Array.isArray(data) && data.length === 0) {
                        setShoppingList(prevList =>
                            prevList.filter(catalog => catalog.catalogId !== catalogId)
                        );
                        setNbProduit(null);
                    } else {
                        const total = shoppingList
                            .filter(item => item.catalogId === catalogId)
                            .reduce((acc, item) => acc + item.products.length, 0);
                        setNbProduit(total);
                    }
                })
                .catch(error => console.error("Error fetching htmls:", error));
        } else {
            setNbProduit(null);
        }
    }, [shoppingList, catalogId, API_BASE_URL, setShoppingList]);

    const styles = {
        heart: {
            transform: "translate(-11px, 3px)"
        },
        number: {
            position: "absolute",
            transform: nbProduit && nbProduit <= 9 ? "translate(-26px, 7px)" : "translate(-30px, 7px)",
            fontSize: "12px"
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
            <div style={{ position: 'relative' }}>
                {nbProduit > 0 ?
                    (
                        <div style={{ padding: "0px 6px 0px 6px" }}>
                            <div style={{ position: "relative" }}>
                                <svg style={{ position: "absolute" }} width="21" height="26" viewBox="0 0 23 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.98997 26.24C2.47997 26.73 3.14997 27 3.84997 27H19.6C20.3 27 20.96 26.73 21.46 26.24C21.95 25.75 22.23 25.09 22.23 24.4V7.5L15.66 1H3.84997C3.14997 1 2.48997 1.27 1.98997 1.76C1.49997 2.25 1.21997 2.91 1.21997 3.6V4M14.34 1V6.2C14.34 6.89 14.62 7.55 15.11 8.04C15.6 8.53 16.27 8.8 16.97 8.8H22.22M18.28 13.5H15.66M18.16 17.7H12.41M18.16 21.9H9.40997" stroke={clientColor ? clientColor : "#164194"} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <svg style={styles.heart} width="23" height="21" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.2 21.5C12.97 21.65 12.75 21.78 12.49 21.78C12.23 21.78 12 21.66 11.78 21.5C10.51 20.55 1 12.89 1 7C1 5.28 1.66 3.66 2.88 2.45C4.1 1.23 6.22 0.259995 8.4 1.06C10.72 1.92 11.73 4 12.51 5.81C13.36 3.81 15.1 1.45 17.51 1.06C19.37 0.769995 20.91 1.23 22.12 2.45C23.34 3.66 24 5.27 24 7C24 13.03 14.81 20.33 13.21 21.5H13.2Z" fill={clientColor ? clientColor : "#164194"} stroke={clientColor ? clientColor : "#164194"} stroke-linejoin="round" />
                                </svg>
                                <span style={styles.number}>{nbProduit}</span>
                            </div>
                        </div>
                    )
                    :
                    (
                        <div style={{ padding: "0px 6px 0px 6px" }}>
                            <div style={{ position: "relative" }}>
                                <svg style={{ position: "absolute" }} width="21" height="26" viewBox="0 0 23 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.98997 26.24C2.47997 26.73 3.14997 27 3.84997 27H19.6C20.3 27 20.96 26.73 21.46 26.24C21.95 25.75 22.23 25.09 22.23 24.4V7.5L15.66 1H3.84997C3.14997 1 2.48997 1.27 1.98997 1.76C1.49997 2.25 1.21997 2.91 1.21997 3.6V4M14.34 1V6.2C14.34 6.89 14.62 7.55 15.11 8.04C15.6 8.53 16.27 8.8 16.97 8.8H22.22M18.28 13.5H15.66M18.16 17.7H12.41M18.16 21.9H9.40997" stroke={clientColor ? clientColor : "#164194"} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <svg style={styles.heart} width="23" height="21" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.2 21.5C12.97 21.65 12.75 21.78 12.49 21.78C12.23 21.78 12 21.66 11.78 21.5C10.51 20.55 1 12.89 1 7C1 5.28 1.66 3.66 2.88 2.45C4.1 1.23 6.22 0.259995 8.4 1.06C10.72 1.92 11.73 4 12.51 5.81C13.36 3.81 15.1 1.45 17.51 1.06C19.37 0.769995 20.91 1.23 22.12 2.45C23.34 3.66 24 5.27 24 7C24 13.03 14.81 20.33 13.21 21.5H13.2Z" fill={clientColor ? clientColor : "#164194"} stroke={clientColor ? clientColor : "#164194"} stroke-linejoin="round" />
                                </svg>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default ShoppingListIcon;