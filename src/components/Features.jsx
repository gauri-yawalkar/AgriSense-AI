import React from 'react';
import { Activity, Camera, Cpu, Wifi, Smartphone, Battery } from 'lucide-react';
import './Features.css';

const features = [
  {
    icon: <Activity size={32} />,
    title: "Real-Time Soil Analysis",
    description: "Instant measurement of NPK, pH, Moisture, Temperature, EC, and TDS."
  },
  {
    icon: <Camera size={32} />,
    title: "AI Disease Detection",
    description: "YOLOv8-powered computer vision to accurately identify plant diseases from leaf images."
  },
  {
    icon: <Cpu size={32} />,
    title: "Edge Computing",
    description: "Powered by Raspberry Pi 5, eliminating the need for constant cloud connectivity."
  },
  {
    icon: <Wifi size={32} />,
    title: "Offline & Online Modes",
    description: "Works flawlessly in remote fields without internet, while syncing to the cloud when online."
  },
  {
    icon: <Smartphone size={32} />,
    title: "Intuitive Dashboard",
    description: "A 7-inch touchscreen provides a user-friendly HMI with graphs, reports, and alerts."
  },
  {
    icon: <Battery size={32} />,
    title: "Portable & Battery Powered",
    description: "12V Lithium battery with an efficient buck converter for all-day field operation."
  }
];

const Features = () => {
  return (
    <section id="features" className="section features">
      <div className="container">
        <h2>Key <span>Features</span></h2>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="glass-panel feature-card">
              <div className="feature-icon">
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
