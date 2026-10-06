import React from 'react';
import { Layers, Server, Code2, Database, LayoutTemplate, Zap } from 'lucide-react';

const ServiceCard = ({ service }) => {
  // Simple mapping to assign logical icons based on keywords in the title or description
  const getServiceIcon = (title) => {
    const t = title.toLowerCase();
    if (t.includes('backend') || t.includes('api')) return <Server className="w-8 h-8" />;
    if (t.includes('frontend') || t.includes('ui')) return <LayoutTemplate className="w-8 h-8" />;
    if (t.includes('database') || t.includes('data')) return <Database className="w-8 h-8" />;
    if (t.includes('full') || t.includes('stack')) return <Layers className="w-8 h-8" />;
    if (t.includes('performance') || t.includes('optimiz')) return <Zap className="w-8 h-8" />;
    return <Code2 className="w-8 h-8" />;
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl border border-slate-100 hover:border-blue-200 transition-all duration-300 group flex flex-col h-full">
      <div className="w-16 h-16 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-inner">
        {getServiceIcon(service.title)}
      </div>
      
      <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
        {service.title}
      </h3>
      
      <p className="text-slate-600 leading-relaxed text-sm flex-grow">
        {service.description}
      </p>
    </div>
  );
};

export default ServiceCard;