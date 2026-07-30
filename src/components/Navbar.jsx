import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Leaf, Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="navbar">
      <div className="container nav-container">
        <NavLink to="/" className="nav-brand">
          <Leaf className="brand-icon" />
          <span>AgriSense</span>
        </NavLink>

        <div className={`nav-links ${isOpen ? 'open' : ''}`}>
          <NavLink to="/" onClick={() => setIsOpen(false)}>{'Home'}</NavLink>
          <NavLink to="/technology" onClick={() => setIsOpen(false)}>{'Technology'}</NavLink>
          <NavLink to="/performance" onClick={() => setIsOpen(false)}>{'Progress'}</NavLink>
          <NavLink to="/team" onClick={() => setIsOpen(false)}>{'Team'}</NavLink>
          <NavLink to="/contact" onClick={() => setIsOpen(false)}>{'Contact'}</NavLink>
          <NavLink to="/detection" className="cta-button" onClick={() => setIsOpen(false)}>{'View Demo'}</NavLink>
        </div>

        <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
