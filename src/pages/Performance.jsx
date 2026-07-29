import React from 'react';
import PageTransition from '../components/PageTransition';
import Progress from '../components/Progress';
import Results from '../components/Results';
import Comparison from '../components/Comparison';

const Performance = () => {
  return (
    <PageTransition>
      <Progress />
      <Results />
      <Comparison />
    </PageTransition>
  );
};

export default Performance;
