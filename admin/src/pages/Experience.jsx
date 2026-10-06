import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import Loader from '../components/common/Loader';
import ExperienceForm from '../components/forms/ExperienceForm';
import { useCrud } from '../hooks/useCrud';
// import experienceApi from '../lib/api/experienceApi'; // Create this API client

const Experience = () => {
  // Pass your API object to the hook
  // const { items, loading, mutating, create, update, remove } = useCrud(experienceApi);
  
  // MOCK DATA for layout testing (Replace with the line above when API is ready)
  const { items, loading, mutating, create, update, remove } = {
    items: [{ id: '1', role: 'BCA Student', company: 'Guru Nanak First Grade College', type: 'Education', startDate: '2022-09-01', current: true }],
    loading: false, mutating: false,
    create: async () => {}, update: async () => {}, remove: async () => {}
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const handleAdd = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this experience entry?')) {
      await remove(id);
    }
  };

  const handleSubmit = async (formData) => {
    if (editingItem) {
      await update(editingItem.id || editingItem._id, formData);
    } else {
      await create(formData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Experience & Education</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your timeline and background.</p>
        </div>
        <Button onClick={handleAdd} className="flex items-center">
          <Plus className="w-4 h-4 mr-2" /> Add Entry
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 flex justify-center"><Loader size="medium" /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-sm text-gray-600">
                  <th className="p-4 font-medium">Role / Title</th>
                  <th className="p-4 font-medium">Organization</th>
                  <th className="p-4 font-medium">Type</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-8 text-center text-gray-500">No experience records found.</td>
                  </tr>
                ) : (
                  items.map(item => (
                    <tr key={item.id || item._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-medium text-gray-900">{item.role || item.title}</td>
                      <td className="p-4 text-gray-500 text-sm">{item.company || item.organization}</td>
                      <td className="p-4 text-gray-500 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.type === 'Work' ? 'bg-blue-100 text-blue-700' : item.type === 'Education' ? 'bg-emerald-100 text-emerald-700' : 'bg-purple-100 text-purple-700'}`}>
                          {item.type}
                        </span>
                      </td>
                      <td className="p-4 flex justify-end gap-2">
                        <button onClick={() => handleEdit(item)} disabled={mutating} className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors disabled:opacity-50">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(item.id || item._id)} disabled={mutating} className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingItem ? 'Edit Entry' : 'Add New Entry'}>
        <ExperienceForm initialData={editingItem || {}} onSubmit={handleSubmit} onCancel={() => setIsModalOpen(false)} loading={mutating} />
      </Modal>
    </div>
  );
};

export default Experience;