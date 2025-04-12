import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import About from './Components/About';
import Contact from './Components/Contact';
import Categories from './Components/Categories';
import Products from './Components/Products';
import Prodeets from './Components/Prodeets';
import Home from './Components/Home';  // Assuming you have a Home component for the homepage
import NotFound from './Components/NotFound'; // This is for handling invalid routes

const routing = (
  <Router>
    <div style={{ textAlign: "center" }}>
      <h3>Welcome to the IKEA-like Store</h3>
      <nav>
        <Link to="/">Home</Link> | 
        <Link to="/Categories">Categories</Link> | 
        <Link to="/Offers">Offers</Link> | 
        <Link to="/About">About Us</Link> | 
        <Link to="/Contact">Contact Us</Link> 
      </nav>
      <hr />
      <Routes>
        {/* Define all routes here */}
        <Route path="/" element={<Home />} />
        <Route path="/Categories" element={<Categories />} />
        <Route path="/Offers" element={<Products />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Products/:categoryId" element={<Products />} />
        <Route path="/Prodeets/:productId" element={<Prodeets />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  </Router>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {routing}
  </React.StrictMode>
);
