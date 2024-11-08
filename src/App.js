import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CarouselComponent from './components/Carousel';
import ViewFormatModal from './components/ViewFormatModal';
import Home from './pages/Home'
import Products from './pages/Product'
import Catalog from './pages/Catalog'
import './App.css'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="blog/:id" element={<ViewFormatModal />} />
                <Route path="products/:id" element={<Products />} />
                <Route path="catalog/:id" element={<Catalog />} />
            </Routes>
        </Router>
    );
}

export default App;
