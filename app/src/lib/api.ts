/**
 * API Service - Centralized HTTP client for backend communication
 * All API calls go through this service for consistent handling
 */

import axios from 'axios';

// Use environment variable or default to localhost
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
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

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data: { name: string; email: string; password: string }) =>
    api.post('/auth/register', data),
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data: { name: string }) =>
    api.put('/auth/profile', data),
  getUsers: () => api.get('/auth/users'),
};

// Services API
export const servicesAPI = {
  getAll: (params?: { category?: string; search?: string; page?: number }) =>
    api.get('/services', { params }),
  getById: (id: string) => api.get(`/services/${id}`),
  getCategories: () => api.get('/services/categories'),
  create: (data: unknown) => api.post('/services', data),
  update: (id: string, data: unknown) => api.put(`/services/${id}`, data),
  delete: (id: string) => api.delete(`/services/${id}`),
};

// Schemes API
export const schemesAPI = {
  getAll: (params?: { category?: string; search?: string; page?: number }) =>
    api.get('/schemes', { params }),
  getById: (id: string) => api.get(`/schemes/${id}`),
  getCategories: () => api.get('/schemes/categories'),
  create: (data: unknown) => api.post('/schemes', data),
  update: (id: string, data: unknown) => api.put(`/schemes/${id}`, data),
  delete: (id: string) => api.delete(`/schemes/${id}`),
};

// Quiz API
export const quizAPI = {
  getAll: (params?: { category?: string; difficulty?: string; limit?: number }) =>
    api.get('/quiz', { params }),
  getCategories: () => api.get('/quiz/categories'),
  validate: (data: { answers: { questionId: string; selectedAnswer: number }[] }) =>
    api.post('/quiz/validate', data),
  create: (data: unknown) => api.post('/quiz', data),
  update: (id: string, data: unknown) => api.put(`/quiz/${id}`, data),
  delete: (id: string) => api.delete(`/quiz/${id}`),
};

// Feedback API
export const feedbackAPI = {
  submit: (data: {
    name: string;
    email: string;
    subject: string;
    message: string;
    type?: string;
    rating?: number;
  }) => api.post('/feedback', data),
  getAll: () => api.get('/feedback'),
  getStats: () => api.get('/feedback/stats'),
  update: (id: string, data: unknown) => api.put(`/feedback/${id}`, data),
  delete: (id: string) => api.delete(`/feedback/${id}`),
};

export default api;
