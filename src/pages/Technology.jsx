import React from 'react';
import TechStack from '../components/TechStack';
import Architecture from '../components/Architecture';
import Workflow from '../components/Workflow';
import ProjectComponents from '../components/ProjectComponents';

const Technology = () => {
  return (
    <div className="page-transition">
      <TechStack />
      <Architecture />
      <Workflow />
      <ProjectComponents />
    </div>
  );
};

export default Technology;
