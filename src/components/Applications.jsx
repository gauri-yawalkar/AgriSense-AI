import React from 'react';
import { Sprout, TreePine, GraduationCap, Home } from 'lucide-react';
import './Applications.css';

const Applications = () => {
  const applications = [
    {
      icon: <Sprout size={48} />,
      title: "Small & Medium Farms",
      desc: "Provides affordable precision farming tools to individual farmers who cannot afford expensive lab testing."
    },
    {
      icon: <Home size={48} />,
      title: "Greenhouses",
      desc: "Continuous monitoring of soil health and automated disease scanning in controlled environments."
    },
    {
      icon: <TreePine size={48} />,
      title: "Agricultural Cooperatives",
      desc: "Shared devices for farming communities to test soil before seasonal planting across large areas."
    },
    {
      icon: <GraduationCap size={48} />,
      title: "Research & Education",
      desc: "A hands-on tool for agricultural students and researchers studying soil science and crop pathology."
    }
  ];

  return (
    <section id="applications" className="section applications">
      <div className="container">
        <h2>{'Real-World'} <span>{'Applications'}</span></h2>
        
        <div className="apps-grid">
          {applications.map((app, index) => (
            <div key={index} className="app-card glass-panel">
              <div className="app-icon">{app.icon}</div>
              <h3>{app.title}</h3>
              <p>{app.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Applications;
