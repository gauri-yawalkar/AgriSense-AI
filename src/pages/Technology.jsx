import React from 'react';
import PageTransition from '../components/PageTransition';
import TechStack from '../components/TechStack';
import Architecture from '../components/Architecture';
import Workflow from '../components/Workflow';
import ProjectComponents from '../components/ProjectComponents';

const Technology = () => {
  return (
    <PageTransition>
      <TechStack />
      <Architecture />
      <Workflow />
      <ProjectComponents />
    </PageTransition>
  );
};

export default Technology;
