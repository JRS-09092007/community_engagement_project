import { Link } from 'react-router';
import { Shield, Mail, Phone, MapPin, ExternalLink, ShieldAlert, Heart } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  const quickLinks = [
    { to: '/', label: t('navHome') },
    { to: '/services', label: t('navServices') },
    { to: '/schemes', label: t('navSchemes') },
    { to: '/cyber-safety', label: t('navCyberSafety') },
    { to: '/quiz', label: t('navQuiz') },
    { to: '/about', label: t('navAbout') },
    { to: '/feedback', label: t('navFeedback') },
  ];

  const officialLinks = [
    { label: 'India.gov.in', url: 'https://www.india.gov.in' },
    { label: 'UMANG Portal', url: 'https://web.umang.gov.in' },
    { label: 'DigiLocker', url: 'https://www.digilocker.gov.in' },
    { label: 'Voter Portal', url: 'https://voters.eci.gov.in' },
    { label: 'National Cyber Crime Portal', url: 'https://cybercrime.gov.in' },
    { label: 'PM-KISAN Portal', url: 'https://pmkisan.gov.in' },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* Educational Non-Alarming Disclaimer Banner */}
      <div className="bg-slate-950/80 py-6 border-b border-slate-800/80">
        <div className="page-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-950/40 border border-blue-500/20 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center flex-shrink-0">
              <ShieldAlert className="w-5 h-5 text-blue-400" />
            </div>
            <div className="flex-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-1">
                {t('disclaimerTitle')}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {t('disclaimerText')}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="page-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-md">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold text-white font-serif block leading-tight">
                  {t('brandName')}
                </span>
                <span className="text-xs text-slate-400">
                  {t('brandNameSubtitle')}
                </span>
              </div>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t('builtForCommunity')} — Creating awareness about Government of India digital services, welfare schemes, and cyber safety.
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-400">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <span>support@digitalcitizen.edu.in</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span>Cyber Helpline: 1930</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                <span>India</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-xs">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link to={link.to} className="hover:text-primary transition-colors flex items-center gap-1.5">
                    <span className="text-slate-500">•</span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Official Portals */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Official Government Portals
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {officialLinks.map((item, idx) => (
                <a
                  key={idx}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 flex items-center justify-between text-slate-300 hover:text-white transition-all group"
                >
                  <span className="font-medium">{item.label}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Digital Citizen. {t('builtForCommunity')}.</p>
          <div className="flex items-center gap-2">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 inline fill-red-500" />
            <span>for Citizens of India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
