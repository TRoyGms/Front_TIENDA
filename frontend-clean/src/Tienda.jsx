import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Services from './components/pages/Services';
import Products from './components/pages/Products';

function Tienda() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Services />} />
                <Route path="/services" element={<Services />} />
                <Route path="/products" element={<Products />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Tienda;
