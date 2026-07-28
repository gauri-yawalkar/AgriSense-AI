import React from 'react';
import './Progress.css';

const milestones = [
  { date: "Month 1", title: "Requirement Analysis & Component Sourcing", status: "completed" },
  { date: "Month 2", title: "Hardware Assembly & Basic Sensor Integration", status: "completed" },
  { date: "Month 3", title: "YOLOv8 Model Training on Plant Village Dataset", status: "completed" },
  { date: "Month 4", title: "UI Dashboard & SQLite Integration", status: "in-progress" },
  { date: "Month 5", title: "Field Testing & Calibration", status: "upcoming" },
  { date: "Month 6", title: "Final Deployment & Presentation", status: "upcoming" }
];

const Progress = () => {
  return (
    <section id="progress" className="section progress">
      <div className="container">
        <h2>Development <span>Progress</span></h2>
        
        <div className="timeline-container">
          {milestones.map((item, index) => (
            <div key={index} className={`timeline-item ${item.status}`}>
              <div className="timeline-marker"></div>
              <div className="timeline-content glass-panel">
                <span className="timeline-date">{item.date}</span>
                <h3>{item.title}</h3>
                <span className={`status-badge ${item.status}`}>
                  {item.status.replace('-', ' ').toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Progress;
