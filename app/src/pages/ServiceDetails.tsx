import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Globe,
  ExternalLink,
  CheckCircle,
  FileText,
  ListOrdered,
  Loader2,
  AlertCircle,
  ShieldCheck,
  AlertTriangle,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';
import { servicesAPI } from '@/lib/api';
import { useLanguage } from '@/context/LanguageContext';
import { toast } from 'sonner';

export default function ServiceDetails() {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();
  const [service, setService] = useState<any>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) fetchService();
  }, [id]);

  const fetchService = async () => {
    try {
      setIsLoading(true);
      const res = await servicesAPI.getById(id!);
      setService(res.data.service);
    } catch {
      toast.error('Failed to load service details');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-600 mb-2">Service Not Found</h2>
          <Link to="/services" className="text-primary hover:underline">
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  const steps = service.steps || [
    { title: 'Step 1: Select Language', description: 'Choose English, Marathi, or Hindi on the official app/portal.', tip: 'Make sure you are on the genuine portal' },
    { title: 'Step 2: Mobile Number Registration', description: 'Enter your Aadhaar-linked mobile number to receive OTP.', tip: 'Never share this OTP with anyone over phone call' },
    { title: 'Step 3: OTP Verification', description: 'Enter the 6-digit OTP received via SMS.', tip: 'Check SMS sender ID before submitting' },
    { title: 'Step 4: Set Security MPIN', description: 'Create a confidential 4-digit MPIN for quick login.', tip: 'Do not use simple PINs like 1234 or your birth year' },
    { title: 'Step 5: Access Digital Services', description: 'Browse and apply for government services digitally.', tip: 'Always log out when using public cyber cafés' },
  ];

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
              to="/services"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors text-sm font-semibold"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Services
            </Link>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider">
                {service.category}
              </span>
              {service.websiteUrl && (
                <span className="px-3 py-1 rounded-full bg-emerald-500/30 text-emerald-300 border border-emerald-400/40 text-xs font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{t('officialSource')}</span>
                </span>
              )}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif mb-4 leading-tight">
              {service.title}
            </h1>
            <p className="text-white/80 max-w-3xl text-base sm:text-lg leading-relaxed">{service.shortDescription}</p>
          </motion.div>
        </div>
      </section>

      {/* Main Details Grid */}
      <section className="section-padding">
        <div className="page-container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-8 space-y-8"
            >
              {/* About Service */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-serif flex items-center gap-3">
                  <Globe className="w-6 h-6 text-primary" />
                  <span>About this Service</span>
                </h2>
                <p className="text-gray-700 leading-relaxed text-base whitespace-pre-line">
                  {service.description}
                </p>
              </div>

              {/* Step-by-Step Interactive Registration Guide */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-gray-100 pb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 font-serif flex items-center gap-3">
                      <ListOrdered className="w-6 h-6 text-primary" />
                      <span>Step-by-Step Registration Guide</span>
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">Interactive step walkthrough with safety tips</p>
                  </div>
                  {service.websiteUrl && (
                    <a
                      href={service.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary text-xs px-4 py-2 inline-flex items-center gap-1.5 self-start sm:self-auto"
                    >
                      <span>{t('visitOfficialWebsite')}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex items-center justify-between text-xs text-gray-500 font-semibold mb-2">
                    <span>Step {activeStepIndex + 1} of {steps.length}</span>
                    <span>{Math.round(((activeStepIndex + 1) / steps.length) * 100)}% Guide Progress</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full gradient-primary transition-all duration-300"
                      style={{ width: `${((activeStepIndex + 1) / steps.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Steps Accordion / Tabs */}
                <div className="space-y-4">
                  {steps.map((step: any, idx: number) => {
                    const isActive = activeStepIndex === idx;
                    return (
                      <div
                        key={idx}
                        onClick={() => setActiveStepIndex(idx)}
                        className={`cursor-pointer p-5 rounded-2xl border transition-all ${
                          isActive
                            ? 'border-primary bg-primary/5 ring-2 ring-primary/20 shadow-md'
                            : 'border-gray-200 bg-gray-50/50 hover:bg-gray-100/80'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 transition-colors ${
                              isActive ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'
                            }`}
                          >
                            {idx + 1}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-bold text-gray-900 text-base">{step.title}</h3>
                              <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${isActive ? 'rotate-90 text-primary' : ''}`} />
                            </div>
                            <p className="text-sm text-gray-600 mt-1 leading-relaxed">{step.description}</p>

                            {/* Safety Tip for Step */}
                            {isActive && (
                              <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-900 text-xs flex items-start gap-2">
                                <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                                <div>
                                  <span className="font-bold">Cyber Safety Tip: </span>
                                  <span>{step.tip || 'Never share your OTP, password, or PIN with callers.'}</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Key Features */}
              {service.features && service.features.length > 0 && (
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 font-serif flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-emerald-500" />
                    <span>Key Features & Benefits</span>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.features.map((feature: string, index: number) => (
                      <div key={index} className="flex items-start gap-3 p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-100">
                        <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-800">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Sidebar Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-4 space-y-6"
            >
              {/* Direct Official Access Button */}
              <div className="bg-gradient-to-br from-blue-900 to-indigo-950 p-6 rounded-2xl text-white shadow-xl space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-300">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verified Government Source</span>
                </div>
                <h3 className="text-xl font-bold font-serif">Access Official Portal</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Our platform educates you. To perform actual transactions, click below to open the official website safely.
                </p>
                {service.websiteUrl && (
                  <a
                    href={service.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full btn-primary py-3 flex items-center justify-center gap-2 text-sm font-bold shadow-lg"
                  >
                    <span>{t('visitOfficialWebsite')}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                {service.appUrl && (
                  <a
                    href={service.appUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-2 text-xs font-bold transition-all"
                  >
                    <span>Download Mobile App</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              {/* Eligibility */}
              {service.eligibility && (
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                  <h3 className="font-bold text-gray-900 text-base mb-2">Eligibility Criteria</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{service.eligibility}</p>
                </div>
              )}

              {/* Required Documents */}
              {service.documents && service.documents.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                  <h3 className="font-bold text-gray-900 text-base mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary" />
                    <span>Required Documents</span>
                  </h3>
                  <ul className="space-y-2 text-xs text-gray-700">
                    {service.documents.map((doc: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Cyber Safety Warning Card */}
              <div className="bg-red-50 p-6 rounded-2xl border border-red-200 space-y-3">
                <div className="flex items-center gap-2 text-red-700 font-bold text-sm">
                  <ShieldAlert className="w-5 h-5" />
                  <span>Important Cyber Safety Tip</span>
                </div>
                <p className="text-xs text-red-800 leading-relaxed">
                  Never pay money to unauthorized agents for free government services. Always verify website address ends with <code className="font-bold">.gov.in</code>.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
