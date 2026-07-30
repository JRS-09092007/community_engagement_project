import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import {
  Shield,
  Mail,
  Lock,
  User,
  LogIn,
  UserPlus,
  Loader2,
  Eye,
  EyeOff,
  ArrowRight,
} from 'lucide-react';
import { authAPI } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

type Mode = 'login' | 'register';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [mode, setMode] = useState<Mode>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === 'register') {
        const res = await authAPI.register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        login(res.data.token, res.data.user);
        toast.success('Registration successful!');
        navigate('/');
      } else {
        const res = await authAPI.login({
          email: formData.email,
          password: formData.password,
        });
        login(res.data.token, res.data.user);
        toast.success('Login successful!');
        navigate('/');
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setFormData({ name: '', email: '', password: '' });
  };

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
      <div className="page-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          {/* Left side - Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden lg:block"
          >
            <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-serif">
              {mode === 'login' ? 'Welcome Back!' : 'Join Digital Citizen'}
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              {mode === 'login'
                ? 'Sign in to access your personalized dashboard, save favorite schemes, and track your quiz progress.'
                : 'Create an account to unlock personalized features, save favorite services, and test your knowledge with our awareness quiz.'}
            </p>
            <div className="space-y-4">
              {[
                'Access personalized dashboard',
                'Save favorite schemes & services',
                'Track quiz progress',
                'Get updates on new schemes',
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Shield className="w-3 h-3 text-emerald-600" />
                  </div>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
              <div className="text-center mb-6">
                <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4 lg:hidden">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 font-serif">
                  {mode === 'login' ? 'Sign In' : 'Create Account'}
                </h1>
                <p className="text-gray-500 text-sm mt-1">
                  {mode === 'login'
                    ? 'Enter your credentials to continue'
                    : 'Fill in your details to get started'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'register' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-1" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-1" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Lock className="w-4 h-4 inline mr-1" />
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      required
                      minLength={6}
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : mode === 'login' ? (
                    <>
                      <LogIn className="w-5 h-5" />
                      Sign In
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-5 h-5" />
                      Create Account
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <button
                  onClick={toggleMode}
                  className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                >
                  {mode === 'login' ? (
                    <>
                      Don't have an account? Register <ArrowRight className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      Already have an account? Sign In <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              {/* Admin hint */}
              <div className="mt-4 p-3 rounded-lg bg-blue-50 text-center">
                <p className="text-xs text-blue-600">
                  <strong>Demo Login:</strong><br />
                  Admin: admin@digitalcitizen.gov.in / admin123<br />
                  User: rahul@example.com / user123
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
