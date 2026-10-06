import React from 'react';
import SEO from '../components/common/SEO';
import SectionTitle from '../components/common/SectionTitle';
import TestimonialCard from '../components/testimonials/TestimonialCard';
import Reveal from '../components/common/Reveal';
// import useFetch from '../hooks/useFetch';
// import testimonialsApi from '../lib/api/testimonialsApi';

const Testimonials = () => {
  // const { data: testimonials, loading } = useFetch(testimonialsApi.list);
  const testimonials = [
    { 
      id: '1', 
      clientName: 'Viral Jain', 
      role: 'Python Project Mentor', 
      message: 'Prasann demonstrated excellent aptitude and a strong problem-solving mindset during his Python project training.' 
    },
    { 
      id: '2', 
      clientName: 'Client via Upwork', 
      role: 'Startup Founder', 
      message: 'Delivered our React frontend ahead of schedule. The code was clean, modular, and well-documented. Highly recommended.' 
    }
  ];

  return (
    <div className="py-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SEO 
          title="Testimonials" 
          description="Read what clients and mentors have to say about working with Prasann Bellale." 
        />
        
        <Reveal direction="down">
          <SectionTitle 
            subtitle="Client & Mentor Feedback" 
            title="Testimonials" 
            alignment="center" 
          />
        </Reveal>
        
        {(!testimonials || testimonials.length === 0) ? (
          <div className="text-center py-12 text-slate-500">
            No testimonials available at the moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {testimonials.map((testimonial, index) => (
              <Reveal key={testimonial.id} direction="up" delay={index * 0.15}>
                <TestimonialCard testimonial={testimonial} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Testimonials;