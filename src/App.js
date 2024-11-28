import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import ViewFormatModal from './components/ViewFormatModal';
import Home from './pages/LandingPage';
import ProductDetails from './pages/ProductDetails';
import CatalogOverview from './pages/CatalogOverview';
import ProductsResume from './pages/ProductsResume';
import Confidentiality from './components/policies/PrivacyPolicy';
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} /> {/* Landing page */}
                <Route path="view/:catalogId" element={<ViewFormatModal />} /> {/* Modal to view details */}
                <Route path="products-resume/:catalogId/:categoryId" element={<ProductsResume />} /> {/* Product resume view */}
                <Route path="catalog/:catalogId" element={<CatalogOverview />} /> {/* Catalog overview */}
                <Route path="product/:catalogId" element={<ProductDetails />} /> {/* Individual product details */}
                <Route path="confidentiality" element={<Confidentiality />} /> {/* Confidentiality text */}
            </Routes>
        </Router>
    );
}

export default App;
