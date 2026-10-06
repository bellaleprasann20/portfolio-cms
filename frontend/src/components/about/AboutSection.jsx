import React, { useState } from 'react';
import { Download, GraduationCap, Code2, MapPin, Eye, X } from 'lucide-react';
import Reveal from '../common/Reveal';
import SectionTitle from '../common/SectionTitle';
import Button from '../common/Button';
// import useFetch from '../../hooks/useFetch';
// import aboutApi from '../../lib/api/aboutApi';

const AboutSection = () => {
  // If you want to connect this directly to your FastAPI backend, you would uncomment the lines above
  // and use: const { data: aboutData, loading } = useFetch(aboutApi.get);
  
  const [showPreview, setShowPreview] = useState(false);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal direction="up">
          <SectionTitle 
            subtitle="About Me" 
            title="Passionate about building scalable web applications." 
          />
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
          
          {/* Main Bio Column */}
          <div className="lg:col-span-8 space-y-6 text-lg text-slate-600 leading-relaxed">
            <Reveal direction="up" delay={0.1}>
              <p>
                Hello! I'm <strong>Prasann Bellale</strong>, a Full Stack Developer specializing in the MERN stack (MongoDB, Express.js, React, Node.js). My journey into software development started with a fascination for how data flows across the web, which led me to pursue a Bachelor of Computer Applications (BCA) and dive deep into full-stack engineering.
              </p>
            </Reveal>
            <Reveal direction="up" delay={0.2}>
              <p>
                Recently, I completed an intensive MERN Stack Development Program at ApnaCollege, where I built production-style applications—ranging from real-time chat platforms using Socket.io to e-commerce food delivery systems with Stripe integration.
              </p>
            </Reveal>
            <Reveal direction="up" delay={0.3}>
              <p>
                Beyond JavaScript, I have a strong appetite for learning. I am currently expanding my toolkit by learning Python and FastAPI, and I'm actively exploring the world of Applied AI, Prompt Engineering, and Vector Databases to build next-generation intelligent applications.
              </p>
            </Reveal>
            <Reveal direction="up" delay={0.4}>
              <div className="pt-6 flex flex-wrap gap-4">
                <Button 
                  onClick={() => setShowPreview(true)}
                  variant="outline" 
                  className="flex items-center bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                >
                  <Eye className="w-5 h-5 mr-2" /> Preview Resume
                </Button>
                
                <a href="/resume.pdf" download="Prasann_Bellale_Resume.pdf">
                  <Button variant="primary" className="flex items-center">
                    <Download className="w-5 h-5 mr-2" /> Download Full Resume
                  </Button>
                </a>
              </div>
            </Reveal>
          </div>

          {/* Quick Facts Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <Reveal direction="left" delay={0.2}>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Quick Facts</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <MapPin className="w-5 h-5 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <span className="block font-medium text-slate-900">Location</span>
                      <span className="text-slate-600 text-sm">Karnataka, India</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <GraduationCap className="w-5 h-5 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <span className="block font-medium text-slate-900">Education</span>
                      <span className="text-slate-600 text-sm">BCA, Guru Nanak First Grade College (2022-2025)</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Code2 className="w-5 h-5 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <span className="block font-medium text-slate-900">Focus</span>
                      <span className="text-slate-600 text-sm">Full Stack, REST APIs, Applied AI</span>
                    </div>
                  </li>
                </ul>
              </div>
            </Reveal>

            <Reveal direction="left" delay={0.4}>
              <div className="bg-blue-600 p-6 rounded-2xl text-white shadow-lg shadow-blue-200">
                <h3 className="text-lg font-bold mb-2">Looking for an opportunity?</h3>
                <p className="text-blue-100 text-sm mb-4">
                  I am currently seeking entry-level Full Stack Developer roles to contribute to impactful projects.
                </p>
                <a href="mailto:prasannbellale@gmail.com" className="text-white font-semibold underline hover:text-blue-200 transition-colors">
                  prasannbellale@gmail.com
                </a>
              </div>
            </Reveal>
          </div>

        </div>
      </div>

      {/* Resume Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 sm:p-6 transition-opacity">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-semibold text-slate-900 flex items-center">
                <Eye className="w-5 h-5 mr-2 text-blue-600" />
                Resume Preview
              </h3>
              <div className="flex gap-3">
                <a 
                  href="/resume.pdf" 
                  download="Prasann_Bellale_Resume.pdf"
                  className="flex items-center px-3 py-1.5 text-sm font-medium text-blue-700 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  <Download className="w-4 h-4 mr-1.5" />
                  Save a copy
                </a>
                <button 
                  onClick={() => setShowPreview(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                  aria-label="Close preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body - PDF Iframe */}
            <div className="flex-grow w-full h-full bg-slate-100">
              <iframe 
               src="/resume.pdf?v=2#toolbar=0" 
                className="w-full h-full border-none"
                title="Prasann Bellale Resume Preview"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AboutSection;