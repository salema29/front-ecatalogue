import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CarouselComponent from './components/Carousel';
import ViewFormatModal from './components/ViewFormatModal'; // Adjust the path as necessary

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<CarouselComponent  />} />
                <Route path="blog/:id" element={<ViewFormatModal />} />
            </Routes>
        </Router>
    );
}

export default App;
