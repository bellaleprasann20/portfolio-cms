import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import Loader from '../components/common/Loader';
import ServiceForm from '../components/forms/ServiceForm';

const Services = () => {
  const { items, loading, mutating, create, update, remove } = {
    items: [
      { id: '1', title: 'Full Stack Development', description: 'Building end-to-end MERN applications.' },
      { id: '2', title: 'REST API Design', description: 'Creating secure, scalable backend endpoints with Node/Express.' }
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
        <h1 className="text-2xl font-bold text-gray-900">Services</h1>
        <Button onClick={() => { setEditingItem(null); setIsModalOpen(true); }} className="flex items-center">
          <Plus className="w-4 h-4 mr-2" /> Add Service
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? <Loader size="medium" /> : items.map(item => (
          <div key={item.id || item._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
              <p className="text-sm text-gray-500 mt-2">{item.description}</p>
            </div>
            <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-gray-50">
              <button onClick={() => { setEditingItem(item); setIsModalOpen(true); }} className="text-blue-600 p-2 hover:bg-blue-50 rounded"><Edit className="w-4 h-4" /></button>
              <button onClick={() => window.confirm('Delete?') && remove(item.id || item._id)} className="text-red-600 p-2 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingItem ? 'Edit Service' : 'Add Service'}>
        <ServiceForm initialData={editingItem || {}} onSubmit={handleSubmit} onCancel={() => setIsModalOpen(false)} loading={mutating} />
      </Modal>
    </div>
  );
};

export default Services;