import { motion } from 'framer-motion';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Lock,
  PhoneCall,
  ExternalLink,
  CheckCircle2,
  XCircle,
  FileWarning,
  Eye,
  KeyRound,
} from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import { useLanguage } from '@/context/LanguageContext';

export default function CyberSafety() {
  const { t } = useLanguage();

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Hero */}
      <section className="relative py-16 gradient-hero overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/20 backdrop-blur-3xl" />
        <div className="page-container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-sm font-medium mb-4">
              <ShieldAlert className="w-4 h-4" />
              <span>{t('catCyberSafety')}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 font-serif leading-tight">
              {t('cyberSafetyTitle')}
            </h1>
            <p className="text-white/80 text-lg leading-relaxed max-w-2xl">
              {t('cyberSafetySubtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Emergency Warning Banner */}
      <section className="section-padding py-8 bg-amber-500/10 border-y border-amber-500/20">
        <div className="page-container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-red-500/20 border-2 border-amber-500/40 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-amber-500 text-white flex items-center justify-center flex-shrink-0 shadow-md">
                <AlertTriangle className="w-8 h-8 animate-bounce" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-900 font-serif tracking-wide">
                  {t('warningTitle')}
                </h2>
                <p className="text-amber-800 text-base sm:text-lg font-medium mt-1">
                  {t('warningText')}
                </p>
              </div>
            </div>
            <div className="flex-shrink-0">
              <a
                href="https://cybercrime.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold shadow-md transition-all text-sm"
              >
                <PhoneCall className="w-4 h-4" />
                <span>{t('helplineText')}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3 Pillars of Safety: Never Share / Avoid / Always */}
      <section className="section-padding">
        <div className="page-container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Never Share */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <GlassCard className="h-full border-l-4 border-red-500 bg-red-50/20">
                <div className="w-12 h-12 rounded-xl bg-red-500 text-white flex items-center justify-center mb-4 shadow-md">
                  <XCircle className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{t('neverShareTitle')}</h3>
                <ul className="space-y-3">
                  {[
                    'SMS OTP for Aadhaar or Banking',
                    'MPIN / Banking PIN numbers',
                    'Passwords or Security Codes',
                    'Debit/Credit Card CVV numbers',
                    'Full Aadhaar number on public forms',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700 font-medium">
                      <span className="w-2 h-2 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>

            {/* Avoid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <GlassCard className="h-full border-l-4 border-amber-500 bg-amber-50/20">
                <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center mb-4 shadow-md">
                  <FileWarning className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{t('avoidTitle')}</h3>
                <ul className="space-y-3">
                  {[
                    'WhatsApp prize / lottery messages',
                    'Unknown APK app files forwarded on chat',
                    'Callers claiming to be bank or government officers asking for OTP',
                    'Urgent payment requests via SMS links',
                    'Unverified social media job offers',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700 font-medium">
                      <span className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>

            {/* Always */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <GlassCard className="h-full border-l-4 border-emerald-500 bg-emerald-50/20">
                <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center mb-4 shadow-md">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{t('alwaysTitle')}</h3>
                <ul className="space-y-3">
                  {[
                    'Check address ends with .gov.in or .nic.in',
                    'Download apps only from Google Play Store / Apple App Store',
                    'Keep phone lock screen and device lock enabled',
                    'Report online fraud immediately to 1930',
                    'Verify identity before clicking forwarded links',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700 font-medium">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Official Website Verification Guide */}
      <section className="section-padding bg-gray-100/60">
        <div className="page-container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 font-serif mb-4">
              {t('officialVerificationTitle')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('officialVerificationSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Genuine Portal */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-emerald-500/30 shadow-md">
              <div className="flex items-center gap-3 mb-4 text-emerald-600">
                <ShieldCheck className="w-7 h-7" />
                <h3 className="text-xl font-bold">Genuine Government Website</h3>
              </div>
              <div className="bg-emerald-50 p-4 rounded-xl text-xs font-mono text-emerald-900 border border-emerald-200 mb-4">
                https://<span className="font-bold underline">web.umang.gov.in</span>
                <br />
                https://<span className="font-bold underline">pmkisan.gov.in</span>
                <br />
                https://<span className="font-bold underline">digilocker.gov.in</span>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  Ends strictly in <code className="bg-gray-100 px-1 py-0.5 rounded font-bold">.gov.in</code> or <code className="bg-gray-100 px-1 py-0.5 rounded font-bold">.nic.in</code>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  Uses HTTPS secure protocol (padlock icon in address bar)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  Provides official contact info & grievance helpline numbers
                </li>
              </ul>
            </div>

            {/* Fake / Suspicious Site */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-red-500/30 shadow-md">
              <div className="flex items-center gap-3 mb-4 text-red-600">
                <XCircle className="w-7 h-7" />
                <h3 className="text-xl font-bold">Fake or Fraudulent Website</h3>
              </div>
              <div className="bg-red-50 p-4 rounded-xl text-xs font-mono text-red-900 border border-red-200 mb-4">
                http://<span className="font-bold text-red-600">umang-free-offer.com</span>
                <br />
                http://<span className="font-bold text-red-600">pmkisan-yojana-reg.org</span>
                <br />
                http://<span className="font-bold text-red-600">digilocker-download.apk</span>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                  Uses domain extensions like <code className="bg-gray-100 px-1 py-0.5 rounded font-bold">.com</code>, <code className="bg-gray-100 px-1 py-0.5 rounded font-bold">.xyz</code>, <code className="bg-gray-100 px-1 py-0.5 rounded font-bold">.info</code>
                </li>
                <li className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                  Promises instant cash or prize money for entering OTP
                </li>
                <li className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                  Asks you to download APK files outside official stores
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Cybercrime Reporting Steps */}
      <section className="section-padding">
        <div className="page-container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 font-serif mb-4">
              What to do if you face financial cyber fraud?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Act quickly within the "Golden Hour" (first 1-2 hours) to minimize financial loss
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '1',
                title: 'Call Helpline 1930',
                desc: 'Immediately dial 1930 to report financial fraud to the National Cyber Crime Reporting Portal.',
                icon: PhoneCall,
                color: 'bg-blue-500',
              },
              {
                step: '2',
                title: 'Block Bank Cards & UPI',
                desc: 'Call your bank helpline to block your ATM card, UPI account, and mobile banking app.',
                icon: KeyRound,
                color: 'bg-emerald-500',
              },
              {
                step: '3',
                title: 'File Online Complaint',
                desc: 'Lodge an official report on cybercrime.gov.in with transaction details and screenshots.',
                icon: Eye,
                color: 'bg-amber-500',
              },
              {
                step: '4',
                title: 'Visit Nearest Police Station',
                desc: 'Submit a copy of your complaint to your local police station cyber cell for follow up.',
                icon: Lock,
                color: 'bg-purple-500',
              },
            ].map((item, i) => (
              <GlassCard key={i} className="text-center h-full">
                <div className={`w-14 h-14 rounded-2xl ${item.color} text-white flex items-center justify-center mx-auto mb-4 font-bold text-xl shadow-md`}>
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
