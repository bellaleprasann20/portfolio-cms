import React, { useState } from 'react';

const BlogForm = ({ initialData = {}, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    excerpt: initialData.excerpt || '',
    content: initialData.content || '',
    status: initialData.status || 'Draft',
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); onSubmit(formData); };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Blog Title</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-blue-500" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Excerpt (Short summary)</label>
        <textarea name="excerpt" value={formData.excerpt} onChange={handleChange} rows="2" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-blue-500"></textarea>
      </div>
      <div>
        {/* Note: You can replace this textarea with your RichTextEditor.jsx component later */}
        <label className="block text-sm font-medium text-gray-700">Content (Markdown / HTML)</label>
        <textarea name="content" value={formData.content} onChange={handleChange} rows="8" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-blue-500 font-mono text-sm"></textarea>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Status</label>
        <select name="status" value={formData.status} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-blue-500">
          <option value="Draft">Draft</option>
          <option value="Published">Published</option>
        </select>
      </div>
      <div className="flex justify-end space-x-3 pt-4">
        <button type="button" onClick={onCancel} className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50">Cancel</button>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save Blog</button>
      </div>
    </form>
  );
};
export default BlogForm;