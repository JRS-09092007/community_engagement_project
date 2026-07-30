import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import {
  Shield,
  Globe,
  MessageSquare,
  Users,
  Plus,
  Pencil,
  Trash2,
  Eye,
  Loader2,
  LogOut,
  Star,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { servicesAPI, schemesAPI, feedbackAPI, authAPI } from '@/lib/api';
import { toast } from 'sonner';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin, isLoading: authLoading, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'schemes' | 'services' | 'feedback' | 'users'>('schemes');
  const [schemes, setSchemes] = useState([]);
  const [services, setServices] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalSchemes: 0,
    totalServices: 0,
    totalFeedback: 0,
    totalUsers: 0,
    unreadFeedback: 0,
    avgRating: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        navigate('/login');
      } else if (!isAdmin) {
        navigate('/');
        toast.error('Access denied. Admin privileges required.');
      } else {
        fetchData();
      }
    }
  }, [authLoading, isAuthenticated, isAdmin, navigate]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [schemesRes, servicesRes, feedbacksRes, usersRes, feedbackStatsRes] = await Promise.all([
        schemesAPI.getAll(),
        servicesAPI.getAll(),
        feedbackAPI.getAll(),
        authAPI.getUsers(),
        feedbackAPI.getStats(),
      ]);

      setSchemes(schemesRes.data.schemes || []);
      setServices(servicesRes.data.services || []);
      setFeedbacks(feedbacksRes.data.feedbacks || []);
      setUsers(usersRes.data.users || []);

      setStats({
        totalSchemes: schemesRes.data.total || 0,
        totalServices: servicesRes.data.total || 0,
        totalFeedback: feedbacksRes.data.total || 0,
        totalUsers: usersRes.data.users?.length || 0,
        unreadFeedback: feedbackStatsRes.data.stats?.unread || 0,
        avgRating: feedbackStatsRes.data.stats?.averageRating || 0,
      });
    } catch {
      toast.error('Failed to load admin data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteScheme = async (id: string) => {
    if (!confirm('Are you sure you want to delete this scheme?')) return;
    try {
      await schemesAPI.delete(id);
      toast.success('Scheme deleted successfully');
      fetchData();
    } catch {
      toast.error('Failed to delete scheme');
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    try {
      await servicesAPI.delete(id);
      toast.success('Service deleted successfully');
      fetchData();
    } catch {
      toast.error('Failed to delete service');
    }
  };

  const handleDeleteFeedback = async (id: string) => {
    if (!confirm('Are you sure you want to delete this feedback?')) return;
    try {
      await feedbackAPI.delete(id);
      toast.success('Feedback deleted');
      fetchData();
    } catch {
      toast.error('Failed to delete feedback');
    }
  };

  const handleUpdateFeedbackStatus = async (id: string, status: string) => {
    try {
      await feedbackAPI.update(id, { status });
      toast.success('Feedback status updated');
      fetchData();
    } catch {
      toast.error('Failed to update feedback');
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  const tabs = [
    { key: 'schemes' as const, label: 'Schemes', icon: Shield, count: stats.totalSchemes },
    { key: 'services' as const, label: 'Services', icon: Globe, count: stats.totalServices },
    { key: 'feedback' as const, label: 'Feedback', icon: MessageSquare, count: stats.totalFeedback },
    { key: 'users' as const, label: 'Users', icon: Users, count: stats.totalUsers },
  ];

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <section className="py-8 gradient-hero">
        <div className="page-container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white font-serif">Admin Dashboard</h1>
              <p className="text-white/80">Manage services, schemes, feedback, and users</p>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding pb-0">
        <div className="page-container mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { icon: Shield, label: 'Total Schemes', value: stats.totalSchemes, color: 'from-emerald-500 to-teal-500' },
              { icon: Globe, label: 'Total Services', value: stats.totalServices, color: 'from-blue-500 to-cyan-500' },
              { icon: MessageSquare, label: 'Feedback', value: stats.totalFeedback, color: 'from-purple-500 to-pink-500' },
              { icon: Users, label: 'Total Users', value: stats.totalUsers, color: 'from-orange-500 to-amber-500' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="section-padding pt-0">
        <div className="page-container mx-auto">
          <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.key
                    ? 'bg-primary text-white shadow-lg shadow-primary/25'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  activeTab === tab.key ? 'bg-white/20' : 'bg-gray-200'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Add Button */}
          {(activeTab === 'schemes' || activeTab === 'services') && (
            <div className="mb-6">
              <Link
                to={`/admin/${activeTab === 'schemes' ? 'scheme' : 'service'}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
              >
                <Plus className="w-4 h-4" />
                Add {activeTab === 'schemes' ? 'Scheme' : 'Service'}
              </Link>
            </div>
          )}

          {/* Content */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Schemes Tab */}
            {activeTab === 'schemes' && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Title</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Category</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Ministry</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Views</th>
                      <th className="text-right px-4 py-3 text-sm font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {schemes.map((scheme: any) => (
                      <tr key={scheme._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="font-medium text-gray-900 text-sm">{scheme.title}</div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs">
                            {scheme.category}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{scheme.ministry}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{scheme.views}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              to={`/schemes/${scheme._id}`}
                              className="p-1.5 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                            </Link>
                            <Link
                              to={`/admin/scheme/${scheme._id}`}
                              className="p-1.5 rounded-lg text-gray-500 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                            >
                              <Pencil className="w-4 h-4" />
                            </Link>
                            <button
                              onClick={() => handleDeleteScheme(scheme._id)}
                              className="p-1.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Services Tab */}
            {activeTab === 'services' && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Title</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Category</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Website</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Views</th>
                      <th className="text-right px-4 py-3 text-sm font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {services.map((service: any) => (
                      <tr key={service._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="font-medium text-gray-900 text-sm">{service.title}</div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs">
                            {service.category}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600 truncate max-w-[150px]">
                          {service.websiteUrl}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{service.views}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              to={`/services/${service._id}`}
                              className="p-1.5 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                            </Link>
                            <Link
                              to={`/admin/service/${service._id}`}
                              className="p-1.5 rounded-lg text-gray-500 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                            >
                              <Pencil className="w-4 h-4" />
                            </Link>
                            <button
                              onClick={() => handleDeleteService(service._id)}
                              className="p-1.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Feedback Tab */}
            {activeTab === 'feedback' && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Name</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Subject</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Type</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Rating</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Status</th>
                      <th className="text-right px-4 py-3 text-sm font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {feedbacks.map((feedback: any) => (
                      <tr key={feedback._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="font-medium text-gray-900 text-sm">{feedback.name}</div>
                          <div className="text-xs text-gray-500">{feedback.email}</div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{feedback.subject}</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 rounded-full bg-purple-100 text-purple-700 text-xs">
                            {feedback.type}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < feedback.rating
                                    ? 'text-yellow-400 fill-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <select
                            value={feedback.status}
                            onChange={(e) => handleUpdateFeedbackStatus(feedback._id, e.target.value)}
                            className={`text-xs px-2 py-1 rounded-full border-0 ${
                              feedback.status === 'New'
                                ? 'bg-blue-100 text-blue-700'
                                : feedback.status === 'Resolved'
                                ? 'bg-emerald-100 text-emerald-700'
                                : feedback.status === 'In Progress'
                                ? 'bg-amber-100 text-amber-700'
                                : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            <option value="New">New</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                            <option value="Closed">Closed</option>
                          </select>
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => handleDeleteFeedback(feedback._id)}
                            className="p-1.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Name</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Email</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Role</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Joined</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {users.map((user: any) => (
                      <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="font-medium text-gray-900 text-sm">{user.name}</div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{user.email}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              user.role === 'admin'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
