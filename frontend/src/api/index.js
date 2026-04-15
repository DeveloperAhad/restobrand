import apiClient from './client';
import { api } from './config';

export const authAPI = {
  login: (credentials) => apiClient.post(api.auth.login, credentials),
  register: (userData) => apiClient.post(api.auth.register, userData),
  logout: () => apiClient.post(api.auth.logout),
  getMe: () => apiClient.get(api.auth.me),
};

export const restaurantAPI = {
  getAll: () => apiClient.get(api.restaurants),
  getById: (id) => apiClient.get(`${api.restaurants}${id}/`),
  create: (data) => apiClient.post(api.restaurants, data),
  update: (id, data) => apiClient.patch(`${api.restaurants}${id}/`, data),
  delete: (id) => apiClient.delete(`${api.restaurants}${id}/`),
};

export const brandingAPI = {
  moodboards: {
    getAll: () => apiClient.get(api.branding.moodboards),
    getById: (id) => apiClient.get(`${api.branding.moodboards}${id}/`),
    create: (data) => apiClient.post(api.branding.moodboards, data),
    generate: (data) => apiClient.post(`${api.branding.moodboards}generate/`, data),
    update: (id, data) => apiClient.patch(`${api.branding.moodboards}${id}/`, data),
    delete: (id) => apiClient.delete(`${api.branding.moodboards}${id}/`),
  },
  colorPalettes: {
    getAll: () => apiClient.get(api.branding.colorPalettes),
    generate: (data) => apiClient.post(`${api.branding.colorPalettes}generate/`, data),
  },
  logos: {
    getAll: () => apiClient.get(api.branding.logos),
    generate: (data) => apiClient.post(`${api.branding.logos}generate/`, data),
  },
};

export const contentAPI = {
  posts: {
    getAll: () => apiClient.get(api.content.posts),
    getById: (id) => apiClient.get(`${api.content.posts}${id}/`),
    create: (data) => apiClient.post(api.content.posts, data),
    update: (id, data) => apiClient.patch(`${api.content.posts}${id}/`, data),
    delete: (id) => apiClient.delete(`${api.content.posts}${id}/`),
  },
  captions: {
    generate: (data) => apiClient.post(`${api.content.captions}generate/`, data),
  },
  hashtags: {
    generate: (data) => apiClient.post(`${api.content.hashtags}generate/`, data),
  },
  schedule: {
    get: () => apiClient.get(api.content.schedule),
    create: (data) => apiClient.post(api.content.schedule, data),
  },
};

export const subscriptionAPI = {
  getPlans: () => apiClient.get(api.subscription.plans),
  getCurrent: () => apiClient.get(api.subscription.current),
  checkout: (data) => apiClient.post(api.subscription.checkout, data),
};
