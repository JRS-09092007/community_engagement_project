import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import {
  Search,
  Globe,
  Filter,
  ArrowRight,
  Loader2,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import { servicesAPI } from '@/lib/api';
import { useLanguage } from '@/context/LanguageContext';
import { toast } from 'sonner';

export default function Services() {
  const { t } = useLanguage();
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchServices();
    fetchCategories();
  }, [activeCategory, searchQuery]);

  const fetchServices = async () => {
    try {
      setIsLoading(true);
      const params: any = {};
      if (activeCategory !== 'All') params.category = activeCategory;
      if (searchQuery) params.search = searchQuery;
      const res = await servicesAPI.getAll(params);
      setServices(res.data.services || []);
    } catch {
      toast.error('Failed to load services');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await servicesAPI.getCategories();
      setCategories(res.data.categories || ['All']);
    } catch {
      // Use default
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="py-16 gradient-hero text-white">
        <div className="page-container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/90 text-xs font-bold uppercase tracking-wider mb-4">
              {t('navServices')}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif mb-4 leading-tight">
              {t('popularServicesTitle')}
            </h1>
            <p className="text-white/80 text-base sm:text-lg leading-relaxed">
              Discover official Government of India digital services, learn step-by-step registration guidelines, and access official portals safely.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="section-padding pb-0">
        <div className="page-container mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-sm text-sm transition-all"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
            <Filter className="w-4 h-4 text-gray-400 flex-shrink-0 ml-1" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding pt-0">
        <div className="page-container mx-auto">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 shadow-sm">
              <Globe className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-700 mb-2">No services found</h3>
              <p className="text-sm text-gray-500">Try adjusting your search query or selected category.</p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {services.map((service: any, index: number) => (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                >
                  <GlassCard className="h-full flex flex-col justify-between border border-gray-200/80 hover:shadow-xl transition-all">
                    <div>
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-white shadow-md">
                          <Globe className="w-6 h-6" />
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-primary text-[10px] font-bold uppercase tracking-wider border border-blue-200">
                            {service.category}
                          </span>
                          <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3" />
                            {t('officialSource')}
                          </span>
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                      <p className="text-xs text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                        {service.shortDescription}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 gap-2">
                      <Link
                        to={`/services/${service._id}`}
                        className="btn-primary text-xs px-4 py-2 inline-flex items-center gap-1 font-bold"
                      >
                        <span>{t('learnHow')}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      {service.websiteUrl && (
                        <a
                          href={service.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold flex items-center gap-1 transition-colors"
                        >
                          <span>Portal</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
