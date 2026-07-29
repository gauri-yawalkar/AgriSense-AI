import React from 'react';
import PageTransition from '../components/PageTransition';
import Hero from '../components/Hero';
import Overview from '../components/Overview';
import Features from '../components/Features';

const Home = () => {
  return (
    <PageTransition>
      <Hero />
      <Overview />
      <Features />
    </PageTransition>
  );
};

export default Home;
