import React from 'react';
import PageTransition from '../components/PageTransition';
import { BookOpen, Cpu, Database, Wifi, ShieldCheck, ExternalLink } from 'lucide-react';
import './References.css';

const References = () => {
  const referenceData = [
    {
      title: 'Research & Technical References',
      icon: <BookOpen className="ref-icon" />,
      items: [
        { name: 'FAO', description: 'Precision Agriculture and Sustainable Farming', url: 'https://www.fao.org' },
        { name: 'ICAR', description: 'Soil Health Management & Crop Research', url: 'https://icar.org.in' },
        { name: 'Soil Health Card Scheme', description: 'Soil nutrient management guidelines (Govt. of India)', url: 'https://soilhealth.dac.gov.in' },
        { name: 'Raspberry Pi Foundation', description: 'Raspberry Pi 5 Documentation', url: 'https://www.raspberrypi.com' },
        { name: 'OpenCV Documentation', description: 'Computer Vision Library', url: 'https://opencv.org' },
        { name: 'Ultralytics YOLOv8', description: 'AI-based Object & Disease Detection', url: 'https://docs.ultralytics.com' },
        { name: 'TensorFlow Lite', description: 'Edge AI Deployment', url: 'https://www.tensorflow.org/lite' },
        { name: 'Python Software Foundation', description: 'Python Programming Language', url: 'https://www.python.org' },
        { name: 'SQLite Documentation', description: 'Embedded Database', url: 'https://www.sqlite.org' },
        { name: 'USDA', description: 'Precision Agriculture Research', url: 'https://www.usda.gov' }
      ]
    },
    {
      title: 'Sensor References',
      icon: <Cpu className="ref-icon" />,
      items: [
        { name: 'DFRobot', description: 'NPK Soil Sensor Documentation', url: 'https://www.dfrobot.com' },
        { name: 'Atlas Scientific', description: 'Industrial pH Sensor', url: 'https://atlas-scientific.com' },
        { name: 'Seeed Studio', description: 'Soil Moisture Sensors', url: 'https://www.seeedstudio.com' },
        { name: 'Robu.in', description: 'Raspberry Pi, Sensors & Hardware Specifications', url: 'https://robu.in' }
      ]
    },
    {
      title: 'Crop Disease Datasets',
      icon: <Database className="ref-icon" />,
      items: [
        { name: 'PlantVillage Dataset', description: 'Extensive database of plant diseases', url: 'https://plantvillage.psu.edu' },
        { name: 'Kaggle Plant Disease Dataset', description: 'Machine learning datasets for crops', url: 'https://www.kaggle.com' }
      ]
    },
    {
      title: 'Communication & Connectivity',
      icon: <Wifi className="ref-icon" />,
      items: [
        { name: 'IEEE Xplore', description: 'Research papers on Precision Agriculture, IoT and AI', url: 'https://ieeexplore.ieee.org' },
        { name: 'ScienceDirect', description: 'AI in Agriculture Research Papers', url: 'https://www.sciencedirect.com' },
        { name: 'Springer Nature', description: 'Smart Farming & Precision Agriculture', url: 'https://link.springer.com' }
      ]
    },
    {
      title: 'Standards',
      icon: <ShieldCheck className="ref-icon" />,
      items: [
        { name: 'RS-485', description: 'Communication Standard', url: 'https://www.ti.com' },
        { name: 'Bluetooth SIG', description: 'Bluetooth Standards', url: 'https://www.bluetooth.com' },
        { name: 'Wi-Fi Alliance', description: 'Wi-Fi Standards', url: 'https://www.wi-fi.org' }
      ]
    }
  ];

  return (
    <PageTransition>
      <div className="references-page">
        <header className="references-header">
          <div className="container">
            <h1>Project <span>References</span></h1>
            <p>Trusted academic, government, and technology sources grounding the AgriSense project in recognized agricultural, AI, and embedded-systems research.</p>
          </div>
        </header>

        <div className="container references-container">
          <div className="references-grid">
            {referenceData.map((section, idx) => (
              <section key={idx} className="reference-section glass-panel">
                <div className="section-header">
                  {section.icon}
                  <h2>{section.title}</h2>
                </div>
                <ul className="reference-list">
                  {section.items.map((item, itemIdx) => (
                    <li key={itemIdx}>
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="reference-item">
                        <div className="ref-info">
                          <h3>{item.name}</h3>
                          <p>{item.description}</p>
                        </div>
                        <ExternalLink size={16} className="ext-icon" />
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <div className="citation-box glass-panel">
            <h3>Suggested Citation</h3>
            <blockquote>
              References: FAO • ICAR • Soil Health Card Scheme (Govt. of India) • Raspberry Pi Foundation • OpenCV • TensorFlow Lite • Ultralytics YOLOv8 • IEEE Xplore • PlantVillage Dataset • Kaggle Plant Disease Dataset • Robu.in
            </blockquote>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default References;
