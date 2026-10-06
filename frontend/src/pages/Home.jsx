import React from 'react';
import SEO from '../components/common/SEO';
import Hero from '../components/home/Hero';
import AboutPreview from '../components/home/AboutPreview';
import SkillsPreview from '../components/home/SkillsPreview';
import ProjectsPreview from '../components/home/ProjectsPreview';
import ContactPreview from '../components/home/ContactPreview';

const Home = () => {
  return (
    <>
      <SEO />
      <Hero />
      <AboutPreview />
      <SkillsPreview />
      <ProjectsPreview />
      <ContactPreview />
    </>
  );
};

export default Home;