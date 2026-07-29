import React from 'react';
import { Mail, Briefcase, Code, Send } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="section contact">
      <div className="container">
        <h2>{'Get in'} <span>{'Touch'}</span></h2>
        
        <div className="contact-grid">
          <div className="contact-info">
            <h3>{'Connect with us'}</h3>
            <p>{'Interested in learning more about AgriSense or collaborating? Reach out to us through our social channels or drop a message.'}</p>
            
            <div className="social-links">
              <a href="#" className="social-link glass-panel">
                <Mail className="text-accent" />
                <span>contact@agrisense.ai</span>
              </a>
              <a href="#" className="social-link glass-panel">
                <Briefcase className="text-accent" />
                <span>AgriSense Team</span>
              </a>
              <a href="#" className="social-link glass-panel">
                <Code className="text-accent" />
                <span>github.com/gauri-yawalkar/AgriSense-AI</span>
              </a>
            </div>
          </div>
          
          <div className="contact-form glass-panel">
            <form>
              <div className="form-group">
                <label>{'Name'}</label>
                <input type="text" placeholder={'Your Name'} />
              </div>
              <div className="form-group">
                <label>{'Email'}</label>
                <input type="email" placeholder={'Your Email'} />
              </div>
              <div className="form-group">
                <label>{'Message'}</label>
                <textarea rows="4" placeholder={'How can we help you?'}></textarea>
              </div>
              <button type="button" className="btn btn-primary w-full">
                {'Send Message'} <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
