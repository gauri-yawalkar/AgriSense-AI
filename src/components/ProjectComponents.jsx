import React from 'react';
import './ProjectComponents.css';

const componentsList = [
  {
    name: "Raspberry Pi 5",
    desc: "The main controller. Runs Linux, Python programs, AI inference, and database management."
  },
  {
    name: "7-inch Touchscreen",
    desc: "Human Machine Interface (HMI) for the farmer. Displays sensor readings, diseases, and advice without needing a keyboard."
  },
  {
    name: "Industrial NPK Sensor",
    desc: "Measures macronutrients (Nitrogen, Phosphorus, Potassium) essential for stem, root, and fruit growth."
  },
  {
    name: "pH & Moisture Sensors",
    desc: "Measures acidity (ideal 6-7) to recommend Lime/Sulfur, and water percentage to prevent overwatering."
  },
  {
    name: "Temperature & EC/TDS Sensors",
    desc: "Measures soil temperature, electrical conductivity, and total dissolved solids to estimate soil fertility."
  },
  {
    name: "Camera Module",
    desc: "12MP camera captures leaf images to be processed by YOLOv8 for disease detection."
  },
  {
    name: "12V Battery & Buck Converter",
    desc: "Provides portable power, stepping down 12V to 5V efficiently for the Raspberry Pi."
  },
  {
    name: "RS485 Converter",
    desc: "Crucial for communication. Converts Modbus RTU signals from industrial sensors to USB for the Raspberry Pi."
  }
];

const ProjectComponents = () => {
  return (
    <section id="components" className="section components">
      <div className="container">
        <h2>Hardware <span>Components</span></h2>
        
        <div className="comp-grid">
          {componentsList.map((comp, index) => (
            <div key={index} className="comp-card glass-panel">
              <h3>{comp.name}</h3>
              <p>{comp.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectComponents;
