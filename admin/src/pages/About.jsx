import React, { useState, useEffect } from 'react';
import Loader from '../components/common/Loader';
import AboutForm from '../components/forms/AboutForm';
// import aboutApi from '../lib/api/aboutApi';

const About = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        // const res = await aboutApi.get();
        // setData(res.data);
        setTimeout(() => {
          setData({
            name: 'Prasann Bellale',
            role: 'Full Stack Developer (MERN)',
            bio: 'Full Stack MERN Developer (Fresher) with hands-on training...',
            email: 'prasannbellale@gmail.com',
          });
          setLoading(false);
        }, 500);
      } catch (err) {
        console.error("Failed to load about data");
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

  const handleSubmit = async (formData) => {
    setSaving(true);
    try {
      // await aboutApi.update(formData);
      setData(formData);
      alert('About information saved successfully!');
    } catch (err) {
      alert('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex justify-center p-12"><Loader size="large" /></div>;

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">About Information</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your public profile details and bio.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <AboutForm 
          initialData={data || {}} 
          onSubmit={handleSubmit} 
          onCancel={() => window.history.back()} 
          loading={saving} 
        />
      </div>
    </div>
  );
};

export default About;