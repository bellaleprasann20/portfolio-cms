import React, { useState } from 'react';
import { UploadCloud, Trash2, Copy } from 'lucide-react';
import Button from '../components/common/Button';

const Media = () => {
  const [isUploading, setIsUploading] = useState(false);
  
  // Mock data representing files returned from your FastAPI /upload endpoint
  const [files, setFiles] = useState([
    { id: '1', url: 'https://via.placeholder.com/300x200?text=Chat+App', name: 'chat-app-thumb.jpg' },
    { id: '2', url: 'https://via.placeholder.com/300x200?text=Atharv+Preschool', name: 'atharv-dashboard.png' }
  ]);

  const handleUpload = (e) => {
    // In reality, you'd send formData to your FastAPI backend here
    setIsUploading(true);
    setTimeout(() => setIsUploading(false), 1000); 
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    alert('URL copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Media Library</h1>
        
        <label className="cursor-pointer">
          <input type="file" className="hidden" onChange={handleUpload} multiple />
          <div className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium text-sm">
            <UploadCloud className="w-4 h-4 mr-2" />
            {isUploading ? 'Uploading...' : 'Upload File'}
          </div>
        </label>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {files.map(file => (
          <div key={file.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm group">
            <div className="aspect-w-16 aspect-h-10 bg-gray-100">
              <img src={file.url} alt={file.name} className="object-cover w-full h-32" />
            </div>
            <div className="p-3">
              <p className="text-xs text-gray-600 truncate font-medium">{file.name}</p>
              <div className="flex justify-between mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => copyToClipboard(file.url)} className="text-gray-500 hover:text-blue-600" title="Copy URL">
                  <Copy className="w-4 h-4" />
                </button>
                <button onClick={() => setFiles(files.filter(f => f.id !== file.id))} className="text-gray-500 hover:text-red-600" title="Delete">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Media;