import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Home,
  Info,
  Globe,
  Shield,
  ShieldAlert,
  HelpCircle,
  MessageSquare,
  LogIn,
  LogOut,
  LayoutDashboard,
  User,
  Languages,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage, type Language } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: '/', label: t('navHome'), icon: Home },
    { to: '/services', label: t('navServices'), icon: Globe },
    { to: '/schemes', label: t('navSchemes'), icon: Shield },
    { to: '/cyber-safety', label: t('navCyberSafety'), icon: ShieldAlert },
    { to: '/quiz', label: t('navQuiz'), icon: HelpCircle },
    { to: '/about', label: t('navAbout'), icon: Info },
    { to: '/feedback', label: t('navFeedback'), icon: MessageSquare },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const isLightHeaderPage = ['/about', '/services', '/schemes', '/cyber-safety', '/quiz', '/feedback', '/login', '/admin'].includes(location.pathname);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isLightHeaderPage
          ? 'bg-white/95 backdrop-blur-xl shadow-md border-b border-gray-200/80 text-gray-900'
          : 'bg-slate-900/60 backdrop-blur-md border-b border-white/10 text-white'
      }`}
    >
      <nav className="page-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold font-serif leading-tight text-primary">
                Digital Citizen
              </span>
              <span className="text-xs font-semibold text-gray-500 tracking-wider">
                डिजिटल नागरिक
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive(link.to)
                    ? 'text-primary bg-primary/10 font-semibold'
                    : isScrolled || isLightHeaderPage
                    ? 'text-gray-700 hover:text-primary hover:bg-gray-100'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Language Switcher & Auth */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language Switcher */}
            <div className="flex items-center bg-gray-100/90 dark:bg-gray-800 p-1 rounded-full border border-gray-200">
              <Languages className="w-4 h-4 ml-2 mr-1 text-gray-500" />
              {(['en', 'mr', 'hi'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all ${
                    language === lang
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {lang === 'en' ? 'EN' : lang === 'mr' ? 'मराठी' : 'हिंदी'}
                </button>
              ))}
            </div>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <Link to="/admin">
                    <Button variant="outline" size="sm" className="gap-2 border-primary/30 text-primary hover:bg-primary/10">
                      <LayoutDashboard className="w-4 h-4" />
                      {t('navDashboard')}
                    </Button>
                  </Link>
                )}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                  <User className="w-4 h-4 text-primary" />
                  <span className="text-xs font-semibold text-primary">{user?.name}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={logout} className="gap-1.5 text-red-500 hover:text-red-600 hover:bg-red-50">
                  <LogOut className="w-4 h-4" />
                  {t('navLogout')}
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button size="sm" className="btn-primary gap-2 text-xs">
                  <LogIn className="w-4 h-4" />
                  {t('navLogin')}
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Right Controls */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Mobile Language Switcher Pill */}
            <div className="flex items-center bg-gray-100 p-0.5 rounded-full border border-gray-200">
              {(['en', 'mr', 'hi'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                    language === lang ? 'bg-primary text-white' : 'text-gray-600'
                  }`}
                >
                  {lang === 'en' ? 'EN' : lang === 'mr' ? 'मराठी' : 'हिंदी'}
                </button>
              ))}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-xl border border-gray-200 bg-white text-gray-800 hover:bg-gray-100 shadow-sm"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-gray-200 shadow-2xl"
          >
            <div className="px-4 py-5 space-y-2 max-h-[80vh] overflow-y-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium transition-all ${
                    isActive(link.to)
                      ? 'bg-primary/10 text-primary font-bold border border-primary/20'
                      : 'text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  <link.icon className="w-5 h-5 text-primary" />
                  <span>{link.label}</span>
                </Link>
              ))}

              <div className="pt-4 border-t border-gray-200 space-y-2">
                {isAuthenticated ? (
                  <>
                    {isAdmin && (
                      <Link to="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100">
                        <LayoutDashboard className="w-5 h-5 text-primary" />
                        <span className="font-medium">{t('navDashboard')}</span>
                      </Link>
                    )}
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50"
                    >
                      <LogOut className="w-5 h-5" />
                      <span className="font-medium">{t('navLogout')}</span>
                    </button>
                  </>
                ) : (
                  <Link to="/login" className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-primary text-white font-semibold">
                    <LogIn className="w-5 h-5" />
                    <span>{t('navLogin')}</span>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
