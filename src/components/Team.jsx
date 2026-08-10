import React from 'react';
import './Team.css';

import anushkaImg from '../assets/team member with images/Anushka.webp';
import gouriImg from '../assets/team member with images/Gouri Yawalkar.webp';
import niketanImg from '../assets/team member with images/Niketan Toke.jpg';
import sanketImg from '../assets/team member with images/sanket.webp';
import sumitImg from '../assets/team member with images/sumit.jpeg';
import nirmayeeImg from '../assets/team member with images/Nirmayee Vaidya.jpeg';
import facultyImg from '../assets/team member with images/Dr Kanchan S Vaidya.jpg';

const Team = () => {
  const teamMembers = [
    { name: "Anushka Suraskar", role: "Team Lead", icon: "AS", image: anushkaImg },
    { name: "Sanket Patil", role: "Team Member", icon: "SP", image: sanketImg },
    { name: "Gouri Yawalkar", role: "Team Member", icon: "GY", image: gouriImg },
    { name: "Niketan Toke", role: "Team Member", icon: "NT", image: niketanImg },
    { name: "Sumit Gupta", role: "Team Member", icon: "SG", image: sumitImg },
    { name: "Nirmayee Vaidya", role: "Team Member", icon: "NV", image: nirmayeeImg }
  ];

  return (
    <section id="team" className="section team">
      <div className="container">
        <h2>{'Team'} <span>{"GRYPHON'X 2.O — T4T"}</span></h2>

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

        <h3 className="faculty-heading">Faculty Mentor</h3>
        <div className="faculty-container">
          <div className="team-card glass-panel faculty-card">
            <div className="team-avatar">
              <img src={facultyImg} alt="Dr. Kanchan S. Vaidya" className="team-image" />
            </div>
            <h3>Dr. Kanchan S. Vaidya</h3>
            <p>Faculty Mentor</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
