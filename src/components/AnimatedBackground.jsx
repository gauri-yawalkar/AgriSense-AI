import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './AnimatedBackground.css';

const AnimatedBackground = () => {
  const { scrollY } = useScroll();
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Parallax transforms for the botanical elements
  const y1 = useTransform(scrollY, [0, 3000], [0, -400]);
  const y2 = useTransform(scrollY, [0, 3000], [0, -200]);
  const y3 = useTransform(scrollY, [0, 3000], [0, -600]);

  // Generate random particles
  const particles = Array.from({ length: 25 }).map((_, i) => ({
    id: i,
    size: Math.random() * 6 + 2, // 2px to 8px
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    duration: Math.random() * 20 + 15, // 15s to 35s
    delay: Math.random() * 10,
  }));

  return (
    <div className="animated-background">
      {/* Soft overlay gradient */}
      <div className="bg-gradient-overlay"></div>

      {/* Parallax SVG Elements */}
      <motion.div className="botanical-layer layer-1" style={{ y: y1 }}>
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="svg-leaf leaf-left">
          <path d="M50 90 Q10 70 30 20 Q70 10 90 40 Q80 80 50 90 Z" fill="currentColor" />
        </svg>
      </motion.div>

      <motion.div className="botanical-layer layer-2" style={{ y: y2 }}>
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="svg-seed seed-right">
          <path d="M50 10 C30 10 20 40 50 90 C80 40 70 10 50 10 Z" fill="currentColor" />
        </svg>
      </motion.div>

      <motion.div className="botanical-layer layer-3" style={{ y: y3 }}>
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="svg-leaf leaf-bottom-left">
           <path d="M20 80 C 10 60, 40 10, 80 20 C 90 40, 60 90, 20 80 Z" fill="currentColor" />
        </svg>
      </motion.div>

      <motion.div className="botanical-layer layer-4" style={{ y: y1 }}>
         <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="svg-branch branch-top-right">
            <path d="M10 90 Q 50 50 90 10 M 50 50 Q 70 60 80 90 M 30 70 Q 10 50 20 20" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
         </svg>
      </motion.div>

      {/* Floating Particles (Dust/Pollen) */}
      <div className="particles-container">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="particle"
            style={{
              width: p.size,
              height: p.size,
              left: p.left,
              top: p.top,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedBackground;
