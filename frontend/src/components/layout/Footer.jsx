import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Mail } from 'lucide-react'; 
import { FaGithub, FaLinkedin } from 'react-icons/fa'; // <-- The new brand icons!

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 py-12 mt-20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          
          {/* Brand & Bio */}
          <div className="max-w-sm text-center md:text-left">
            <Link to="/" className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <Code2 size={24} className="text-blue-500" />
              <span className="font-bold text-xl text-white">
                Prasann Bellale
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Full Stack MERN Developer specializing in React, Node.js, and MongoDB. Building scalable applications and exploring the future of applied AI.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col text-center md:text-left">
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <nav className="flex flex-col space-y-2 text-sm">
              <Link to="/about" className="hover:text-blue-400 transition-colors">About Me</Link>
              <Link to="/projects" className="hover:text-blue-400 transition-colors">Projects</Link>
              <Link to="/skills" className="hover:text-blue-400 transition-colors">Skills & Tech</Link>
              <Link to="/contact" className="hover:text-blue-400 transition-colors">Contact</Link>
            </nav>
          </div>

          {/* Socials */}
          <div className="flex flex-col text-center md:text-left">
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/bellaleprasann20" 
                target="_blank" 
                rel="noreferrer"
                className="p-2 bg-slate-800 rounded-full hover:bg-blue-600 hover:text-white transition-all"
                aria-label="GitHub"
              >
                <FaGithub size={20} /> {/* <-- Updated */}
              </a>
              <a 
                href="https://www.linkedin.com/in/prasann-bellale" 
                target="_blank" 
                rel="noreferrer"
                className="p-2 bg-slate-800 rounded-full hover:bg-blue-600 hover:text-white transition-all"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} /> {/* <-- Updated */}
              </a>
              <a 
                href="mailto:prasannbellale@gmail.com" 
                className="p-2 bg-slate-800 rounded-full hover:bg-blue-600 hover:text-white transition-all"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm text-slate-500 flex flex-col md:flex-row justify-between items-center">
          <p>© {currentYear} Prasann Bellale. All rights reserved.</p>
          <p className="mt-2 md:mt-0 flex items-center">
            Built with <span className="text-red-500 mx-1">❤</span> in React & Vite
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;