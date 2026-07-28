import React from 'react';
import { Check, X } from 'lucide-react';
import './Comparison.css';

const Comparison = () => {
  return (
    <section id="comparison" className="section comparison">
      <div className="container">
        <h2>Traditional vs <span>AgriSense AI</span></h2>
        
        <div className="table-responsive glass-panel">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>Traditional Methods</th>
                <th className="highlight-col">AgriSense AI</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Time Required</strong></td>
                <td>3 to 7 Days (Lab Testing)</td>
                <td className="highlight-col">Instant (&lt;2 Seconds)</td>
              </tr>
              <tr>
                <td><strong>Cost</strong></td>
                <td>High (Recurring lab fees)</td>
                <td className="highlight-col">Low (One-time device cost)</td>
              </tr>
              <tr>
                <td><strong>Disease Detection</strong></td>
                <td><X className="text-error" size={20}/> Manual Observation</td>
                <td className="highlight-col"><Check className="text-accent" size={20}/> AI-Powered (YOLOv8)</td>
              </tr>
              <tr>
                <td><strong>Actionable Advice</strong></td>
                <td><X className="text-error" size={20}/> Usually raw data only</td>
                <td className="highlight-col"><Check className="text-accent" size={20}/> Specific Fertilizer & Pesticide Dosage</td>
              </tr>
              <tr>
                <td><strong>Data Logging</strong></td>
                <td><X className="text-error" size={20}/> Paper-based / Manual</td>
                <td className="highlight-col"><Check className="text-accent" size={20}/> Automated SQLite & Cloud Sync</td>
              </tr>
              <tr>
                <td><strong>Portability</strong></td>
                <td><X className="text-error" size={20}/> Fixed Labs</td>
                <td className="highlight-col"><Check className="text-accent" size={20}/> Handheld & Battery Powered</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Comparison;
