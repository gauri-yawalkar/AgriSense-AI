import React from 'react';
import { FileText, Download, Code } from 'lucide-react';
import './Documentation.css';

const docs = [
  { title: "Project Description", type: "PDF Document", size: "4.2 MB", icon: <FileText /> },
  { title: "Presentation (PPT)", type: "Slides", size: "12.5 MB", icon: <FileText /> }
];

const Documentation = () => {
  return (
    <section id="documentation" className="section documentation">
      <div className="container">
        <h2>Documentation & <span>Downloads</span></h2>
        
        <div className="docs-grid">
          {docs.map((doc, index) => (
            <div key={index} className="doc-card glass-panel flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="doc-icon">
                  {doc.icon}
                </div>
                <div>
                  <h3>{doc.title}</h3>
                  <span className="doc-meta">{doc.type} {doc.size !== "-" && `• ${doc.size}`}</span>
                </div>
              </div>
              <button className="btn btn-secondary doc-btn">
                <Download size={18} />
                <span className="hidden-mobile">Download</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Documentation;
