import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Clock } from 'lucide-react';
import Loader from '../common/Loader'; // Assuming this exists

const RecentMessages = ({ messages = [], loading = false }) => {
  if (loading) {
    return (
      <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Messages</h3>
        <div className="flex justify-center py-8">
          <Loader size="medium" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 flex items-center">
          <Mail className="w-5 h-5 mr-2 text-gray-500" />
          Recent Messages
        </h3>
        <Link 
          to="/messages" 
          className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
        >
          View All
        </Link>
      </div>
      
      <div className="space-y-3">
        {messages.length === 0 ? (
          <p className="text-sm text-center text-gray-500 py-6 bg-gray-50 rounded-lg">
            No new messages. Your inbox is clean!
          </p>
        ) : (
          messages.slice(0, 5).map((msg) => (
            <div 
              key={msg._id || msg.id} 
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-200"
            >
              <div className="mb-2 sm:mb-0">
                <p className="text-sm font-bold text-gray-900">{msg.name}</p>
                <p className="text-sm text-gray-500 truncate max-w-xs lg:max-w-md">
                  {msg.subject || msg.message}
                </p>
              </div>
              <div className="flex items-center text-xs text-gray-400">
                <Clock className="w-3 h-3 mr-1" />
                {new Date(msg.createdAt).toLocaleDateString(undefined, { 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentMessages;