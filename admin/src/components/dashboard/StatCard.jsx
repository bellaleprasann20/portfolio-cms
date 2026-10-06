import React from 'react';

const StatCard = ({ title, value, icon: Icon, colorClass = "text-blue-600", bgClass = "bg-blue-100" }) => {
  return (
    <div className="flex items-center p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
      <div className={`p-3 rounded-full ${bgClass} ${colorClass} mr-4`}>
        {Icon && <Icon size={24} />}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      </div>
    </div>
  );
};

export default StatCard;