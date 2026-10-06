import React from 'react';
import { Link } from 'react-router-dom';
import { Send } from 'lucide-react';
import Reveal from '../common/Reveal';
import Button from '../common/Button';

const ContactPreview = () => {
  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <Reveal direction="up">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Have a project in mind?
          </h2>
          <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
            I'm currently available for entry-level MERN developer roles and exciting freelance projects. Let's connect and build something impactful together.
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white border-none text-lg px-8">
              <Send className="w-5 h-5 mr-3" /> Let's Talk
            </Button>
          </Link>
        </Reveal>
      </div>
    </section>
  );
};

export default ContactPreview;