import React from 'react';
import Progress from '../components/Progress';
import Results from '../components/Results';
import Comparison from '../components/Comparison';

const Performance = () => {
  return (
    <div className="page-transition">
      <Progress />
      <Results />
      <Comparison />
    </div>
  );
};

export default Performance;
