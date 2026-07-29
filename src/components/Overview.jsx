import React from 'react';
import { Target, AlertTriangle, Lightbulb, Users, LineChart } from 'lucide-react';
import './Overview.css';

const Overview = () => {
  return (
    <section id="overview" className="section overview">
      <div className="container">
        <h2>{'Project'} <span>{'Overview'}</span></h2>
        
        <div className="overview-grid">
          <div className="glass-panel overview-card">
            <div className="card-header">
              <div className="icon-wrapper"><Target className="text-accent" /></div>
              <h3>{'Objective'}</h3>
            </div>
            <p>{'To eliminate delays in traditional soil testing by creating a portable smart device that performs soil analysis and crop disease detection directly in the field, providing instant recommendations.'}</p>
          </div>
          
          <div className="glass-panel overview-card">
            <div className="card-header">
              <div className="icon-wrapper error"><AlertTriangle /></div>
              <h3>{'The Problem'}</h3>
            </div>
            <ul className="problem-list">
              <li>{'Traditional testing takes several days'}</li>
              <li>{'Incorrect fertilizer usage wastes money & pollutes'}</li>
              <li>{'Visual disease diagnosis is often inaccurate'}</li>
              <li>{'Precision equipment is too expensive for small farmers'}</li>
            </ul>
          </div>
          
          <div className="glass-panel overview-card">
            <div className="card-header">
              <div className="icon-wrapper success"><Lightbulb /></div>
              <h3>{'Proposed Solution'}</h3>
            </div>
            <p>{'A unified AI + IoT system combining industrial NPK sensors with a Raspberry Pi-powered computer vision model to diagnose soil health and plant diseases simultaneously.'}</p>
          </div>
          
          <div className="glass-panel overview-card">
            <div className="card-header">
              <div className="icon-wrapper"><Users className="text-accent" /></div>
              <h3>{'Target Users'}</h3>
            </div>
            <p>{'Small to medium-scale farmers, agricultural cooperatives, agronomists, and researchers looking for affordable, real-time precision farming tools.'}</p>
          </div>
          
          <div className="glass-panel overview-card col-span-full">
            <div className="card-header">
              <div className="icon-wrapper"><LineChart className="text-accent" /></div>
              <h3>{'Expected Impact'}</h3>
            </div>
            <div className="impact-grid">
              <div className="impact-item">
                <h4>{'Agricultural'}</h4>
                <p>{'Faster testing, early detection, higher yield.'}</p>
              </div>
              <div className="impact-item">
                <h4>{'Economic'}</h4>
                <p>{'Lower costs for fertilizer and labor, increased income.'}</p>
              </div>
              <div className="impact-item">
                <h4>{'Environmental'}</h4>
                <p>{'Reduced pollution, sustainable long-term soil health.'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;
