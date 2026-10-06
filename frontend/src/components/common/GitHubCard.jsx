import React from 'react';
import { FaGithub, FaCodeBranch, FaStar, FaExternalLinkAlt } from 'react-icons/fa';
import Button from './Button';

const GitHubCard = () => {
  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 rounded-3xl shadow-xl border border-slate-700 my-12 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400 shadow-inner flex-shrink-0">
            <FaGithub className="w-9 h-9" />
          </div>
          <div>
            <h3 className="text-2xl font-bold tracking-tight">Explore More on GitHub</h3>
            <p className="text-slate-400 text-sm mt-1">
              Check out my repositories, source code contributions, and full development history.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 flex-wrap justify-center">
          <div className="hidden lg:flex items-center gap-6 text-xs text-slate-300 bg-slate-800/60 px-4 py-3 rounded-xl border border-slate-700/50">
            <div className="flex items-center gap-1.5">
              <FaCodeBranch className="text-blue-400" />
              <span>Active Repositories</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FaStar className="text-amber-400" />
              <span>Open Source Ready</span>
            </div>
          </div>

          <a 
            href="https://github.com/bellaleprasann20" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button variant="primary" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-3 rounded-full shadow-lg transition-all">
              <span>View GitHub Profile</span>
              <FaExternalLinkAlt className="w-3.5 h-3.5" />
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default GitHubCard;