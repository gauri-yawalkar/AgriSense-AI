import React, { useState } from 'react';
import { ArrowRight, Activity, X } from 'lucide-react';
import RoverSimulation from './RoverSimulation';
import ErrorBoundary from './ErrorBoundary';
import './Hero.css';

const Hero = () => {
  const [showSimulation, setShowSimulation] = useState(false);
  return (
    <section className="hero">
      <div className="hero-background">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>
      
      <div className="container hero-content">
        <div className="hero-badge">
          <Activity size={16} className="badge-icon" />
          <span>{'Intelligent Soil Analysis & Crop Disease Detection'}</span>
        </div>
        
        <h1 className="hero-title">
          {'Welcome to '}<span className="text-gradient">AgriSense</span>
        </h1>
        
        <p className="hero-tagline">
          {'Empowering farmers with real-time, data-driven decisions directly in the field. Stop guessing, start knowing.'}
        </p>
        
        <div className="hero-cta">
          <a href="#overview" className="btn btn-primary">
            {'Explore the Project'} <ArrowRight size={18} />
          </a>
          <button onClick={() => setShowSimulation(true)} className="btn btn-secondary">
            {'Design'}
          </button>
        </div>
      </div>

      {/* 3D Simulation Modal */}
      <div className={`simulation-modal-overlay ${showSimulation ? 'active' : ''}`}>
        <div className="simulation-modal-content">
          <button className="simulation-close-btn" onClick={() => setShowSimulation(false)}>
            <X size={24} />
          </button>
          {showSimulation && (
            <div className="simulations-container">
              <div className="simulation-window">
                <ErrorBoundary>
                  <RoverSimulation url="/soil prototype.glb" />
                </ErrorBoundary>
              </div>
              <div className="simulation-window">
                <ErrorBoundary>
                  <RoverSimulation url="/soil prototype part 2.glb" />
                </ErrorBoundary>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
