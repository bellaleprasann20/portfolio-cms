import React, { useState } from 'react';

const TestimonialForm = ({ initialData = {}, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    clientName: initialData.clientName || '',
    role: initialData.role || '',
    message: initialData.message || '',
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); onSubmit(formData); };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Client Name</label>
          <input type="text" name="clientName" value={formData.clientName} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-blue-500" />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Role / Company</label>
          <input type="text" name="role" value={formData.role} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-blue-500" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Testimonial Message</label>
        <textarea name="message" value={formData.message} onChange={handleChange} rows="4" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-blue-500"></textarea>
      </div>
      <div className="flex justify-end space-x-3 pt-4">
        <button type="button" onClick={onCancel} className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50">Cancel</button>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save Testimonial</button>
      </div>
    </form>
  );
};
export default TestimonialForm;