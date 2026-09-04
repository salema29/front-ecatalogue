import React from 'react';
import ProductItem from '../ProductItem';
import LoadingSpinner from '../spinner/LoadingSpinner';

// Resultats d'une recherche produit : spinner, grille de ProductItem, ou
// message "Aucun produit trouve". Partage entre ProductList et ProductDetail.
const ProductSearchResults = ({ loading, results, catalogId, clientColor }) => (
    <div className="product-list-container">
        {loading ? (
            <LoadingSpinner />
        ) : results.length > 0 ? (
            <div className="grid-container">
                {results.map((product, index) => (
                    <ProductItem
                        key={product.id_produit || index}
                        product={product}
                        index={index}
                        categoryId={product.product_categorie_id}
                        catalogId={catalogId}
                        showListCourse="t"
                        clientColor={clientColor}
                    />
                ))}
            </div>
        ) : (
            <div className="empty-search-result">
                <p style={{ color: clientColor }}>Aucun produit trouvé</p>
            </div>
        )}
    </div>
);

export default ProductSearchResults;
