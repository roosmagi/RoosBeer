import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Home from './pages/Home.jsx';
import Navbar from '../components/Navbar.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AddBeer from './pages/AddBeer.jsx';
import About from './pages/About.jsx';
import Shop from './pages/Shop.jsx';
import BeerDetail from './pages/Beer.jsx';
import Cart from './pages/Cart.jsx';

export default function App() {
  return (
    <Router>
      <div className="app">
        <Navbar sticky="top" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-beer" element={<AddBeer />} />
          <Route path='/About' element={<About />} />
          <Route path='/Shop' element={<Shop />} />
          <Route path="/beerDetail/:id" element={<BeerDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </Router>
  );
}
