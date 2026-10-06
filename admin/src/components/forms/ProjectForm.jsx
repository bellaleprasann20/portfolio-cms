import React, { useState } from 'react';

const ProjectForm = ({ initialData = {}, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    techStack: initialData.techStack || '',
    githubLink: initialData.githubLink || '',
    liveLink: initialData.liveLink || '',
    imageUrl: initialData.imageUrl || '',
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); onSubmit(formData); };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Project Title</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-blue-500" placeholder="e.g., Real-Time Chat Application" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange} rows="3" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-blue-500" placeholder="Built a real-time messaging platform using Socket.io..."></textarea>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Tech Stack (comma separated)</label>
        <input type="text" name="techStack" value={formData.techStack} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-blue-500" placeholder="React, Node.js, Express, MongoDB, Socket.io" />
      </div>
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">GitHub Link</label>
          <input type="url" name="githubLink" value={formData.githubLink} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-blue-500" />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Live Demo Link</label>
          <input type="url" name="liveLink" value={formData.liveLink} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-blue-500" />
        </div>
      </div>
      <div className="flex justify-end space-x-3 pt-4">
        <button type="button" onClick={onCancel} className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50">Cancel</button>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save Project</button>
      </div>
    </form>
  );
};
export default ProjectForm;