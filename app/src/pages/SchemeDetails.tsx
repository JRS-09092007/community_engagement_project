import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Shield,
  CheckCircle,
  FileText,
  Phone,
  Loader2,
  AlertCircle,
  ExternalLink,
  Users,
  IndianRupee,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';
import { schemesAPI } from '@/lib/api';
import { useLanguage } from '@/context/LanguageContext';
import { toast } from 'sonner';

export default function SchemeDetails() {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();
  const [scheme, setScheme] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) fetchScheme();
  }, [id]);

  const fetchScheme = async () => {
    try {
      setIsLoading(true);
      const res = await schemesAPI.getById(id!);
      setScheme(res.data.scheme);
    } catch {
      toast.error('Failed to load scheme details');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <Loader2 className="w-10 h-10 animate-spin text-emerald-600" />
      </div>
    );
  }

  if (!scheme) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-600 mb-2">Scheme Not Found</h2>
          <Link to="/schemes" className="text-emerald-600 hover:underline">
            Back to Schemes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="py-16 gradient-hero text-white">
        <div className="page-container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/schemes"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors text-sm font-semibold"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Schemes
            </Link>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider">
                {scheme.category}
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/30 text-emerald-300 border border-emerald-400/40 text-xs font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t('officialSource')}</span>
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif mb-4 leading-tight">
              {scheme.title}
            </h1>
            <p className="text-white/80 max-w-3xl text-base sm:text-lg leading-relaxed">{scheme.shortDescription}</p>
          </motion.div>
        </div>
      </section>

      {/* Details */}
      <section className="section-padding">
        <div className="page-container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-8 space-y-8"
            >
              {/* About */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-serif flex items-center gap-3">
                  <Shield className="w-6 h-6 text-emerald-600" />
                  <span>About this Welfare Scheme</span>
                </h2>
                <p className="text-gray-700 leading-relaxed text-base whitespace-pre-line">
                  {scheme.description}
                </p>
              </div>

              {/* Benefits */}
              {scheme.benefits && scheme.benefits.length > 0 && (
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 font-serif flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-emerald-600" />
                    <span>Key Scheme Benefits</span>
                  </h2>
                  <div className="space-y-3">
                    {scheme.benefits.map((benefit: string, index: number) => (
                      <div key={index} className="flex items-start gap-3 p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-100">
                        <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-800 font-medium">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Eligibility & Application Notice */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200 space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-gray-900 text-lg">Eligibility Information</h3>
                    <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">
                      Educational Guidance
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-200">
                    {scheme.eligibility}
                  </p>
                  <p className="text-xs text-amber-700 font-semibold mt-2 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    <span>{t('checkEligibility')}</span>
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">How Citizens Apply</h3>
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line bg-gray-50 p-4 rounded-xl border border-gray-200">
                    {scheme.applicationProcess}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-4 space-y-6"
            >
              {/* Direct Access Box */}
              <div className="bg-gradient-to-br from-emerald-900 to-teal-950 p-6 rounded-2xl text-white shadow-xl space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-300">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Official Government Portal</span>
                </div>
                <h3 className="text-xl font-bold font-serif">Apply or Check Status</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Always use official government web portals for submitting documents and checking payment status.
                </p>
                {scheme.applicationUrl && (
                  <a
                    href={scheme.applicationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center gap-2 text-sm font-bold shadow-lg transition-all"
                  >
                    <span>{t('visitOfficialWebsite')}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>

              {/* Quick Facts */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 space-y-4">
                <h3 className="font-bold text-gray-900 text-base">Scheme Overview</h3>
                {scheme.ministry && (
                  <div className="text-xs">
                    <span className="text-gray-500 block">Ministry / Department</span>
                    <span className="font-bold text-gray-900">{scheme.ministry}</span>
                  </div>
                )}
                {scheme.budget && (
                  <div className="flex items-center gap-3 text-xs">
                    <IndianRupee className="w-4 h-4 text-emerald-600" />
                    <div>
                      <span className="text-gray-500 block">Annual Budget</span>
                      <span className="font-bold text-gray-900">{scheme.budget}</span>
                    </div>
                  </div>
                )}
                {scheme.beneficiaries && (
                  <div className="flex items-center gap-3 text-xs">
                    <Users className="w-4 h-4 text-blue-600" />
                    <div>
                      <span className="text-gray-500 block">Beneficiaries Reached</span>
                      <span className="font-bold text-gray-900">{scheme.beneficiaries}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Helpline */}
              {scheme.helpline && (
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                  <h3 className="font-bold text-gray-900 text-base mb-2 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-600" />
                    <span>Official Helpline</span>
                  </h3>
                  <a href={`tel:${scheme.helpline}`} className="text-lg font-bold text-emerald-700 hover:underline">
                    {scheme.helpline}
                  </a>
                </div>
              )}

              {/* Documents */}
              {scheme.documents && scheme.documents.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                  <h3 className="font-bold text-gray-900 text-base mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-600" />
                    <span>Required Documents</span>
                  </h3>
                  <ul className="space-y-2 text-xs text-gray-700">
                    {scheme.documents.map((doc: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
