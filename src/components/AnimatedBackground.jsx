import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './AnimatedBackground.css';

// SVG paths for small leaves and seeds
const LEAF_PATH = "M50 90 Q10 70 30 20 Q70 10 90 40 Q80 80 50 90 Z";
const SEED_PATH = "M50 10 C30 10 20 40 50 90 C80 40 70 10 50 10 Z";
const SMALL_LEAF_PATH = "M20 80 C 10 60, 40 10, 80 20 C 90 40, 60 90, 20 80 Z";

const AnimatedBackground = () => {
  const { scrollY } = useScroll();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Parallax transforms for the large background corner elements
  const y1 = useTransform(scrollY, [0, 3000], [0, -400]);
  const y2 = useTransform(scrollY, [0, 3000], [0, -200]);
  const y3 = useTransform(scrollY, [0, 3000], [0, -600]);

  // Generate floating elements
  const floatingElements = React.useMemo(() => {
    if (!isClient) return [];
    
    return Array.from({ length: 35 }).map((_, i) => {
      const isSeed = Math.random() > 0.6;
      const path = isSeed ? SEED_PATH : (Math.random() > 0.5 ? LEAF_PATH : SMALL_LEAF_PATH);
      
      // Randomize properties
      const size = Math.random() * 20 + 10; // 10px to 30px
      const startX = Math.random() * 100; // vw
      const startY = Math.random() * 100; // vh
      const duration = Math.random() * 30 + 30; // 30s to 60s for slow movement
      const delay = Math.random() * -60; // negative delay so they are already moving
      const opacity = Math.random() * 0.1 + 0.1; // 0.1 to 0.2 (10% to 20%)
      const rotate = Math.random() * 360;
      
      // Wind movement: drift around
      const xOffset = Math.random() * 200 + 100;
      const yOffset = Math.random() * 200 - 100;
      const rotationOffset = Math.random() * 360 - 180;

      return {
        id: i,
        path,
        size,
        startX: `${startX}vw`,
        startY: `${startY}vh`,
        duration,
        delay,
        opacity,
        rotate,
        xOffset,
        yOffset,
        rotationOffset
      };
    });
  }, [isClient]);

  return (
    <div className="animated-background">
      {/* Soft overlay gradient */}
      <div className="bg-gradient-overlay"></div>

      {/* Large Parallax Elements */}
      <motion.div className="botanical-layer layer-1" style={{ y: y1 }}>
        <svg viewBox="0 0 100 100" className="svg-leaf leaf-left">
          <path d={LEAF_PATH} fill="currentColor" />
        </svg>
      </motion.div>

      <motion.div className="botanical-layer layer-2" style={{ y: y2 }}>
        <svg viewBox="0 0 100 100" className="svg-seed seed-right">
          <path d={SEED_PATH} fill="currentColor" />
        </svg>
      </motion.div>

      <motion.div className="botanical-layer layer-3" style={{ y: y3 }}>
        <svg viewBox="0 0 100 100" className="svg-leaf leaf-bottom-left">
           <path d={SMALL_LEAF_PATH} fill="currentColor" />
        </svg>
      </motion.div>

      {/* Floating Leaves and Seeds */}
      <div className="floating-elements-container">
        {floatingElements.map((el) => (
          <motion.div
            key={el.id}
            className="floating-element"
            style={{
              position: 'absolute',
              width: el.size,
              height: el.size,
              left: el.startX,
              top: el.startY,
              opacity: el.opacity,
              color: '#16a34a',
            }}
            initial={{
               rotate: el.rotate,
               x: 0,
               y: 0
            }}
            animate={{
              x: [0, el.xOffset, 0],
              y: [0, el.yOffset, 0],
              rotate: [el.rotate, el.rotate + el.rotationOffset, el.rotate],
            }}
            transition={{
              duration: el.duration,
              delay: el.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <svg viewBox="0 0 100 100" width="100%" height="100%">
              <path d={el.path} fill="currentColor" />
            </svg>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedBackground;
