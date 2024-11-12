import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ViewFormatModal from './components/ViewFormatModal';
import Home from './pages/Home'
import Products from './pages/Product'
import Catalog from './pages/Catalog'
import Confidentiality from './components/Confidentiality';
import './App.css'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="view/:id" element={<ViewFormatModal />} />
                <Route path="products/:id" element={<Products />} />
                <Route path="catalog/:id" element={<Catalog />} />
                <Route path="confidentiality-text" element={<Confidentiality />} />
            </Routes>
        </Router>
    );
}

export default App;
