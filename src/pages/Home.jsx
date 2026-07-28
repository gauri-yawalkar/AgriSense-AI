import React from 'react';
import Hero from '../components/Hero';
import Overview from '../components/Overview';
import Features from '../components/Features';

const Home = () => {
  return (
    <div className="page-transition">
      <Hero />
      <Overview />
      <Features />
    </div>
  );
};

export default Home;
