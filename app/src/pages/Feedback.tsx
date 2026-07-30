import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MessageSquare,
  Send,
  Star,
  CheckCircle,
  Loader2,
  Mail,
  User,
  FileText,
  AlertCircle,
} from 'lucide-react';
import { feedbackAPI } from '@/lib/api';
import { useLanguage } from '@/context/LanguageContext';
import { toast } from 'sonner';

const feedbackCategories = [
  'Website usability',
  'Information clarity',
  'Language support',
  'Service information',
  'Cyber safety',
  'Suggestion',
];

export default function Feedback() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'Website usability',
    subject: '',
    message: '',
    rating: 5,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await feedbackAPI.submit({
        name: formData.name || 'Anonymous Citizen',
        email: formData.email || 'anonymous@citizen.org',
        type: formData.type,
        subject: formData.subject || formData.type,
        message: formData.message,
        rating: formData.rating,
      });
      setIsSubmitted(true);
      toast.success('Thank you for your valuable feedback!');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to submit feedback');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="pt-20 min-h-screen bg-slate-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto px-6 py-12 bg-white rounded-3xl border border-gray-200 shadow-xl"
        >
          <div className="w-20 h-20 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-md">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold font-serif text-gray-900 mb-2">Thank You!</h2>
          <p className="text-gray-600 text-sm mb-6 leading-relaxed">
            Your feedback helps us make government digital services and cyber safety information clearer for all citizens across India.
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setFormData({ name: '', email: '', type: 'Website usability', subject: '', message: '', rating: 5 });
            }}
            className="btn-primary text-sm font-bold px-6 py-3"
          >
            Submit Another Feedback
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="py-12 gradient-hero text-white">
        <div className="page-container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/90 text-xs font-bold uppercase tracking-wider mb-3">
              {t('navFeedback')}
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold font-serif mb-3">
              Citizen Feedback & Suggestions
            </h1>
            <p className="text-white/80 text-sm sm:text-base">
              Help us improve educational clarity, language translations, and digital service guidance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <section className="section-padding">
        <div className="page-container mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-gray-200 space-y-6">
              {/* Optional Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    <User className="w-3.5 h-3.5 inline mr-1 text-primary" />
                    Name (Optional)
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    <Mail className="w-3.5 h-3.5 inline mr-1 text-primary" />
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  <AlertCircle className="w-3.5 h-3.5 inline mr-1 text-primary" />
                  Feedback Category *
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all font-semibold text-gray-800"
                >
                  {feedbackCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  <FileText className="w-3.5 h-3.5 inline mr-1 text-primary" />
                  Subject / Topic
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all"
                  placeholder="e.g. Marathi translation clarification, DigiLocker guide feedback..."
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  <MessageSquare className="w-3.5 h-3.5 inline mr-1 text-primary" />
                  Message *
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all resize-none"
                  placeholder="Tell us how we can make this portal easier to use for citizens..."
                />
              </div>

              {/* Rating */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  <Star className="w-3.5 h-3.5 inline mr-1 text-primary" />
                  Rating
                </label>
                <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl border border-gray-200/80">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= formData.rating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-3 text-xs font-bold text-gray-600">
                    {formData.rating} / 5 Stars
                  </span>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary py-3.5 text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-50 shadow-md"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Citizen Feedback
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
