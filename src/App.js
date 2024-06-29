import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from './components/pages/Home';
import Catalog from './components/pages/Catalog';
import Liquor from "./components/pages/Liquor";
import GiftBox from "./components/pages/GiftBox";
import ContactUs from "./components/pages/ContactUs";

const App = () => {
    return (

        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:item" element={<Liquor />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/gift-boxes" element={<GiftBox />} />
            <Route path="/contact-us" element={<ContactUs />} />
        </Routes>

    );
}

export default App;
