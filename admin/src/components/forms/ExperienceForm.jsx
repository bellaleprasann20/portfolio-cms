import React, { useState } from 'react';

const ExperienceForm = ({ initialData = {}, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    organization: initialData.organization || '',
    type: initialData.type || 'Work', // Work, Education, Training
    startDate: initialData.startDate || '',
    endDate: initialData.endDate || '',
    description: initialData.description || '',
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); onSubmit(formData); };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Title / Degree</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-blue-500" placeholder="e.g., Bachelor of Computer Applications" />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Organization / College</label>
          <input type="text" name="organization" value={formData.organization} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-blue-500" placeholder="e.g., Guru Nanak First Grade College" />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Start Date</label>
          <input type="text" name="startDate" value={formData.startDate} onChange={handleChange} required placeholder="e.g., Sep 2022" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-blue-500" />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">End Date</label>
          <input type="text" name="endDate" value={formData.endDate} onChange={handleChange} placeholder="e.g., Mar 2025 or Present" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-blue-500" />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select name="type" value={formData.type} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-blue-500">
            <option value="Work">Work</option>
            <option value="Education">Education</option>
            <option value="Training">Training</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange} rows="3" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-blue-500"></textarea>
      </div>
      <div className="flex justify-end space-x-3 pt-4">
        <button type="button" onClick={onCancel} className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50">Cancel</button>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save Experience</button>
      </div>
    </form>
  );
};
export default ExperienceForm;