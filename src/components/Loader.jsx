import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';
import './Loader.css';

const Loader = ({ onLoadingComplete }) => {
  // Auto complete after animation finishes (~3 seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onLoadingComplete) onLoadingComplete();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <div className="loader-container glass-panel">
      <div className="loader-content">
        {/* Logo */}
        <motion.div 
          className="loader-logo"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Leaf className="brand-icon text-accent" size={40} />
          <span>AgriSense</span>
        </motion.div>

        {/* Custom SVG Plant Animation */}
        <div className="svg-animation-container">
          <svg viewBox="0 0 200 250" width="200" height="250">
            {/* Dirt Mound */}
            <motion.ellipse 
              cx="100" cy="220" rx="70" ry="25" fill="#5D4037"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, ease: "backOut" }}
            />
            {/* Dirt Details */}
            <motion.ellipse cx="70" cy="230" rx="15" ry="5" fill="#4E342E" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} />
            <motion.ellipse cx="130" cy="225" rx="20" ry="8" fill="#4E342E" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} />

            {/* Roots */}
            <motion.path
               d="M 100 215 Q 80 230 70 240 M 100 215 Q 120 235 135 240 M 100 215 Q 100 235 105 245"
               fill="none" stroke="#D7CCC8" strokeWidth="2" strokeLinecap="round"
               initial={{ pathLength: 0, opacity: 0 }}
               animate={{ pathLength: 1, opacity: 1 }}
               transition={{ delay: 0.7, duration: 0.5 }}
            />

            {/* Seed Left Half */}
            <motion.path 
              d="M 100 200 C 85 200, 85 220, 100 220 Z" fill="#8D6E63"
              initial={{ y: -50, opacity: 0, rotate: 0 }}
              animate={{ y: 0, opacity: 1, rotate: -15, x: -5 }}
              transition={{ 
                y: { delay: 0.3, duration: 0.4, type: "spring", bounce: 0.5 }, 
                opacity: { delay: 0.3, duration: 0.1 },
                rotate: { delay: 0.7, duration: 0.3 },
                x: { delay: 0.7, duration: 0.3 }
              }}
            />
            {/* Seed Right Half */}
            <motion.path 
              d="M 100 200 C 115 200, 115 220, 100 220 Z" fill="#795548"
              initial={{ y: -50, opacity: 0, rotate: 0 }}
              animate={{ y: 0, opacity: 1, rotate: 15, x: 5 }}
              transition={{ 
                y: { delay: 0.3, duration: 0.4, type: "spring", bounce: 0.5 }, 
                opacity: { delay: 0.3, duration: 0.1 },
                rotate: { delay: 0.7, duration: 0.3 },
                x: { delay: 0.7, duration: 0.3 }
              }}
            />
            {/* Seed Inner Glow (Green crack) */}
            <motion.path
               d="M 100 200 L 98 210 L 102 215 Z" fill="#00E676"
               initial={{ opacity: 0 }}
               animate={{ opacity: [0, 1, 0] }}
               transition={{ delay: 0.6, duration: 0.3 }}
            />

            {/* Stem */}
            <motion.path 
              d="M 100 215 Q 95 150 100 90" 
              fill="none" stroke="#2E7D32" strokeWidth="6" strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 1.0, duration: 0.8, ease: "easeInOut" }}
            />

            {/* Left Leaf Bottom */}
            <motion.path 
              d="M 98 170 Q 60 180 50 150 Q 80 140 98 170" fill="#4CAF50"
              initial={{ scale: 0, originX: "98px", originY: "170px" }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.5, duration: 0.4, type: "spring" }}
            />
            {/* Right Leaf Bottom */}
            <motion.path 
              d="M 101 150 Q 140 160 150 130 Q 120 120 101 150" fill="#388E3C"
              initial={{ scale: 0, originX: "101px", originY: "150px" }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.7, duration: 0.4, type: "spring" }}
            />
            
            {/* Top Leaves */}
            <motion.path 
              d="M 99 110 Q 70 110 65 80 Q 85 85 99 110" fill="#66BB6A"
              initial={{ scale: 0, originX: "99px", originY: "110px" }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.9, duration: 0.4, type: "spring" }}
            />
            <motion.path 
              d="M 101 100 Q 130 100 135 70 Q 115 75 101 100" fill="#4CAF50"
              initial={{ scale: 0, originX: "101px", originY: "100px" }}
              animate={{ scale: 1 }}
              transition={{ delay: 2.1, duration: 0.4, type: "spring" }}
            />

            {/* Center Top Leaf */}
            <motion.path 
              d="M 100 90 Q 85 65 100 50 Q 115 65 100 90" fill="#81C784"
              initial={{ scale: 0, originX: "100px", originY: "90px" }}
              animate={{ scale: 1 }}
              transition={{ delay: 2.3, duration: 0.4, type: "spring" }}
            />

          </svg>
        </div>

        {/* Text */}
        <motion.div 
          className="loader-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
        >
          Reading live field metrics...
        </motion.div>
      </div>
    </div>
  );
};

export default Loader;
