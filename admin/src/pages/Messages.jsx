import React, { useState } from 'react';
import { Trash2, Eye, Mail } from 'lucide-react';
import Modal from '../components/common/Modal';
import Loader from '../components/common/Loader';
import Button from '../components/common/Button';

const Messages = () => {
  const { items, loading, remove } = {
    items: [
      { id: '1', name: 'Recruiter', email: 'hr@example.com', subject: 'Interview Opportunity', message: 'Hi Prasann, we loved your MERN projects...', createdAt: new Date().toISOString() }
    ],
    loading: false, remove: async () => {}
  };

  const [viewingMsg, setViewingMsg] = useState(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Inbox</h1>
        <p className="text-sm text-gray-500 mt-1">Messages from your portfolio contact form.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? <div className="p-8 flex justify-center"><Loader size="medium" /></div> : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-sm text-gray-600">
                <th className="p-4 font-medium">Sender</th>
                <th className="p-4 font-medium">Subject</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="p-4">
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.email}</p>
                  </td>
                  <td className="p-4 text-sm text-gray-600">{item.subject}</td>
                  <td className="p-4 text-sm text-gray-500">{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td className="p-4 flex justify-end gap-2">
                    <button onClick={() => setViewingMsg(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"><Eye className="w-4 h-4" /></button>
                    <button onClick={() => window.confirm('Delete message?') && remove(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-md"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Modal isOpen={!!viewingMsg} onClose={() => setViewingMsg(null)} title="Message Details">
        {viewingMsg && (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">From</p>
              <p className="font-medium">{viewingMsg.name} ({viewingMsg.email})</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Subject</p>
              <p className="font-medium">{viewingMsg.subject}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Message</p>
              <div className="mt-2 p-4 bg-gray-50 rounded-md text-gray-700 whitespace-pre-wrap text-sm">
                {viewingMsg.message}
              </div>
            </div>
            <div className="flex justify-end pt-4">
              <Button variant="outline" onClick={() => setViewingMsg(null)}>Close</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Messages;