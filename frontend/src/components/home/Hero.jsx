import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download } from 'lucide-react';
import Button from '../common/Button';
import Reveal from '../common/Reveal';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          <Reveal direction="up" delay={0.1}>
            <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold tracking-wider mb-6 border border-blue-100">
              AVAILABLE FOR HIRE
            </span>
          </Reveal>
          
          <Reveal direction="up" delay={0.2}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 tracking-tight mb-6">
              Hi, I'm Prasann <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                Full Stack Developer.
              </span>
            </h1>
          </Reveal>
          
          <Reveal direction="up" delay={0.3}>
            <p className="text-lg sm:text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl">
              I build production-ready web applications using the MERN stack. Passionate about scalable architecture, real-time features, and currently exploring Python and applied AI.
            </p>
          </Reveal>
          
          <Reveal direction="up" delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/projects">
                <Button size="lg" className="w-full sm:w-auto flex items-center justify-center">
                  View My Work <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <a href="/resume.pdf" target="_blank" rel="noreferrer">
                <Button variant="outline" size="lg" className="w-full sm:w-auto flex items-center justify-center">
                  <Download className="mr-2 w-5 h-5" /> Download Resume
                </Button>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 opacity-20 pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-blue-300 to-cyan-200 blur-3xl"></div>
      </div>
    </section>
  );
};

export default Hero;