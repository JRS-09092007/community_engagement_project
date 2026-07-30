import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Loader2,
  Plus,
  Trash2,
  Save,
} from 'lucide-react';
import { schemesAPI } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

const categories = [
  'Student', 'Women', 'Farmer', 'Health', 'Labour',
  'Senior Citizen', 'Youth', 'Startup', 'Housing', 'Financial Inclusion',
];

const emptyScheme = {
  title: '',
  description: '',
  shortDescription: '',
  category: 'Student',
  ministry: '',
  benefits: [''],
  eligibility: '',
  documents: [''],
  applicationProcess: '',
  applicationUrl: '',
  helpline: '',
  budget: '',
  beneficiaries: '',
};

export default function ManageScheme() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [formData, setFormData] = useState(emptyScheme);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const isEditing = !!id;

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
      return;
    }
    if (isEditing) {
      fetchScheme();
    }
  }, [id, isAdmin, navigate]);

  const fetchScheme = async () => {
    try {
      setIsLoading(true);
      const res = await schemesAPI.getById(id!);
      const scheme = res.data.scheme;
      setFormData({
        title: scheme.title || '',
        description: scheme.description || '',
        shortDescription: scheme.shortDescription || '',
        category: scheme.category || 'Student',
        ministry: scheme.ministry || '',
        benefits: scheme.benefits?.length ? scheme.benefits : [''],
        eligibility: scheme.eligibility || '',
        documents: scheme.documents?.length ? scheme.documents : [''],
        applicationProcess: scheme.applicationProcess || '',
        applicationUrl: scheme.applicationUrl || '',
        helpline: scheme.helpline || '',
        budget: scheme.budget || '',
        beneficiaries: scheme.beneficiaries || '',
      });
    } catch {
      toast.error('Failed to load scheme');
      navigate('/admin');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (field: 'benefits' | 'documents', index: number, value: string) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayItem = (field: 'benefits' | 'documents') => {
    setFormData({ ...formData, [field]: [...formData[field], ''] });
  };

  const removeArrayItem = (field: 'benefits' | 'documents', index: number) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newArray.length ? newArray : [''] });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const data = {
        ...formData,
        benefits: formData.benefits.filter(Boolean),
        documents: formData.documents.filter(Boolean),
      };

      if (isEditing) {
        await schemesAPI.update(id!, data);
        toast.success('Scheme updated successfully');
      } else {
        await schemesAPI.create(data);
        toast.success('Scheme created successfully');
      }
      navigate('/admin');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to save scheme');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <section className="py-8 gradient-hero">
        <div className="page-container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link to="/admin" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold text-white font-serif">
              {isEditing ? 'Edit Scheme' : 'Add New Scheme'}
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="page-container mx-auto max-w-3xl">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-6"
          >
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder="Enter scheme title"
              />
            </div>

            {/* Short Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Short Description *</label>
              <input
                type="text"
                name="shortDescription"
                required
                maxLength={300}
                value={formData.shortDescription}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder="Brief description (max 300 characters)"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Description *</label>
              <textarea
                name="description"
                required
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                placeholder="Detailed description of the scheme"
              />
            </div>

            {/* Category & Ministry */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                <select
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ministry *</label>
                <input
                  type="text"
                  name="ministry"
                  required
                  value={formData.ministry}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="e.g., Ministry of Health"
                />
              </div>
            </div>

            {/* Benefits */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Benefits</label>
              {formData.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={benefit}
                    onChange={(e) => handleArrayChange('benefits', index, e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="Enter a benefit"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem('benefits', index)}
                    className="p-2.5 rounded-xl text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('benefits')}
                className="flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <Plus className="w-4 h-4" /> Add Benefit
              </button>
            </div>

            {/* Eligibility */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Eligibility *</label>
              <textarea
                name="eligibility"
                required
                rows={3}
                value={formData.eligibility}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                placeholder="Who can apply for this scheme?"
              />
            </div>

            {/* Documents */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Required Documents</label>
              {formData.documents.map((doc, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={doc}
                    onChange={(e) => handleArrayChange('documents', index, e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="Enter a required document"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem('documents', index)}
                    className="p-2.5 rounded-xl text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('documents')}
                className="flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <Plus className="w-4 h-4" /> Add Document
              </button>
            </div>

            {/* Application Process */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Application Process *</label>
              <textarea
                name="applicationProcess"
                required
                rows={3}
                value={formData.applicationProcess}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                placeholder="How to apply for this scheme?"
              />
            </div>

            {/* Optional Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Application URL</label>
                <input
                  type="url"
                  name="applicationUrl"
                  value={formData.applicationUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Helpline Number</label>
                <input
                  type="text"
                  name="helpline"
                  value={formData.helpline}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="e.g., 1800-123-4567"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Budget</label>
                <input
                  type="text"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="e.g., Rs. 10,000 Crore"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Beneficiaries</label>
                <input
                  type="text"
                  name="beneficiaries"
                  value={formData.beneficiaries}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="e.g., 10 Crore+"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="flex items-center gap-4 pt-4">
              <button
                type="submit"
                disabled={isSaving}
                className="btn-primary flex items-center gap-2 disabled:opacity-50"
              >
                {isSaving ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Save className="w-5 h-5" />
                )}
                {isEditing ? 'Update Scheme' : 'Create Scheme'}
              </button>
              <Link
                to="/admin"
                className="px-6 py-3 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Link>
            </div>
          </motion.form>
        </div>
      </section>
    </div>
  );
}
