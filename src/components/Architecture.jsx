import React from 'react';
import { Layers, Database, Cpu, Monitor } from 'lucide-react';
import './Architecture.css';

const Architecture = () => {
  return (
    <section id="architecture" className="section architecture">
      <div className="container">
        <h2>System <span>Architecture</span></h2>
        
        <div className="arch-flow">
          {/* Layer 1 */}
          <div className="arch-layer glass-panel">
            <div className="layer-header">
              <Layers className="text-accent" />
              <h3>1. Input Layer</h3>
            </div>
            <p>Collects raw field data using Industrial Sensors (NPK, pH, Moisture, etc.) and Leaf Images via the 12MP Camera.</p>
          </div>
          
          <div className="arch-arrow">↓</div>
          
          {/* Layer 2 */}
          <div className="arch-layer glass-panel">
            <div className="layer-header">
              <Cpu className="text-accent" />
              <h3>2. Processing Layer</h3>
            </div>
            <p>Raspberry Pi acts as the brain, reading sensor data via RS485 converter and preparing images via OpenCV.</p>
          </div>
          
          <div className="arch-arrow">↓</div>
          
          {/* Layer 3 */}
          <div className="arch-layer glass-panel">
            <div className="layer-header">
              <Database className="text-accent" />
              <h3>3. AI Decision Layer</h3>
            </div>
            <div className="pipeline-grid">
              <div className="pipeline">
                <h4>Pipeline 1: Soil Analysis</h4>
                <span>Sensor Values → Analysis → Recommendation</span>
              </div>
              <div className="pipeline">
                <h4>Pipeline 2: Disease Detection</h4>
                <span>Leaf Image → YOLOv8 Model → Disease Prediction</span>
              </div>
            </div>
          </div>
          
          <div className="arch-arrow">↓</div>
          
          {/* Layer 4 */}
          <div className="arch-layer glass-panel">
            <div className="layer-header">
              <Monitor className="text-accent" />
              <h3>4. Output Layer</h3>
            </div>
            <p>Results merged and displayed on the 7-inch Touchscreen, stored in local SQLite, and exported as PDF reports.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Architecture;
