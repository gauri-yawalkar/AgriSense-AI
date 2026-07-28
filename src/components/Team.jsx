import React from 'react';
import './Team.css';

import anushkaImg from '../assets/team member with images/Anushka.webp';
import gouriImg from '../assets/team member with images/Gouri Yawalkar.webp';
import niketanImg from '../assets/team member with images/Niketan Toke.jpg';
import sanketImg from '../assets/team member with images/sanket.webp';

const teamMembers = [
  { name: "Anushka Suraskar", role: "Team Lead", icon: "AS", image: anushkaImg },
  { name: "Sanket Patil", role: "Chassis & Machining", icon: "SP", image: sanketImg },
  { name: "Gouri Yawalkar", role: "Software & Data Logs", icon: "GY", image: gouriImg },
  { name: "Niketan Toke", role: "Embedded Systems", icon: "NT", image: niketanImg },
  { name: "Aakash", role: "Sensor Integration", icon: "A", image: null }
];

const Team = () => {
  return (
    <section id="team" className="section team">
      <div className="container">
        <h2>Team <span>GRYPHON'X 2.O — T4T</span></h2>

        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-card glass-panel">
              <div className="team-avatar">
                {member.image ? (
                  <img src={member.image} alt={member.name} className="team-image" />
                ) : (
                  member.icon
                )}
              </div>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
