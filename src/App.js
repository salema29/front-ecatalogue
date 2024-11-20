import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ViewFormatModal from './components/ViewFormatModal';
import Home from './pages/Home'
import Products from './pages/Product'
import MainProduct from './pages/MainProduct'
import Catalog from './pages/Catalog'
import Confidentiality from './components/Confidentiality';
import './App.css'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="view/:idCatalog" element={<ViewFormatModal />} />
                <Route path="products/:idCatalog" element={<Products />} />
                <Route path="catalog/:idCatalog" element={<Catalog />} />
                <Route path="product/:idCatalog" element={<MainProduct />} />
                <Route path="confidentiality-text" element={<Confidentiality />} />
            </Routes>
        </Router>
    );
}

export default App;
