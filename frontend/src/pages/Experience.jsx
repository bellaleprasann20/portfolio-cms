import React from 'react';
import SEO from '../components/common/SEO';
import SectionTitle from '../components/common/SectionTitle';
import Timeline from '../components/experience/Timeline';
import Reveal from '../components/common/Reveal';
import Button from '../components/common/Button';
import { FaLinkedin, FaAward } from 'react-icons/fa';
import { ExternalLink } from 'lucide-react';

const Experience = () => {
  const items = [
    { 
      id: '1', 
      type: 'Experience', 
      title: 'Python Developer Intern', 
      organization: 'Labmentix', 
      startDate: '2026-08-01', 
      endDate: '2027-01-01',
      description: 'Completed a rigorous 6-month technical training and internship program focusing on Python-based application development, FastAPI backend services, and automated project workflows.',
      techStack: 'Python, FastAPI, Git, REST APIs'
    },
    { 
      id: '3', 
      type: 'Training', 
      title: 'MERN Stack Development', 
      organization: 'ApnaCollege', 
      startDate: '2023-01-01', 
      endDate: '2023-12-01',
      description: 'Gained hands-on experience building production-ready web applications using React, Node.js, Express, and MongoDB.',
      techStack: 'React.js, Node.js, Express, MongoDB, Tailwind CSS'
    },
    { 
      id: '4', 
      type: 'Education', 
      title: 'Bachelor of Computer Applications (BCA)', 
      organization: 'Guru Nanak First Grade College', 
      startDate: '2022-09-01', 
      endDate: '2025-06-01',
      description: 'Built a strong foundation in computer science fundamentals, programming languages, database management systems, and web technologies.',
      techStack: 'C, C++, Java, Database Management, HTML/CSS'
    }
  ];

  return (
    <div className="py-20 bg-gradient-to-b from-slate-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SEO 
          title="Experience & Education" 
          description="Explore Prasann Bellale's academic journey, professional Python development experience at Labmentix, and full-stack engineering milestones." 
        />
        
        <Reveal direction="down">
          <SectionTitle 
            subtitle="My Journey" 
            title="Experience & Education" 
            alignment="center" 
          />
        </Reveal>

        {/* Timeline Component */}
        <div className="mt-12">
          <Timeline items={items} />
        </div>

        {/* Certification & LinkedIn Verification Banner */}
        <Reveal direction="up" delay={0.4}>
          <div className="mt-16 bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-800 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="absolute -right-20 -top-20 w-56 h-56 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center gap-5 relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400 shadow-inner flex-shrink-0">
                <FaAward className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold tracking-tight">Verified Technical Credentials</h3>
                <p className="text-slate-400 text-sm mt-1">
                  Includes certified project completions like the Labmentix Python LCAT certification and practical industry training.
                </p>
              </div>
            </div>

            <div className="relative z-10 flex-shrink-0">
              {/* Replace with your actual LinkedIn profile URL */}
              <a 
                href="https://www.linkedin.com/in/prasann-bellale" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button variant="primary" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium px-8 py-3.5 rounded-full shadow-lg transition-all">
                  <FaLinkedin className="w-4 h-4" />
                  <span>View Certificates on LinkedIn</span>
                  <ExternalLink className="w-4 h-4 ml-1" />
                </Button>
              </a>
            </div>
          </div>
        </Reveal>

      </div>
    </div>
  );
};

export default Experience;