import React from 'react';

const SectionTitle = ({ subtitle, title, alignment = 'left' }) => {
  const alignmentClass = alignment === 'center' ? 'text-center' : 'text-left';

  return (
    <div className={`mb-12 ${alignmentClass}`}>
      {subtitle && (
        <span className="block mb-2 text-sm font-semibold tracking-wider text-blue-600 uppercase">
          {subtitle}
        </span>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </h2>
      <div className={`w-16 h-1.5 mt-4 bg-blue-600 rounded-full ${alignment === 'center' ? 'mx-auto' : ''}`}></div>
    </div>
  );
};

export default SectionTitle;