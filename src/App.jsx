import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Technology from './pages/Technology';
import Performance from './pages/Performance';
import Docs from './pages/Docs';
import AboutTeam from './pages/AboutTeam';
import ContactUs from './pages/ContactUs';
import DiseaseDetection from './pages/DiseaseDetection';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/technology" element={<Technology />} />
            <Route path="/performance" element={<Performance />} />
            <Route path="/disease-detection" element={<DiseaseDetection />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/team" element={<AboutTeam />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
