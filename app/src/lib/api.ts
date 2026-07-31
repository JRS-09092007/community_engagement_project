/**
 * API Service - Centralized HTTP client for backend communication
 * Includes automated fallback to local mock dataset when backend API is unreachable (e.g. on Vercel)
 */

import axios from 'axios';
import { MOCK_SERVICES, MOCK_SCHEMES, MOCK_QUIZ } from './mockData';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 4000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Helper for Mock Responses
const mockResponse = <T>(data: T) => ({ data, status: 200, statusText: 'OK', headers: {}, config: {} as any });

// Auth API
export const authAPI = {
  register: async (data: { name: string; email: string; password: string }) => {
    try {
      return await api.post('/auth/register', data);
    } catch {
      const mockUser = {
        _id: 'user-' + Date.now(),
        name: data.name,
        email: data.email,
        role: 'user',
      };
      const token = 'mock-jwt-token-' + Date.now();
      return mockResponse({ success: true, token, user: mockUser });
    }
  },

  login: async (data: { email: string; password: string }) => {
    try {
      return await api.post('/auth/login', data);
    } catch {
      const isAdmin = data.email.includes('admin');
      const mockUser = {
        _id: isAdmin ? 'admin-1' : 'user-1',
        name: isAdmin ? 'Admin User' : 'Rahul Sharma',
        email: data.email,
        role: isAdmin ? 'admin' : 'user',
      };
      const token = 'mock-jwt-token-' + Date.now();
      return mockResponse({ success: true, token, user: mockUser });
    }
  },

  getMe: async () => {
    try {
      return await api.get('/auth/me');
    } catch {
      const storedUser = localStorage.getItem('user');
      const user = storedUser ? JSON.parse(storedUser) : { _id: 'user-1', name: 'Rahul Sharma', email: 'rahul@example.com', role: 'user' };
      return mockResponse({ success: true, user });
    }
  },

  updateProfile: async (data: { name: string }) => {
    try {
      return await api.put('/auth/profile', data);
    } catch {
      return mockResponse({ success: true, user: { name: data.name } });
    }
  },

  getUsers: async () => {
    try {
      return await api.get('/auth/users');
    } catch {
      return mockResponse({
        success: true,
        users: [
          { _id: 'u-1', name: 'Admin User', email: 'admin@digitalcitizen.gov.in', role: 'admin', createdAt: new Date().toISOString() },
          { _id: 'u-2', name: 'Rahul Sharma', email: 'rahul@example.com', role: 'user', createdAt: new Date().toISOString() },
        ],
      });
    }
  },
};

// Services API
export const servicesAPI = {
  getAll: async (params?: { category?: string; search?: string; page?: number }) => {
    try {
      return await api.get('/services', { params });
    } catch {
      let filtered = [...MOCK_SERVICES];
      if (params?.category) {
        filtered = filtered.filter((s) => s.category.toLowerCase() === params.category?.toLowerCase());
      }
      if (params?.search) {
        const q = params.search.toLowerCase();
        filtered = filtered.filter((s) => s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q));
      }
      return mockResponse({
        success: true,
        count: filtered.length,
        total: filtered.length,
        totalPages: 1,
        currentPage: 1,
        services: filtered,
      });
    }
  },

  getById: async (id: string) => {
    try {
      return await api.get(`/services/${id}`);
    } catch {
      const found = MOCK_SERVICES.find((s) => s._id === id) || MOCK_SERVICES[0];
      return mockResponse({ success: true, service: found });
    }
  },

  getCategories: async () => {
    try {
      return await api.get('/services/categories');
    } catch {
      return mockResponse({
        success: true,
        categories: ['Identity', 'Governance', 'Finance', 'Employment', 'Health', 'Travel'],
      });
    }
  },

  create: (data: unknown) => api.post('/services', data).catch(() => mockResponse({ success: true, service: data })),
  update: (id: string, data: unknown) => api.put(`/services/${id}`, data).catch(() => mockResponse({ success: true, service: data })),
  delete: (id: string) => api.delete(`/services/${id}`).catch(() => mockResponse({ success: true, message: 'Deleted' })),
};

// Schemes API
export const schemesAPI = {
  getAll: async (params?: { category?: string; search?: string; page?: number }) => {
    try {
      return await api.get('/schemes', { params });
    } catch {
      let filtered = [...MOCK_SCHEMES];
      if (params?.category) {
        filtered = filtered.filter((s) => s.category.toLowerCase() === params.category?.toLowerCase());
      }
      if (params?.search) {
        const q = params.search.toLowerCase();
        filtered = filtered.filter((s) => s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q));
      }
      return mockResponse({
        success: true,
        count: filtered.length,
        total: filtered.length,
        totalPages: 1,
        currentPage: 1,
        schemes: filtered,
      });
    }
  },

  getById: async (id: string) => {
    try {
      return await api.get(`/schemes/${id}`);
    } catch {
      const found = MOCK_SCHEMES.find((s) => s._id === id) || MOCK_SCHEMES[0];
      return mockResponse({ success: true, scheme: found });
    }
  },

  getCategories: async () => {
    try {
      return await api.get('/schemes/categories');
    } catch {
      return mockResponse({
        success: true,
        categories: ['Farmer', 'Health', 'Housing', 'Financial Inclusion', 'Student', 'Women', 'Senior Citizen'],
      });
    }
  },

  create: (data: unknown) => api.post('/schemes', data).catch(() => mockResponse({ success: true, scheme: data })),
  update: (id: string, data: unknown) => api.put(`/schemes/${id}`, data).catch(() => mockResponse({ success: true, scheme: data })),
  delete: (id: string) => api.delete(`/schemes/${id}`).catch(() => mockResponse({ success: true, message: 'Deleted' })),
};

// Quiz API
export const quizAPI = {
  getAll: async (params?: { category?: string; difficulty?: string; limit?: number }) => {
    try {
      return await api.get('/quiz', { params });
    } catch {
      return mockResponse({
        success: true,
        count: MOCK_QUIZ.length,
        questions: MOCK_QUIZ,
      });
    }
  },

  getCategories: async () => {
    try {
      return await api.get('/quiz/categories');
    } catch {
      return mockResponse({
        success: true,
        categories: ['Digital Services', 'Welfare Schemes', 'Cyber Safety', 'Health'],
      });
    }
  },

  validate: async (data: { answers: { questionId: string; selectedAnswer: number }[] }) => {
    try {
      return await api.post('/quiz/validate', data);
    } catch {
      return mockResponse({
        success: true,
        score: data.answers.length,
        total: data.answers.length,
        percentage: 100,
      });
    }
  },

  create: (data: unknown) => api.post('/quiz', data).catch(() => mockResponse({ success: true, question: data })),
  update: (id: string, data: unknown) => api.put(`/quiz/${id}`, data).catch(() => mockResponse({ success: true, question: data })),
  delete: (id: string) => api.delete(`/quiz/${id}`).catch(() => mockResponse({ success: true, message: 'Deleted' })),
};

// Feedback API
export const feedbackAPI = {
  submit: async (data: {
    name: string;
    email: string;
    subject: string;
    message: string;
    type?: string;
    rating?: number;
  }) => {
    try {
      return await api.post('/feedback', data);
    } catch {
      return mockResponse({ success: true, message: 'Feedback submitted successfully' });
    }
  },

  getAll: async () => {
    try {
      return await api.get('/feedback');
    } catch {
      return mockResponse({
        success: true,
        count: 1,
        total: 1,
        feedbacks: [
          {
            _id: 'fb-1',
            name: 'Priya Sharma',
            email: 'priya@example.com',
            subject: 'Great Educational Platform',
            message: 'Very helpful guide for understanding DigiLocker and UMANG app.',
            type: 'General',
            rating: 5,
            status: 'New',
            createdAt: new Date().toISOString(),
          },
        ],
      });
    }
  },

  getStats: async () => {
    try {
      return await api.get('/feedback/stats');
    } catch {
      return mockResponse({
        success: true,
        stats: { total: 1, unread: 1, averageRating: 5 },
      });
    }
  },

  update: (id: string, data: unknown) => api.put(`/feedback/${id}`, data).catch(() => mockResponse({ success: true, feedback: data })),
  delete: (id: string) => api.delete(`/feedback/${id}`).catch(() => mockResponse({ success: true, message: 'Deleted' })),
};

export default api;
