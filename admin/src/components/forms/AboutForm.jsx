import React, { useState } from 'react';
import Input from '../common/Input';
import Textarea from '../common/Textarea';
import Button from '../common/Button';

const AboutForm = ({ initialData = {}, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    role: initialData.role || '',
    bio: initialData.bio || '',
    email: initialData.email || '',
    resumeLink: initialData.resumeLink || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input 
        label="Name" 
        name="name" 
        value={formData.name} 
        onChange={handleChange} 
        placeholder="e.g., Prasann Bellale"
        required 
      />
      
      <Input 
        label="Headline / Role" 
        name="role" 
        value={formData.role} 
        onChange={handleChange} 
        placeholder="e.g., Full Stack Developer (MERN)"
        required 
      />

      <Textarea 
        label="Bio" 
        name="bio" 
        value={formData.bio} 
        onChange={handleChange} 
        rows={5}
        placeholder="Full Stack MERN Developer with hands-on training building production-style full-stack applications..."
        required 
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input 
          label="Email" 
          type="email"
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          placeholder="prasannbellale@gmail.com"
          required 
        />
        
        <Input 
          label="Resume Drive Link" 
          type="url"
          name="resumeLink" 
          value={formData.resumeLink} 
          onChange={handleChange} 
          placeholder="https://drive.google.com/..."
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? 'Saving...' : 'Save About Data'}
        </Button>
      </div>
    </form>
  );
};

export default AboutForm;