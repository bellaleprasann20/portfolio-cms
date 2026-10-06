import React, { useEffect } from 'react';
import { ExternalLink, ArrowLeft, Calendar, Code2, LayoutTemplate } from 'lucide-react';
import { FaGithub } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';
import Reveal from '../common/Reveal';

const ProjectDetails = ({ project }) => {
  // Scroll to top when loading a new project
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const tags = project.techStack ? project.techStack.split(',').map(t => t.trim()) : [];

  // Helper function to ensure valid external links and strip accidental spaces
  const getValidUrl = (url, fallback) => {
    if (!url || url === '#') return fallback;
    const cleanUrl = url.trim(); // Added trim() to fix accidental spaces!
    return cleanUrl.startsWith('http') ? cleanUrl : `https://${cleanUrl}`;
  };

  const liveDemoUrl = getValidUrl(project.liveLink, "https://github.com/bellaleprasann20");
  const githubUrl = getValidUrl(project.githubLink, "https://github.com/bellaleprasann20");

  return (
    <article className="min-h-screen bg-white pb-20">
      
      {/* Hero Image Section (Full Width) */}
      <div className="relative w-full h-[40vh] sm:h-[50vh] lg:h-[60vh] bg-slate-900 overflow-hidden">
        {project.imageUrl ? (
          <>
            <img 
              src={project.imageUrl} 
              alt={project.title} 
              className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-slate-900" />
        )}
        
        <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-12 sm:pb-16 lg:pb-20">
          <Reveal direction="up" delay={0.1}>
            <Link to="/projects" className="inline-flex items-center text-sm font-medium text-slate-300 hover:text-white transition-colors mb-6 sm:mb-8 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/10 w-fit">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to projects
            </Link>
          </Reveal>
          
          <Reveal direction="up" delay={0.2}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 max-w-4xl leading-tight">
              {project.title}
            </h1>
          </Reveal>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Main Description Column */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-100">
            
            {/* Metadata Bar */}
            <Reveal direction="up" delay={0.3}>
              <div className="flex flex-wrap gap-4 items-center text-sm text-slate-600 mb-10 pb-10 border-b border-slate-100">
                {project.createdAt && (
                  <div className="flex items-center px-4 py-2 bg-slate-50 rounded-lg border border-slate-200">
                    <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                    <span className="font-medium text-slate-700">
                      {new Date(project.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })}
                    </span>
                  </div>
                )}
                <div className="flex items-center px-4 py-2 bg-blue-50 rounded-lg border border-blue-100">
                  <LayoutTemplate className="w-4 h-4 mr-2 text-blue-600" />
                  <span className="font-medium text-blue-700">Full Stack Project</span>
                </div>
              </div>
            </Reveal>

            {/* Project Overview */}
            <Reveal direction="up" delay={0.4}>
              <div className="prose prose-lg prose-slate max-w-none prose-headings:text-slate-900 prose-a:text-blue-600 hover:prose-a:text-blue-800">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  Project Overview
                </h2>
                <div className="whitespace-pre-wrap text-slate-600 leading-relaxed text-[17px]">
                  {project.description}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:col-span-4">
            <Reveal direction="left" delay={0.5}>
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 sticky top-24 shadow-sm">
                
                {/* Tech Stack Section */}
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-5 flex items-center">
                  <Code2 className="w-4 h-4 mr-2" /> Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2 mb-10">
                  {tags.map((tag, i) => (
                    <span key={i} className="px-3.5 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-semibold shadow-sm hover:border-blue-300 hover:text-blue-600 transition-colors cursor-default">
                      {tag}
                    </span>
                  ))}
                </div>

                <hr className="border-slate-200 mb-8" />

                {/* Links & Actions */}
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-5">
                  Live Links
                </h3>
                <div className="space-y-4">
                  <a 
                    href={liveDemoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex w-full items-center justify-center px-6 py-4 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 transition-all"
                  >
                    View Live Demo <ExternalLink className="w-4 h-4 ml-2" />
                  </a>

                  <a 
                    href={githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex w-full items-center justify-center px-6 py-4 text-sm font-bold text-slate-700 bg-white border-2 border-slate-200 rounded-xl hover:border-slate-400 hover:bg-slate-50 transition-all"
                  >
                    Source Code <FaGithub className="w-4 h-4 ml-2" />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
          
        </div>
      </div>
    </article>
  );
};

export default ProjectDetails;