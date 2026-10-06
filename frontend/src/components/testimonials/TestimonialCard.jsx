import React from 'react';
import { Quote } from 'lucide-react';

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md border border-slate-100 transition-all duration-300 h-full flex flex-col relative group">
      {/* Decorative Quote Icon */}
      <div className="absolute top-6 right-6 text-blue-100 group-hover:text-blue-200 transition-colors">
        <Quote size={48} className="rotate-180" />
      </div>

      <div className="flex-grow z-10 relative">
        <p className="text-slate-600 leading-relaxed italic text-lg mb-8">
          "{testimonial.message}"
        </p>
      </div>

      <div className="flex items-center z-10">
        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg mr-4 shrink-0 border border-blue-200">
          {testimonial.clientName.charAt(0).toUpperCase()}
        </div>
        <div>
          <h4 className="font-bold text-slate-900">{testimonial.clientName}</h4>
          <p className="text-sm text-slate-500 font-medium">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;