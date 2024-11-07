import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CarouselComponent from './components/Carousel';
import ViewFormatModal from './components/ViewFormatModal'; // Adjust the path as necessary
import Home from './pages/Home'
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home  />} />
                <Route path="blog/:id" element={<ViewFormatModal />} />
            </Routes>
        </Router>
    );
}

export default App;
