import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import Reveal from '../common/Reveal';

const AboutPreview = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <Reveal direction="right">
            <div className="relative">
              <div className="aspect-w-4 aspect-h-5 sm:aspect-w-3 sm:aspect-h-4 rounded-2xl overflow-hidden bg-slate-100 shadow-xl">
                {/* Replace src with your actual professional photo */}
                <img 
                  src="og-image.png" 
                  alt="Prasann Bellale working" 
                  className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-blue-600 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob"></div>
              <div className="absolute -top-6 -left-6 w-48 h-48 bg-cyan-400 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-2000"></div>
            </div>
          </Reveal>

          <Reveal direction="left">
            <div>
              <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm mb-2 block">Who I Am</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">Connecting the dots between design and robust engineering.</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                As a BCA graduate and a certified Full Stack Developer, I specialize in building responsive, user-centric applications from the ground up. My hands-on training has equipped me with the skills to architect RESTful APIs, manage databases, and craft intuitive frontend experiences.
              </p>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Whether it's implementing real-time Socket.io chats or configuring cloud deployments on Vercel and Render, I love tackling complex problems and turning them into seamless digital solutions.
              </p>
              <Link to="/about" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors group">
                Read Full Biography 
                <ChevronRight className="w-5 h-5 ml-1 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;