import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import {
  Shield,
  Globe,
  Search,
  ArrowRight,
  FileCheck,
  Smartphone,
  Heart,
  GraduationCap,
  Wheat,
  Sparkles,
  ChevronRight,
  ShieldAlert,
  Vote,
  CalendarCheck,
  UserCheck,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  MapPinOff,
  FileText,
  TrendingUp,
  AlertTriangle,
} from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import { servicesAPI } from '@/lib/api';
import { useLanguage } from '@/context/LanguageContext';
import { toast } from 'sonner';

const categoryCards = [
  { id: 'Identity', nameKey: 'catDocuments', icon: FileCheck, color: 'from-blue-500 to-indigo-500' },
  { id: 'Health', nameKey: 'catHealth', icon: Heart, color: 'from-rose-500 to-pink-500' },
  { id: 'Farmer', nameKey: 'catFarmers', icon: Wheat, color: 'from-amber-500 to-emerald-500' },
  { id: 'Student', nameKey: 'catStudents', icon: GraduationCap, color: 'from-cyan-500 to-blue-500' },
  { id: 'Voting', nameKey: 'catVoting', icon: Vote, color: 'from-purple-500 to-violet-500' },
  { id: 'Governance', nameKey: 'catSchemes', icon: Shield, color: 'from-emerald-500 to-teal-500' },
  { id: 'Appointments', nameKey: 'catAppointments', icon: CalendarCheck, color: 'from-orange-500 to-amber-500' },
  { id: 'Safety', nameKey: 'catCyberSafety', icon: ShieldAlert, color: 'from-red-500 to-rose-500' },
];

const personaList = [
  { id: 'Student', key: 'personaStudent', desc: 'Scholarships, marksheets, DigiLocker, NSP portal', icon: GraduationCap },
  { id: 'Farmer', key: 'personaFarmer', desc: 'PM-KISAN income support, crop guidance, land records', icon: Wheat },
  { id: 'Patient', key: 'personaPatient', desc: 'e-Hospital OPD booking, Ayushman Bharat health card', icon: Heart },
  { id: 'Voter', key: 'personaVoter', desc: 'New voter registration, e-EPIC download, correction', icon: Vote },
  { id: 'Senior', key: 'personaSenior', desc: 'Pensions (PMVVY, APY, IGNOAPS), health benefits', icon: UserCheck },
  { id: 'General', key: 'personaGeneral', desc: 'Aadhaar, PAN, Passport, DigiLocker, UMANG app', icon: Globe },
];

export default function Home() {
  const { t } = useLanguage();
  const [services, setServices] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const servicesRes = await servicesAPI.getAll({ page: 1 });
        setServices(servicesRes.data.services || []);
      } catch {
        toast.error('Failed to load portal data');
      }
    };
    fetchData();
  }, []);

  const filteredServices = services.filter((s) => {
    const matchesSearch = !searchQuery || s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || s.category === selectedCategory || (selectedCategory === 'Safety' && s.category === 'Identity');
    const matchesPersona = !selectedPersona || s.eligibility?.toLowerCase().includes(selectedPersona.toLowerCase()) || s.category?.toLowerCase().includes(selectedPersona.toLowerCase());
    return matchesSearch && matchesCategory && matchesPersona;
  });

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center gradient-hero overflow-hidden pt-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative page-container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-xs sm:text-sm font-medium text-white">
                  {t('initiative')}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-serif leading-tight">
                Digital Citizen <br />
                <span className="text-3xl sm:text-4xl lg:text-5xl text-blue-300 font-sans font-normal">
                  डिजिटल नागरिक
                </span>
              </h1>

              <p className="text-xl sm:text-2xl font-semibold text-amber-300 font-serif">
                {t('tagline')}
              </p>

              <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-xl">
                {t('heroSubtitle')}
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link to="/services" className="btn-primary inline-flex items-center gap-2 text-sm sm:text-base">
                  {t('ctaExploreServices')}
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <Link
                  to="/cyber-safety"
                  className="px-6 py-3 rounded-xl font-semibold text-white bg-red-600/80 hover:bg-red-600 border border-red-400/40 shadow-lg transition-all inline-flex items-center gap-2 text-sm sm:text-base"
                >
                  <ShieldAlert className="w-5 h-5 text-amber-300" />
                  {t('ctaLearnSafety')}
                </Link>

                <Link
                  to="/quiz"
                  className="px-6 py-3 rounded-xl font-semibold text-white/90 border border-white/30 hover:bg-white/10 transition-all inline-flex items-center gap-2 text-sm sm:text-base"
                >
                  <HelpCircle className="w-5 h-5" />
                  {t('ctaTakeQuiz')}
                </Link>
              </div>
            </motion.div>

            {/* Hero Visual Card Stack */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative mx-auto max-w-sm sm:max-w-md bg-white/10 backdrop-blur-2xl p-6 rounded-3xl border border-white/20 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-white">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-sm">Citizen Phone Dashboard</h3>
                      <p className="text-xs text-white/70">Safe & Official Portals</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-400/30">
                    Verified .gov.in
                  </span>
                </div>

                {/* Quick Feature Badges */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-white/10 p-3 rounded-xl border border-white/10 text-white flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>DigiLocker Storage</span>
                  </div>
                  <div className="bg-white/10 p-3 rounded-xl border border-white/10 text-white flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <span>UMANG 1200+ Apps</span>
                  </div>
                  <div className="bg-white/10 p-3 rounded-xl border border-white/10 text-white flex items-center gap-2">
                    <Wheat className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span>PM-KISAN Direct</span>
                  </div>
                  <div className="bg-white/10 p-3 rounded-xl border border-white/10 text-white flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-rose-400 flex-shrink-0" />
                    <span>Cyber Helpline 1930</span>
                  </div>
                </div>

                <div className="bg-amber-500/20 border border-amber-400/30 p-3 rounded-xl text-amber-200 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <span>Always check domain ends in .gov.in before logging in</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Service Finder ("What do you need help with?") */}
      <section className="section-padding bg-slate-50 border-b border-gray-200">
        <div className="page-container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-3">
              Interactive Guidance
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 font-serif mb-3">
              {t('quickFinderTitle')}
            </h2>
            <p className="text-gray-600 text-base sm:text-lg">
              {t('quickFinderSubtitle')}
            </p>
          </div>

          {/* Search Box */}
          <div className="max-w-2xl mx-auto mb-10">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-sm text-base transition-all"
              />
            </div>
          </div>

          {/* Category Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 mb-10">
            {categoryCards.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(selectedCategory === cat.id ? null : cat.id);
                }}
                className={`p-4 rounded-2xl flex flex-col items-center justify-center text-center transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-primary text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200/80 shadow-sm'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl ${selectedCategory === cat.id ? 'bg-white/20' : 'bg-primary/10'} flex items-center justify-center mb-2`}>
                  <cat.icon className={`w-5 h-5 ${selectedCategory === cat.id ? 'text-white' : 'text-primary'}`} />
                </div>
                <span className="text-xs font-semibold">{t(cat.nameKey as any)}</span>
              </button>
            ))}
          </div>

          {/* Filtered Results Quick Preview */}
          {selectedCategory || searchQuery ? (
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900 text-lg">
                  Filtered Results ({filteredServices.length})
                </h3>
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setSearchQuery('');
                  }}
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  Clear Filters
                </button>
              </div>

              {filteredServices.length === 0 ? (
                <p className="text-gray-500 text-sm py-4">No matching services found. Try searching for DigiLocker, UMANG, or Voter services.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredServices.map((service) => (
                    <div key={service._id} className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded">
                          {service.category}
                        </span>
                        <h4 className="font-bold text-gray-900 mt-2 text-base">{service.title}</h4>
                        <p className="text-xs text-gray-600 line-clamp-2 mt-1">{service.shortDescription}</p>
                      </div>
                      <div className="mt-4 flex items-center justify-between pt-2 border-t border-gray-200/60">
                        <Link to={`/services/${service._id}`} className="text-xs font-bold text-primary flex items-center gap-1">
                          {t('learnHow')} <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                        {service.websiteUrl && (
                          <a href={service.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-gray-500 hover:text-gray-800">
                            {t('visitOfficialWebsite')}
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : null}
        </div>
      </section>

      {/* "I AM A..." Persona Filter Entry Point */}
      <section className="section-padding">
        <div className="page-container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
              Personalized Guidance
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 font-serif mb-3">
              {t('personaTitle')}
            </h2>
            <p className="text-gray-600 text-base sm:text-lg">
              {t('personaSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {personaList.map((persona) => {
              const isSelected = selectedPersona === persona.id;
              return (
                <div
                  key={persona.id}
                  onClick={() => setSelectedPersona(isSelected ? null : persona.id)}
                  className={`cursor-pointer p-6 rounded-2xl border transition-all ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-50/50 shadow-md ring-2 ring-emerald-500/20'
                      : 'border-gray-200 bg-white hover:border-emerald-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center">
                      <persona.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{t(persona.key as any)}</h3>
                      <span className="text-xs text-emerald-700 font-semibold">Educational Advice</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed mb-4">{persona.desc}</p>
                  <div className="flex items-center justify-between text-xs font-bold text-emerald-700">
                    <span>{isSelected ? 'Showing recommendations' : 'Click to view services'}</span>
                    <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'rotate-90' : ''}`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Digital Governance Matters */}
      <section className="section-padding bg-gradient-to-b from-gray-50 to-white border-y border-gray-200">
        <div className="page-container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3">
              Public Benefits
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 font-serif mb-3">
              {t('whyGovernanceTitle')}
            </h2>
            <p className="text-gray-600 text-base sm:text-lg">
              {t('whyGovernanceSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Easier Access', desc: 'Access government services anytime from your smartphone without visiting physical counters.', icon: Globe },
              { title: 'Track Application Status', desc: 'Check the real-time progress of your certificates, pensions, or voter applications online.', icon: TrendingUp },
              { title: 'Digital Documents', desc: 'Carry verified digital driving licenses, marksheets, and Aadhaar on DigiLocker without loss risk.', icon: FileCheck },
              { title: 'Less Travel & Waiting', desc: 'Save travel expenses and avoid long queues at government offices.', icon: Clock },
              { title: 'Increased Transparency', desc: 'Direct Benefit Transfer (DBT) sends money directly to beneficiary bank accounts.', icon: Shield },
              { title: '24/7 Availability', desc: 'Online portals and mobile apps like UMANG operate 24 hours a day, 7 days a week.', icon: Smartphone },
            ].map((item, idx) => (
              <GlassCard key={idx} className="h-full">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-primary flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* What is a Digital Citizen? */}
      <section className="section-padding bg-slate-900 text-white">
        <div className="page-container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-blue-300 text-xs font-bold uppercase tracking-wider">
                Core Principles
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-serif leading-tight">
                {t('whatIsCitizenTitle')}
              </h2>
              <p className="text-slate-300 text-base leading-relaxed">
                {t('whatIsCitizenSubtitle')}
              </p>

              <div className="space-y-3 pt-2">
                {[
                  'Uses official apps (.gov.in websites, DigiLocker, UMANG)',
                  'Uses digital documents responsibly & safely',
                  'Knows how to check application status independently',
                  'Protects personal information (never shares OTP or MPIN)',
                  'Avoids suspicious forwarded links and lottery scams',
                ].map((rule, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-slate-800/60 p-3.5 rounded-xl border border-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-200">{rule}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-gradient-to-br from-blue-600/30 to-cyan-600/30 p-8 rounded-3xl border border-white/10 text-center space-y-6 shadow-2xl">
                <div className="w-20 h-20 rounded-2xl bg-primary text-white flex items-center justify-center mx-auto shadow-lg">
                  <Shield className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold font-serif text-white">
                  Smart Use + Safe Use = Responsible Digital Citizenship
                </h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Digital literacy starts with knowing where to go, how to apply, and how to keep your family safe online.
                </p>
                <Link to="/cyber-safety" className="inline-flex items-center gap-2 btn-primary text-sm font-semibold">
                  Learn Cyber Safety Guidelines <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Traditional vs Digital Governance Comparison */}
      <section className="section-padding">
        <div className="page-container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 font-serif mb-3">
              {t('traditionalVsDigitalTitle')}
            </h2>
            <p className="text-gray-600 text-base sm:text-lg">
              {t('digitalMessage')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Traditional */}
            <div className="bg-red-50/40 p-6 sm:p-8 rounded-2xl border border-red-200/80">
              <div className="flex items-center gap-3 mb-6 text-red-700">
                <Clock className="w-7 h-7" />
                <h3 className="text-xl font-bold">Traditional Methods</h3>
              </div>
              <ul className="space-y-4 text-sm text-gray-700">
                <li className="flex items-center gap-3">
                  <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <span>{t('tradHours')}</span>
                </li>
                <li className="flex items-center gap-3">
                  <MapPinOff className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <span>{t('tradTravel')}</span>
                </li>
                <li className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <span>{t('tradPaper')}</span>
                </li>
                <li className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <span>{t('tradTracking')}</span>
                </li>
              </ul>
            </div>

            {/* Digital */}
            <div className="bg-emerald-50/40 p-6 sm:p-8 rounded-2xl border border-emerald-200/80">
              <div className="flex items-center gap-3 mb-6 text-emerald-700">
                <Globe className="w-7 h-7" />
                <h3 className="text-xl font-bold">Digital Governance</h3>
              </div>
              <ul className="space-y-4 text-sm text-gray-700">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span>{t('digiAccess')}</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span>{t('digiTravel')}</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span>{t('digiPaper')}</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span>{t('digiTracking')}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Quiz & Feedback CTA */}
      <section className="section-padding bg-gradient-to-r from-blue-700 to-indigo-800 text-white">
        <div className="page-container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-bold font-serif mb-4">
            Test Your Digital Awareness
          </h2>
          <p className="text-white/80 text-base sm:text-lg mb-8">
            Take our short interactive quiz on DigiLocker, UMANG, PM-KISAN, and OTP safety to receive your Digital Citizen Awareness Tier.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/quiz" className="px-8 py-4 rounded-xl bg-white text-primary font-bold shadow-lg hover:bg-slate-100 transition-all text-base">
              {t('ctaTakeQuiz')}
            </Link>
            <Link to="/feedback" className="px-8 py-4 rounded-xl border border-white/30 text-white font-semibold hover:bg-white/10 transition-all text-base">
              Give Feedback
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
