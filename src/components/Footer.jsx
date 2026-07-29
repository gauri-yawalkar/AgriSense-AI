import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="agrisense-footer">
      <div className="footer-top-container">
        {/* Left Column: Brand & Description */}
        <div className="footer-brand-col">
          <h2 className="footer-title">
            <span className="green-dot">●</span> AgriSense
          </h2>
          <p className="footer-description">
            {'An advanced agricultural project — hardware, firmware, and AI, built for farmers.'}
          </p>
        </div>

        {/* Middle Column: Contact */}
        <div className="footer-contact-col">
          <h4 className="footer-heading">{'GET IN TOUCH'}</h4>
          <ul className="footer-links">
            <li><a href="mailto:robodroneclub@gmail.com">robodroneclub@gmail.com</a></li>
            <li><a href="https://github.com/AgriSense" target="_blank" rel="noopener noreferrer">github.com/AgriSense</a></li>
            <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          </ul>
        </div>

        {/* Right Column: Navigation */}
        <div className="footer-nav-col">
          <h4 className="footer-heading">{'NAVIGATE'}</h4>
          <div className="footer-nav-grid">
            <ul className="footer-links">
              <li><Link to="/">{'Home'}</Link></li>
              <li><Link to="/technology">{'Technology'}</Link></li>
              <li><Link to="/performance">{'Performance'}</Link></li>
            </ul>
            <ul className="footer-links">
              <li><Link to="/team">{'Team'}</Link></li>
              <li><Link to="/references">{'References'}</Link></li>
              <li><Link to="/contact">{'Contact'}</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & License */}
      <div className="footer-bottom-bar">
        <div className="footer-bottom-left">
          © 2026 AgriSense Team · MIT License · v1.0.0
        </div>
        <div className="footer-bottom-right">
          Built with open hardware & open source.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
