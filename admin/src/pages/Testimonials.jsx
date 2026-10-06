import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import Loader from '../components/common/Loader';
import TestimonialForm from '../components/forms/TestimonialForm';

const Testimonials = () => {
  const { items, loading, mutating, create, update, remove } = {
    items: [
      { id: '1', clientName: 'Viral Jain', role: 'Python Mentor', message: 'Prasann demonstrated excellent aptitude during his Python project training.' }
    ],
    loading: false, mutating: false,
    create: async () => {}, update: async () => {}, remove: async () => {}
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const handleSubmit = async (formData) => {
    if (editingItem) await update(editingItem.id || editingItem._id, formData);
    else await create(formData);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Testimonials</h1>
        <Button onClick={() => { setEditingItem(null); setIsModalOpen(true); }}>
          <Plus className="w-4 h-4 mr-2 inline" /> Add Testimonial
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? <div className="p-8 flex justify-center"><Loader size="medium" /></div> : (
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-sm text-gray-600">
                <th className="p-4 font-medium">Client / Role</th>
                <th className="p-4 font-medium">Message</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="p-4">
                    <p className="font-medium text-gray-900">{item.clientName}</p>
                    <p className="text-xs text-gray-500">{item.role}</p>
                  </td>
                  <td className="p-4 text-sm text-gray-600 truncate max-w-xs">{item.message}</td>
                  <td className="p-4 flex justify-end gap-2">
                    <button onClick={() => { setEditingItem(item); setIsModalOpen(true); }} className="text-blue-600 p-2 hover:bg-blue-50 rounded"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => window.confirm('Delete?') && remove(item.id)} className="text-red-600 p-2 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingItem ? 'Edit Testimonial' : 'Add Testimonial'}>
        <TestimonialForm initialData={editingItem || {}} onSubmit={handleSubmit} onCancel={() => setIsModalOpen(false)} loading={mutating} />
      </Modal>
    </div>
  );
};

export default Testimonials;