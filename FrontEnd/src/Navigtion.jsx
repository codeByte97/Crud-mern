import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import AddProduct from './Adddata';
function Navbar() {
    return (
        <>
            
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<App />}></Route>
                    <Route path="/AddProduct" element={<AddProduct />} ></Route>F
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default Navbar;