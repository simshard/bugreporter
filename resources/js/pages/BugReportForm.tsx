import React, { useState, ChangeEvent, FormEvent } from 'react';
import { FaBug } from 'react-icons/fa';
import axios from 'axios';

interface BugReportFormState {
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
}

interface ValidationErrors {
  title?: string[];
  description?: string[];
  severity?: string[];
}

const BugReportForm: React.FC = () => {
  const [form, setForm] = useState<BugReportFormState>({
    title: '',
    description: '',
    severity: 'medium',
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [success, setSuccess] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSuccess('');
    try {
      await axios.post('/api/bug-reports', form);
      setSuccess('Bug reported!');
      setForm({ title: '', description: '', severity: 'medium' });
    } catch (err: any) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      }
    }
  };

   return (

    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded shadow">
     <h1 className="inline-flex items-center gap-2 text-2xl font-semibold text-gray-600 mb-4">
        <FaBug className="w-5 h-5" />Bug Reporter
     </h1>
     <div className="mb-4">
        <label className="block mb-1 text-gray-600 font-semibold">Title</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-gray-100 text-gray-600 border border-gray-300 rounded"
        />
        {errors.title && <div className="text-red-600 text-sm mt-1">{errors.title[0]}</div>}
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-gray-600 font-semibold">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-gray-100 text-gray-600 border border-gray-300 rounded"
        />
        {errors.description && <div className="text-red-600 text-sm mt-1">{errors.description[0]}</div>}
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-gray-600 font-semibold">Severity</label>
        <select
          name="severity"
          value={form.severity}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-gray-100 text-gray-600 border border-gray-300 rounded"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        {errors.severity && <div className="text-red-600 text-sm mt-1">{errors.severity[0]}</div>}
      </div>
      <button type="submit" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
         <FaBug className="w-3 h-3" />
        Report Bug
      </button>
      {success && <div className="text-green-600 mt-4">{success}</div>}
    </form>
  );
};

export default BugReportForm;
// This code defines a React component for a bug report form.
//  It includes state management for form
