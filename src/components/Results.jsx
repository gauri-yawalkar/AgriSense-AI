import React from 'react';
import './Results.css';

const Results = () => {
  return (
    <section id="results" className="section results">
      <div className="container">
        <h2>{'Prototype &'} <span>{'Results'}</span></h2>
        
        <div className="results-grid">
          <div className="glass-panel result-card">
            <div className="score-circle">
              <span className="score-value">94%</span>
              <span className="score-label">{'YOLOv8 Accuracy'}</span>
            </div>
            <h3>{'Disease Detection'}</h3>
            <p>{'High confidence across 15+ common plant diseases (e.g. Late Blight, Leaf Curl).'}</p>
          </div>
          
          <div className="glass-panel result-card">
            <div className="score-circle">
              <span className="score-value">{'Quick'}</span>
              <span className="score-label">{'Response'}</span>
            </div>
            <h3>{'Real-Time Advice'}</h3>
            <p>{'From sensor insertion to fertilizer and pesticide recommendation on the dashboard.'}</p>
          </div>
          
          <div className="glass-panel result-card">
            <div className="score-circle">
              <span className="score-value">91/100</span>
              <span className="score-label">{'Soil Health Score'}</span>
            </div>
            <h3>{'Holistic Assessment'}</h3>
            <p>{'A unified score derived from NPK, pH, Moisture, EC, and Temp for easy understanding.'}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Results;
