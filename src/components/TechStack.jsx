import React from 'react';
import { Database, Monitor, Cpu, Server } from 'lucide-react';
import './TechStack.css';

const TechStack = () => {
  return (
    <section id="tech-stack" className="section tech-stack">
      <div className="container">
        <h2>{'Technology'} <span>{'Stack'}</span></h2>
        
        <div className="stack-grid">
          {/* Hardware */}
          <div className="glass-panel stack-category">
            <div className="stack-header">
              <Cpu className="text-accent" />
              <h3>{'Hardware'}</h3>
            </div>
            <div className="stack-items">
              <span className="stack-badge">{'Raspberry Pi 5'}</span>
              <span className="stack-badge">{'7-inch Touchscreen'}</span>
              <span className="stack-badge">{'12MP Camera Module'}</span>
              <span className="stack-badge">{'Industrial NPK Sensor'}</span>
              <span className="stack-badge">{'pH, Moisture, Temp Sensors'}</span>
              <span className="stack-badge">{'EC & TDS Sensors'}</span>
              <span className="stack-badge">{'12V Lithium Battery'}</span>
              <span className="stack-badge">{'Buck Converter'}</span>
              <span className="stack-badge">{'RS485 USB Converter'}</span>
            </div>
          </div>
          
          {/* Software */}
          <div className="glass-panel stack-category">
            <div className="stack-header">
              <Monitor className="text-accent" />
              <h3>{'Software & Frameworks'}</h3>
            </div>
            <div className="stack-items">
              <span className="stack-badge">{'React'}</span>
              <span className="stack-badge">{'Vite'}</span>
              <span className="stack-badge">{'Node.js'}</span>
              <span className="stack-badge">{'i18next (Multilingual)'}</span>
              <span className="stack-badge">{'Lucide React (Icons)'}</span>
            </div>
          </div>
          
          {/* Database & Comm */}
          <div className="glass-panel stack-category">
            <div className="stack-header">
              <Database className="text-accent" />
              <h3>{'Data & Communication'}</h3>
            </div>
            <div className="stack-items">
              <span className="stack-badge">{'SQLite (Local DB)'}</span>
              <span className="stack-badge">{'Modbus RTU over RS485'}</span>
              <span className="stack-badge">{'PDF Report Generation'}</span>
            </div>
          </div>
          
          {/* AI */}
          <div className="glass-panel stack-category">
            <div className="stack-header">
              <Server className="text-accent" />
              <h3>{'AI & Models'}</h3>
            </div>
            <div className="stack-items">
              <span className="stack-badge ai-badge">{'YOLOv8 (Object Detection)'}</span>
              <span className="stack-badge ai-badge">{'Custom Recommendation Engine'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
