import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Technology from './pages/Technology';
import Performance from './pages/Performance';
import References from './pages/References';
import AboutTeam from './pages/AboutTeam';
import ContactUs from './pages/ContactUs';
import DiseaseDetection from './pages/DiseaseDetection';
import Loader from './components/Loader';
import AnimatedBackground from './components/AnimatedBackground';
import './App.css';

function MainRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/technology" element={<Technology />} />
        <Route path="/performance" element={<Performance />} />
        <Route path="/team" element={<AboutTeam />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/references" element={<References />} />
        <Route path="/detection" element={<DiseaseDetection />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <Router basename="/agrisense-ai">
      <AnimatePresence>
        {isLoading ? (
          <motion.div
            key="loader"
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            style={{ position: 'fixed', inset: 0, zIndex: 9999 }}
          >
            <Loader onLoadingComplete={handleLoadingComplete} />
          </motion.div>
        ) : (
          <motion.div
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="app-container"
          >
            <AnimatedBackground />
            <Navbar />
            <main className="main-content">
              <MainRoutes />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </Router>
  );
}

export default App;
