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
import { servicesAPI } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

const categories = [
  'Identity', 'Health', 'Education', 'Finance', 'Governance',
  'Employment', 'Travel', 'Social Welfare',
];

const emptyService = {
  title: '',
  description: '',
  shortDescription: '',
  category: 'Identity',
  websiteUrl: '',
  appUrl: '',
  features: [''],
  eligibility: 'All Indian citizens',
  documents: [''],
  steps: [{ title: '', description: '' }],
};

export default function ManageService() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [formData, setFormData] = useState(emptyService);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const isEditing = !!id;

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
      return;
    }
    if (isEditing) {
      fetchService();
    }
  }, [id, isAdmin, navigate]);

  const fetchService = async () => {
    try {
      setIsLoading(true);
      const res = await servicesAPI.getById(id!);
      const service = res.data.service;
      setFormData({
        title: service.title || '',
        description: service.description || '',
        shortDescription: service.shortDescription || '',
        category: service.category || 'Identity',
        websiteUrl: service.websiteUrl || '',
        appUrl: service.appUrl || '',
        features: service.features?.length ? service.features : [''],
        eligibility: service.eligibility || 'All Indian citizens',
        documents: service.documents?.length ? service.documents : [''],
        steps: service.steps?.length ? service.steps : [{ title: '', description: '' }],
      });
    } catch {
      toast.error('Failed to load service');
      navigate('/admin');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (field: 'features' | 'documents', index: number, value: string) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayItem = (field: 'features' | 'documents') => {
    setFormData({ ...formData, [field]: [...formData[field], ''] });
  };

  const removeArrayItem = (field: 'features' | 'documents', index: number) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newArray.length ? newArray : [''] });
  };

  const handleStepChange = (index: number, key: 'title' | 'description', value: string) => {
    const newSteps = [...formData.steps];
    newSteps[index] = { ...newSteps[index], [key]: value };
    setFormData({ ...formData, steps: newSteps });
  };

  const addStep = () => {
    setFormData({ ...formData, steps: [...formData.steps, { title: '', description: '' }] });
  };

  const removeStep = (index: number) => {
    const newSteps = formData.steps.filter((_, i) => i !== index);
    setFormData({ ...formData, steps: newSteps.length ? newSteps : [{ title: '', description: '' }] });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const data = {
        ...formData,
        features: formData.features.filter(Boolean),
        documents: formData.documents.filter(Boolean),
        steps: formData.steps.filter((s) => s.title || s.description),
      };

      if (isEditing) {
        await servicesAPI.update(id!, data);
        toast.success('Service updated successfully');
      } else {
        await servicesAPI.create(data);
        toast.success('Service created successfully');
      }
      navigate('/admin');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to save service');
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
              {isEditing ? 'Edit Service' : 'Add New Service'}
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
                placeholder="Enter service title"
              />
            </div>

            {/* Short Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Short Description *</label>
              <input
                type="text"
                name="shortDescription"
                required
                maxLength={200}
                value={formData.shortDescription}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder="Brief description (max 200 characters)"
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
                placeholder="Detailed description of the service"
              />
            </div>

            {/* Category */}
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

            {/* URLs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Website URL *</label>
                <input
                  type="url"
                  name="websiteUrl"
                  required
                  value={formData.websiteUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">App URL</label>
                <input
                  type="url"
                  name="appUrl"
                  value={formData.appUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="https://..."
                />
              </div>
            </div>

            {/* Features */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
              {formData.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleArrayChange('features', index, e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="Enter a feature"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem('features', index)}
                    className="p-2.5 rounded-xl text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('features')}
                className="flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <Plus className="w-4 h-4" /> Add Feature
              </button>
            </div>

            {/* Eligibility */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Eligibility</label>
              <input
                type="text"
                name="eligibility"
                value={formData.eligibility}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder="Who can use this service?"
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

            {/* Steps */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">How to Access Steps</label>
              {formData.steps.map((step, index) => (
                <div key={index} className="flex items-start gap-2 mb-3">
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={step.title}
                      onChange={(e) => handleStepChange(index, 'title', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      placeholder="Step title"
                    />
                    <input
                      type="text"
                      value={step.description}
                      onChange={(e) => handleStepChange(index, 'description', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      placeholder="Step description"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeStep(index)}
                    className="p-2.5 rounded-xl text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addStep}
                className="flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <Plus className="w-4 h-4" /> Add Step
              </button>
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
                {isEditing ? 'Update Service' : 'Create Service'}
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
