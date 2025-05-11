import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import ViewFormatModal from './components/ViewFormatModal';
import Home from './pages/LandingPage';
import ProductDetail from './pages/ProductDetail';
import CatalogOverview from './pages/CatalogOverview';
import ProductList from './pages/ProductList';
import Confidentiality from './components/policies/PrivacyPolicy';
import { SearchProvider } from './components/search_bar/SearchContext';

function App() {
    useEffect(() => {
        // Ajout dynamique du lien CSS
        const fontsPath = `${process.env.REACT_APP_API_BASE_URL}/public/css/fontsuploaded.css`;
        const linkElement = document.createElement("link");
        linkElement.rel = "stylesheet";
        linkElement.href = fontsPath;
        document.head.appendChild(linkElement);

        // Nettoyage si nécessaire lors du démontage du composant
        return () => {
            document.head.removeChild(linkElement);
        };
    }, []);

    return (
        <SearchProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} /> {/* Landing page */}
                    <Route path="view/:catalogId" element={<ViewFormatModal />} /> {/* Modal to view details */}
                    <Route path="product-list/:catalogId/:categoryId" element={<ProductList />} /> {/* Product resume view */}
                    <Route path="catalogue/:catalogId" element={<CatalogOverview />} /> {/* Catalog overview */}
                    <Route path="product/:catalogId/:productId/:categoryId/:id_produit_resume" element={<ProductDetail />} /> {/* Individual product details */}
                    <Route path="confidentiality" element={<Confidentiality />} /> {/* Confidentiality text */}
                </Routes>
            </Router>
        </SearchProvider>
    );
}

export default App;
