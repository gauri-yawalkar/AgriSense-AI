import React from 'react';
import './Workflow.css';

const steps = [
  { num: "01", title: "Power ON", desc: "Linux boots and Python application starts automatically." },
  { num: "02", title: "Insert Probe", desc: "Soil probe is inserted into the ground, sensors begin continuous measurement." },
  { num: "03", title: "Data Collection", desc: "Sensors transmit digital NPK, pH, Moisture, Temp, EC, TDS values." },
  { num: "04", title: "Data Conversion", desc: "Python processes raw RS485 data into meaningful agricultural units." },
  { num: "05", title: "Recommendation Engine", desc: "System checks values (e.g. Low Nitrogen) and calculates fertilizer dosage." },
  { num: "06", title: "Image Capture", desc: "Camera captures high-resolution image of the plant leaf." },
  { num: "07", title: "YOLO Inference", desc: "YOLOv8 detects diseases (e.g. Early Blight) with confidence scores." },
  { num: "08", title: "Pesticide Advice", desc: "Generates specific pesticide dosage and preventive measures based on disease." },
  { num: "09", title: "Dashboard Update", desc: "Touchscreen displays real-time health score, graphs, and all advice." },
  { num: "10", title: "Local Storage", desc: "Data logged into SQLite database for historical tracking." },
  { num: "11", title: "Report Generation", desc: "PDF report generated for download or cloud synchronization." }
];

const Workflow = () => {
  return (
    <section id="workflow" className="section workflow">
      <div className="container">
        <h2>Project <span>Workflow</span></h2>
        
        <div className="workflow-timeline">
          {steps.map((step, index) => (
            <div key={index} className="workflow-step glass-panel">
              <div className="step-number">{step.num}</div>
              <div className="step-content">
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Workflow;
