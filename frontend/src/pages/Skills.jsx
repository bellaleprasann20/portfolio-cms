import React from 'react';
import SEO from '../components/common/SEO';
import SectionTitle from '../components/common/SectionTitle';
import Reveal from '../components/common/Reveal';
import Button from '../components/common/Button';
import { 
  Code2, 
  Server, 
  Database, 
  Terminal, 
  ExternalLink 
} from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const SkillCategory = ({ title, icon: Icon, skills, delay }) => (
  <Reveal direction="up" delay={delay}>
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-blue-500/30 transition-all duration-300 group">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-inner">
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
      </div>
      
      <div className="flex flex-wrap gap-2.5">
        {skills.map((skill, idx) => (
          <div 
            key={idx} 
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 border border-slate-200/60 rounded-xl text-slate-700 font-medium text-sm hover:bg-blue-50/50 hover:border-blue-300 hover:text-blue-700 hover:-translate-y-0.5 transition-all duration-200 cursor-default shadow-2xs"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 group-hover:scale-125 transition-transform" />
            {skill}
          </div>
        ))}
      </div>
    </div>
  </Reveal>
);

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend Development",
      icon: Code2,
      skills: ["React.js", "Vite", "Tailwind CSS", "HTML5 / CSS3", "JavaScript (ES6+)", "Responsive Design"],
      delay: 0.1
    },
    {
      title: "Backend & APIs",
      icon: Server,
      skills: ["Node.js", "Express.js", "Python", "FastAPI", "RESTful APIs", "JWT Authentication"],
      delay: 0.2
    },
    {
      title: "Databases & Storage",
      icon: Database,
      skills: ["MongoDB", "Mongoose", "Supabase", "SQL Basics", "Data Modeling"],
      delay: 0.3
    },
    {
      title: "DevOps & Tools",
      icon: Terminal,
      skills: ["Docker", "Git & GitHub", "Vercel", "Render", "Postman", "Windows PowerShell"],
      delay: 0.4
    }
  ];

  return (
    <div className="py-20 bg-gradient-to-b from-slate-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SEO 
          title="Skills & Tech Stack" 
          description="Explore Prasann Bellale's technical proficiencies across React, Node.js, FastAPI, Python, MongoDB, and modern web development tools." 
        />
        
        <Reveal direction="down">
          <SectionTitle 
            subtitle="Technical Proficiency" 
            title="Skills & Technologies" 
          />
        </Reveal>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {skillCategories.map((category, index) => (
            <SkillCategory 
              key={index} 
              title={category.title} 
              icon={category.icon} 
              skills={category.skills} 
              delay={category.delay} 
            />
          ))}
        </div>

        {/* Interactive GitHub Profile & Repositories Banner */}
        <Reveal direction="up" delay={0.5}>
          <div className="mt-16 bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-800 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="absolute -left-20 -bottom-20 w-56 h-56 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center gap-5 relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400 shadow-inner flex-shrink-0">
                <FaGithub className="w-9 h-9" />
              </div>
              <div>
                <h3 className="text-2xl font-bold tracking-tight">Want to see these skills in action?</h3>
                <p className="text-slate-400 text-sm mt-1">
                  Explore my complete repository history, live commits, and open-source contributions on GitHub.
                </p>
              </div>
            </div>

            <div className="relative z-10 flex-shrink-0">
              <a 
                href="https://github.com/bellaleprasann20" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button variant="primary" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium px-8 py-3.5 rounded-full shadow-lg transition-all">
                  <span>Visit GitHub Profile</span>
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

export default Skills;