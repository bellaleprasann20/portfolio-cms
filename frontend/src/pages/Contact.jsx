import React from 'react';
import SEO from '../components/common/SEO';
import ContactForm from '../components/contact/ContactForm';
import ContactInfo from '../components/contact/ContactInfo';
import Reveal from '../components/common/Reveal';

const Contact = () => {
  return (
    <div className="py-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SEO title="Contact Me" description="Get in touch with Prasann Bellale for freelance projects or full-time opportunities." />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mt-8">
          <Reveal direction="right">
            <ContactInfo />
          </Reveal>
          
          <Reveal direction="left" delay={0.2}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </div>
  );
};

export default Contact;