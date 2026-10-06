import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import Loader from '../components/common/Loader';
import SkillForm from '../components/forms/SkillForm';
import { useCrud } from '../hooks/useCrud';
// import skillsApi from '../lib/api/skillsApi';

const Skills = () => {
  // const { items, loading, mutating, create, update, remove } = useCrud(skillsApi);
  const { items, loading, mutating, create, update, remove } = {
    items: [{ id: '1', name: 'React', category: 'Frontend' }, { id: '2', name: 'FastAPI', category: 'Backend' }],
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Skills</h1>
        </div>
        <Button onClick={() => { setEditingItem(null); setIsModalOpen(true); }} className="flex items-center">
          <Plus className="w-4 h-4 mr-2" /> Add Skill
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? <div className="p-8 flex justify-center"><Loader size="medium" /></div> : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-sm text-gray-600">
                <th className="p-4 font-medium">Skill Name</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id || item._id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-900">{item.name}</td>
                  <td className="p-4 text-gray-500 text-sm">{item.category}</td>
                  <td className="p-4 flex justify-end gap-2">
                    <button onClick={() => { setEditingItem(item); setIsModalOpen(true); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => window.confirm('Delete?') && remove(item.id || item._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-md"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingItem ? 'Edit Skill' : 'Add Skill'}>
        <SkillForm initialData={editingItem || {}} onSubmit={handleSubmit} onCancel={() => setIsModalOpen(false)} loading={mutating} />
      </Modal>
    </div>
  );
};

export default Skills;