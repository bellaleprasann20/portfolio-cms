import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import Loader from '../components/common/Loader';
import ProjectForm from '../components/forms/ProjectForm';
 //import useCrud from '../hooks/useCrud'; // You'll need to build this hook next
 //import projectsApi from '../lib/api/projectsApi';

const Projects = () => {
  // Mocking the useCrud hook for now so the UI renders
  // const { items, loading, createItem, updateItem, deleteItem } = useCrud(projectsApi);
  const [items, setItems] = useState([
    { _id: '1', title: 'Real-Time Chat Application', techStack: 'React, Node.js, Socket.io' },
    { _id: '2', title: 'Atharv Preschool', techStack: 'MERN, Razorpay, Tailwind' }
  ]);
  const [loading, setLoading] = useState(false);
  
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

  const handleDelete = (id) => {
    if(window.confirm('Are you sure you want to delete this project?')) {
      // deleteItem(id);
      setItems(items.filter(i => i._id !== id));
    }
  };

  const handleSubmit = async (formData) => {
    setLoading(true);
    if (editingItem) {
      // await updateItem(editingItem._id, formData);
      setItems(items.map(i => i._id === editingItem._id ? { ...i, ...formData } : i));
    } else {
      // await createItem(formData);
      setItems([...items, { _id: Date.now().toString(), ...formData }]);
    }
    setLoading(false);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your portfolio showcase.</p>
        </div>
        <Button onClick={handleAdd} className="flex items-center">
          <Plus className="w-4 h-4 mr-2" /> Add Project
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading && items.length === 0 ? (
          <div className="p-8 flex justify-center"><Loader size="medium" /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-sm text-gray-600">
                  <th className="p-4 font-medium">Title</th>
                  <th className="p-4 font-medium">Tech Stack</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="p-8 text-center text-gray-500">No projects found. Add one!</td>
                  </tr>
                ) : (
                  items.map(item => (
                    <tr key={item._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-medium text-gray-900">{item.title}</td>
                      <td className="p-4 text-gray-500 text-sm">{item.techStack}</td>
                      <td className="p-4 flex justify-end gap-2">
                        <button onClick={() => handleEdit(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(item._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors">
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

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? 'Edit Project' : 'Add New Project'}
      >
        <ProjectForm 
          initialData={editingItem || {}} 
          onSubmit={handleSubmit} 
          onCancel={() => setIsModalOpen(false)}
          loading={loading}
        />
      </Modal>
    </div>
  );
};

export default Projects;