import React from 'react';
import { ArrowRight, Activity } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-background">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>
      
      <div className="container hero-content">
        <div className="hero-badge">
          <Activity size={16} className="badge-icon" />
          <span>Intelligent Soil Analysis & Crop Disease Detection</span>
        </div>
        
        <h1 className="hero-title">
          Welcome to <span className="text-gradient">AgriSense AI</span>
        </h1>
        
        <p className="hero-tagline">
          Empowering farmers with real-time, data-driven decisions directly in the field. 
          Stop guessing, start knowing.
        </p>
        
        <div className="hero-cta">
          <a href="#overview" className="btn btn-primary">
            Explore the Project <ArrowRight size={18} />
          </a>
          <a href="#demo" className="btn btn-secondary">
            Watch Demo
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
