import React from 'react';

const Input = ({ label, name, type = 'text', error, className = '', ...rest }) => {
  const baseInputStyles = `w-full px-4 py-2.5 bg-white border rounded-lg focus:outline-none focus:ring-2 transition-shadow ${
    error 
      ? 'border-red-500 focus:ring-red-200' 
      : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
  } ${className}`;

  return (
    <div className="flex flex-col w-full mb-4">
      {label && (
        <label htmlFor={name} className="mb-1.5 text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      
      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          className={baseInputStyles}
          {...rest}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          className={baseInputStyles}
          {...rest}
        />
      )}
      
      {error && <span className="mt-1 text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default Input;