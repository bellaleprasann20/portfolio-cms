import React from 'react';
import { Briefcase, GraduationCap, Award, Calendar } from 'lucide-react';
import Reveal from '../common/Reveal';

const Timeline = ({ items = [] }) => {
  if (!items || items.length === 0) {
    return (
      <div className="text-center py-12 text-slate-500 bg-white rounded-2xl border border-slate-100 shadow-sm">
        No experience or education records found.
      </div>
    );
  }

  // Sort items by start date, newest first
  const sortedItems = [...items].sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

  const getIcon = (type) => {
    switch (type) {
      case 'Work': return <Briefcase className="w-5 h-5 text-blue-600" />;
      case 'Education': return <GraduationCap className="w-5 h-5 text-emerald-600" />;
      case 'Training': return <Award className="w-5 h-5 text-purple-600" />;
      default: return <Briefcase className="w-5 h-5 text-slate-600" />;
    }
  };

  const getBadgeColor = (type) => {
    switch (type) {
      case 'Work': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Education': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Training': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
  };

  return (
    <div className="relative max-w-4xl mx-auto py-8">
      {/* Vertical tracking line */}
      <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-slate-200"></div>

      <div className="space-y-12">
        {sortedItems.map((item, index) => (
          <Reveal key={item._id || item.id} direction="up" delay={index * 0.15}>
            <div className="relative pl-12 md:pl-24">
              
              {/* Timeline Dot/Icon */}
              <div className="absolute left-0 md:left-4 w-9 h-9 rounded-full bg-white border-2 border-slate-200 shadow-sm flex items-center justify-center translate-x-[2px] md:-translate-x-1/2 z-10">
                {getIcon(item.type)}
              </div>

              {/* Content Card */}
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {item.role || item.title}
                      </h3>
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${getBadgeColor(item.type)}`}>
                        {item.type}
                      </span>
                    </div>
                    <p className="text-lg font-medium text-slate-700">
                      {item.company || item.organization}
                    </p>
                    {item.location && (
                      <p className="text-sm text-slate-500 mt-1">{item.location}</p>
                    )}
                  </div>
                  
                  {/* Date Badge */}
                  <div className="flex items-center shrink-0 text-sm font-medium text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                    <Calendar className="w-4 h-4 mr-2 text-slate-400" />
                    {formatDate(item.startDate)} - {item.current ? 'Present' : formatDate(item.endDate)}
                  </div>
                </div>

                {item.description && (
                  <p className="text-slate-600 leading-relaxed whitespace-pre-wrap mt-4 pt-4 border-t border-slate-50">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
};

export default Timeline;