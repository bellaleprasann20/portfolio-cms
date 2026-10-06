import React from 'react';
import { Mail, MapPin, Phone, ExternalLink } from 'lucide-react';
import{ FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const ContactInfo = () => {
  const contactDetails = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: 'Email',
      value: 'prasannbellale@gmail.com',
      link: 'mailto:prasannbellale@gmail.com'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: 'Location',
      value: 'Bidar, Karnataka, India',
      link: null // No direct link for generic location
    }
    // You can add Phone here if you wish to display it publicly
  ];

  return (
    <div className="h-full flex flex-col justify-center space-y-12 lg:pr-8">
      <div>
        <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Let's start a conversation.</h2>
        <p className="text-lg text-slate-600 leading-relaxed">
          I'm currently looking for full-time opportunities and freelance projects. Whether you have a question, a project proposal, or just want to say hi, my inbox is always open.
        </p>
      </div>

      <div className="space-y-8">
        {contactDetails.map((detail, index) => (
          <div key={index} className="flex items-start group">
            <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mr-6 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
              {detail.icon}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">
                {detail.label}
              </p>
              {detail.link ? (
                <a 
                  href={detail.link} 
                  className="text-lg font-medium text-slate-900 hover:text-blue-600 transition-colors flex items-center"
                >
                  {detail.value} <ExternalLink className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ) : (
                <p className="text-lg font-medium text-slate-900">{detail.value}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-8 border-t border-slate-200">
        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
          Connect with me
        </p>
        <div className="flex space-x-4">
          <a 
            href="https://github.com/bellaleprasann20" 
            target="_blank" 
            rel="noreferrer"
            className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-900 hover:text-white transition-all shadow-sm"
            aria-label="GitHub"
          >
            <FaGithub className="w-6 h-6" />
          </a>
          <a 
            href="https://www.linkedin.com/in/prasann-bellale" 
            target="_blank" 
            rel="noreferrer"
            className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-[#0A66C2] hover:text-white transition-all shadow-sm"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="w-6 h-6" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;