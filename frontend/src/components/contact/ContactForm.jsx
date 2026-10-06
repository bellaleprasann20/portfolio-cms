import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import Input from '../common/Input';
import Button from '../common/Button';
import contactApi from '../../lib/api/contactApi';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // 'idle', 'submitting', 'success', 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      // In production, this connects to your FastAPI backend
      // await contactApi.submit(formData);
      
      // Mock success for UI testing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      setStatus('error');
      setErrorMessage(error.message || 'Something went wrong. Please try again or email me directly.');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-10 text-center animate-fade-in flex flex-col items-center justify-center h-full min-h-[400px]">
        <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-4" />
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
        <p className="text-emerald-700">Thank you for reaching out. I'll get back to you as soon as possible.</p>
        <Button 
          variant="outline" 
          onClick={() => setStatus('idle')} 
          className="mt-8 border-emerald-600 text-emerald-600 hover:bg-emerald-100"
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-100">
      <h3 className="text-2xl font-bold text-slate-900 mb-6">Send me a message</h3>
      
      {status === 'error' && (
        <div className="p-4 mb-6 text-sm text-red-600 bg-red-50 rounded-lg border border-red-200">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input 
            label="Your Name" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            placeholder="John Doe"
            required 
          />
          <Input 
            label="Email Address" 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            placeholder="john@example.com"
            required 
          />
        </div>
        
        <Input 
          label="Subject" 
          name="subject" 
          value={formData.subject} 
          onChange={handleChange} 
          placeholder="Freelance Project Inquiry"
          required 
        />
        
        <Input 
          label="Message" 
          type="textarea" 
          name="message" 
          value={formData.message} 
          onChange={handleChange} 
          rows={5}
          placeholder="Hi Prasann, I'd like to talk about..."
          required 
        />
        
        <Button 
          type="submit" 
          size="lg" 
          className="w-full flex items-center justify-center text-lg"
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? 'Sending...' : 'Send Message'} 
          {!status === 'submitting' && <Send className="w-5 h-5 ml-2" />}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;