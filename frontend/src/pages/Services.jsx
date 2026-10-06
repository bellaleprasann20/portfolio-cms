import React from 'react';
import SEO from '../components/common/SEO';
import SectionTitle from '../components/common/SectionTitle';
import ServiceCard from '../components/services/ServiceCard';
import Reveal from '../components/common/Reveal';
// import useFetch from '../hooks/useFetch';
// import servicesApi from '../lib/api/servicesApi';

const Services = () => {
  // const { data: services, loading } = useFetch(servicesApi.list);
  const services = [
    { 
      id: '1', 
      title: 'Full Stack Development', 
      description: 'End-to-end web application development using the MERN stack. From responsive frontend interfaces in React to robust backend logic in Node.js.' 
    },
    { 
      id: '2', 
      title: 'RESTful API Design', 
      description: 'Building secure, scalable, and well-documented backend APIs using Express and FastAPI to power web and mobile applications.' 
    },
    { 
      id: '3', 
      title: 'Database Architecture', 
      description: 'Designing efficient database schemas and queries for MongoDB and PostgreSQL, ensuring high performance and data integrity.' 
    }
  ];

  return (
    <div className="py-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SEO 
          title="Services" 
          description="Professional web development services including full stack development, API design, and database architecture." 
        />
        
        <Reveal direction="down">
          <SectionTitle 
            subtitle="What I Do" 
            title="My Services" 
            alignment="center" 
          />
        </Reveal>
        
        {(!services || services.length === 0) ? (
          <div className="text-center py-12 text-slate-500">
            Services are currently being updated. Check back soon!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {services.map((service, index) => (
              <Reveal key={service.id} direction="up" delay={index * 0.15}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;